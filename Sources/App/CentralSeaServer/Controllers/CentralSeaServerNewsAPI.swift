//
//  CentralSeaServerNewsAPI.swift
//  
//
//  Created by Daniel Marriner on 11/10/2022.
//

import Vapor
import Fluent

struct CentralSeaServerNewsAPI: RouteCollection {
    let providerId: PathComponent

    func boot(routes: RoutesBuilder) throws {
        let news = routes.grouped("css-api", "news", providerId)
        news.get(use: getAllNews)
        news.get("latest", use: getLatestNews)
        news.get("since", ":date", use: getNewsSince)
        news.get("categories", use: getCategories)
        news.post(use: createNewNewsItem)
        news.post(":id", use: updateNewsItem)
        news.delete(":id", use: deleteNewsItem)
        news.get(":category", use: getAllByCategory)
        news.get(":category", "latest", use: getLatestByCategory)
        news.get(":category", "since", ":date", use: getSinceByCategory)
    }

    // MARK: - Handlers relating to news
    func getAllNews(req: Request) -> EventLoopFuture<[NewsItem]> {
        NewsItem
            .query(on: req.db)
            .filter(\.$publisher == providerId.description)
            .sort(\.$published, .descending)
            .all()
    }

    func getLatestNews(req: Request) throws -> EventLoopFuture<[NewsItem]> {
        NewsItem
            .query(on: req.db)
            .filter(\.$publisher == providerId.description)
            .all()
            .flatMap { items in
                req.eventLoop.makeSucceededFuture(
                    items
                        .reduce([String: NewsItem]()) { dict, item in
                            var dict = dict
                            if let current = dict[item.category] {
                                if item.published! > current.published! {
                                    dict[item.category] = item
                                }
                            } else {
                                dict[item.category] = item
                            }
                            return dict
                        }
                        .values
                        .map { $0 }
                )
            }
    }

    func getNewsSince(req: Request) throws -> EventLoopFuture<[NewsItem]> {
        guard let dateString = req.parameters.get("date"), let date = NewsItem.dateFormatter.date(from: dateString) else {
            throw Abort(.badRequest)
        }

        return NewsItem
            .query(on: req.db)
            .filter(\.$publisher == providerId.description)
            .filter(\.$published > date)
            .sort(\.$published, .descending)
            .all()
    }

    func getCategories(req: Request) throws -> EventLoopFuture<[String]> {
        NewsItem
            .query(on: req.db)
            .unique()
            .all(\.$category)
    }

    func createNewNewsItem(req: Request) throws -> EventLoopFuture<NewsItem> {
        let payload = try req.content.decode(SecurePayload<NewsItem>.self)

        guard let secret = Environment.get("UPLOAD_SECRET"), try Bcrypt.verify(payload.secret, created: secret) else {
            throw Abort(.unauthorized)
        }

        let newsItem = payload.content
        newsItem.publisher = providerId.description
        return newsItem
            .save(on: req.db)
            .map { newsItem }
    }

    func deleteNewsItem(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        let payload = try req.content.decode(Secret.self)

        guard let secret = Environment.get("UPLOAD_SECRET"), try Bcrypt.verify(payload.secret, created: secret) else {
            throw Abort(.unauthorized)
        }

        guard let id = req.parameters.get("id", as: UUID.self) else {
            throw Abort(.badRequest)
        }

        return NewsItem
            .find(id, on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .map { .ok }
    }

    func updateNewsItem(req: Request) throws -> EventLoopFuture<NewsItem> {
        let payload = try req.content.decode(SecurePayload<NewsItemPatch>.self)

        guard let secret = Environment.get("UPLOAD_SECRET"), try Bcrypt.verify(payload.secret, created: secret) else {
            throw Abort(.unauthorized)
        }

        guard let id = req.parameters.get("id", as: UUID.self) else {
            throw Abort(.badRequest)
        }

        return NewsItem
            .find(id, on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { item in
                if let category = payload.content.category {
                    item.category = category
                }

                if let headline = payload.content.headline {
                    item.headline = headline
                }

                if let description = payload.content.description {
                    item.description = description
                }

                return item
                    .save(on: req.db)
                    .map { item }
            }
    }

    func getAllByCategory(req: Request) throws -> EventLoopFuture<[NewsItem]> {
        guard let category = req.parameters.get("category") else {
            throw Abort(.badRequest)
        }

        return NewsItem
            .query(on: req.db)
            .filter(\.$publisher == providerId.description)
            .filter(\.$category == category)
            .sort(\.$published, .descending)
            .all()
    }

    func getLatestByCategory(req: Request) throws -> EventLoopFuture<NewsItem> {
        guard let category = req.parameters.get("category") else {
            throw Abort(.badRequest)
        }

        return NewsItem
            .query(on: req.db)
            .filter(\.$publisher == providerId.description)
            .filter(\.$category == category)
            .sort(\.$published, .descending)
            .first()
            .unwrap(or: FluentError.noResults)
    }

    func getSinceByCategory(req: Request) throws -> EventLoopFuture<[NewsItem]> {
        guard let category = req.parameters.get("category") else {
            throw Abort(.badRequest)
        }

        guard let dateString = req.parameters.get("date"), let date = NewsItem.dateFormatter.date(from: dateString) else {
            throw Abort(.badRequest)
        }

        return NewsItem
            .query(on: req.db)
            .filter(\.$publisher == providerId.description)
            .filter(\.$category == category)
            .filter(\.$published > date)
            .sort(\.$published, .descending)
            .all()
    }
}
