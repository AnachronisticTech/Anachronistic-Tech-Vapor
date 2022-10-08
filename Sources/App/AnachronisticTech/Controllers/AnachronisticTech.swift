//
//  AnachronisticTech.swift
//  
//
//  Created by Daniel Marriner on 08/10/2022.
//

import Vapor

struct AnachronisticTech: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        routes.get(use: home)
        routes.get("archive", use: archive)
        routes.get("portfolio", use: portfolio)
        routes.get("contact", use: contact)
        routes.get("articles", ":id", use: articles)
        routes.get("postEditor", use: newPost)
        routes.get("postEditor", ":id", use: editPost)
        routes.get("portfolioEditor", use: newPortfolioItem)
        routes.get("portfolioEditor", ":id", use: editPortfolioItem)
        routes.get("upload", use: upload)
    }

    private enum Endpoint: String, CustomStringConvertible {
        case home, archive, portfolio, contact
        case article, editor, upload

        var description: String { "\(String(describing: AnachronisticTech.self))/\(self.rawValue)" }
    }

    // MARK: - Handlers relating to views
    func home(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("\(Endpoint.home)", [
            "title": "Home"
        ])
    }

    func archive(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("\(Endpoint.archive)", [
            "title": "Archive"
        ])
    }

    func portfolio(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("\(Endpoint.portfolio)", [
            "title": "Portfolio"
        ])
    }

    func contact(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("\(Endpoint.contact)", [
            "title": "Contact"
        ])
    }

    func articles(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("\(Endpoint.article)", [
            "title": "Article",
            "id": req.parameters.get("id", as: String.self)
        ])
    }

    func newPost(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("\(Endpoint.editor)", [
            "title": "New Post",
            "editor": "posts"
        ])
    }

    func editPost(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("\(Endpoint.editor)", [
            "title": "Editing Post",
            "editor": "posts",
            "id": req.parameters.get("id", as: String.self)
        ])
    }

    func newPortfolioItem(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("\(Endpoint.editor)", [
            "title": "New Post",
            "editor": "portfolio"
        ])
    }

    func editPortfolioItem(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("\(Endpoint.editor)", [
            "title": "Editing Post",
            "editor": "portfolio",
            "id": req.parameters.get("id", as: String.self)
        ])
    }

    func upload(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("\(Endpoint.upload)", [
            "title": "File upload"
        ])
    }
}
