//
//  CentralSeaServerAPI.swift
//  
//
//  Created by Daniel Marriner on 08/10/2022.
//

import Vapor
import Fluent

struct CentralSeaServerAPI: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let api = routes.grouped("css-api")

        let news = api.grouped("news")

        let csnn = news.grouped("csnn")
        csnn.get(use: csnnGetAllNews)
        csnn.get("latest", use: csnnGetLatestNews)
        csnn.get("since", ":date", use: csnnGetNewsSince)
        csnn.get("categories", use: csnnGetCategories)
        csnn.post(use: csnnCreateNewNewsItem)
        csnn.get(":category", use: csnnGetAllByCategory)
        csnn.get(":category", "latest", use: csnnGetLatestByCategory)
        csnn.get(":category", "since", ":date", use: csnnGetSinceByCategory)
    }

    // MARK: - Handlers relating to CSNN news
    func csnnGetAllNews(req: Request) -> EventLoopFuture<[NewsItem]> {
        NewsItem
            .query(on: req.db)
            .filter(\.$publisher == "csnn")
            .sort(\.$published, .descending)
            .all()
    }

    func csnnGetLatestNews(req: Request) throws -> EventLoopFuture<[NewsItem]> {
        NewsItem
            .query(on: req.db)
            .filter(\.$publisher == "csnn")
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

    func csnnGetNewsSince(req: Request) throws -> EventLoopFuture<[NewsItem]> {
        guard let dateString = req.parameters.get("date"), let date = NewsItem.dateFormatter.date(from: dateString) else {
            throw Abort(.badRequest)
        }

        return NewsItem
            .query(on: req.db)
            .filter(\.$publisher == "csnn")
            .filter(\.$published > date)
            .sort(\.$published, .descending)
            .all()
    }

    func csnnGetCategories(req: Request) throws -> EventLoopFuture<[String]> {
        NewsItem
            .query(on: req.db)
            .unique()
            .all(\.$category)
    }

    func csnnCreateNewNewsItem(req: Request) throws -> EventLoopFuture<NewsItem> {
        let payload = try req.content.decode(NewsItemPayload.self)

        guard let secret = Environment.get("UPLOAD_SECRET"), try Bcrypt.verify(payload.secret, created: secret) else {
            throw Abort(.unauthorized)
        }

        let newsItem = payload.newsItem
        newsItem.publisher = "csnn"
        return newsItem
            .save(on: req.db)
            .map { newsItem }
    }

    func csnnGetAllByCategory(req: Request) throws -> EventLoopFuture<[NewsItem]> {
        guard let category = req.parameters.get("category") else {
            throw Abort(.badRequest)
        }

        return NewsItem
            .query(on: req.db)
            .filter(\.$publisher == "csnn")
            .filter(\.$category == category)
            .sort(\.$published, .descending)
            .all()
    }

    func csnnGetLatestByCategory(req: Request) throws -> EventLoopFuture<NewsItem> {
        guard let category = req.parameters.get("category") else {
            throw Abort(.badRequest)
        }

        return NewsItem
            .query(on: req.db)
            .filter(\.$publisher == "csnn")
            .filter(\.$category == category)
            .sort(\.$published, .descending)
            .first()
            .unwrap(or: FluentError.noResults)
    }

    func csnnGetSinceByCategory(req: Request) throws -> EventLoopFuture<[NewsItem]> {
        guard let category = req.parameters.get("category") else {
            throw Abort(.badRequest)
        }

        guard let dateString = req.parameters.get("date"), let date = NewsItem.dateFormatter.date(from: dateString) else {
            throw Abort(.badRequest)
        }

        return NewsItem
            .query(on: req.db)
            .filter(\.$publisher == "csnn")
            .filter(\.$category == category)
            .filter(\.$published > date)
            .sort(\.$published, .descending)
            .all()
    }
}
