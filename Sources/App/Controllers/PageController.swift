import Fluent
import Vapor

struct PageController: RouteCollection {
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
    
    func home(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("index", [
            "title": "Home"
        ])
    }
    
    func archive(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("archive", [
            "title": "Archive"
        ])
    }

    func portfolio(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("portfolio", [
            "title": "Portfolio"
        ])
    }
    
    func contact(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("contact", [
            "title": "Contact"
        ])
    }
    
    func articles(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("article", [
            "title": "Article"
        ])
    }
    
    func newPost(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("postEditor", [
            "title": "New Post",
            "editor": "posts"
        ])
    }
    
    func editPost(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("postEditor", [
            "title": "Editing Post",
            "editor": "posts"
        ])
    }
    
    func newPortfolioItem(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("postEditor", [
            "title": "New Post",
            "editor": "portfolio"
        ])
    }
    
    func editPortfolioItem(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("postEditor", [
            "title": "Editing Post",
            "editor": "portfolio"
        ])
    }
    
    func upload(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("upload", [
            "title": "File upload"
        ])
    }
}
