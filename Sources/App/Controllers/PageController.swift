import Fluent
import Vapor

struct PageController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        routes.get(use: home)
        routes.get("archive", use: archive)
        routes.get("projects", use: projects)
        routes.get("contact", use: contact)
        routes.get("articles", ":id", use: articles)
        routes.get("newPost", use: newPost)
        routes.get("editPost", ":id", use: editPost)
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

    func projects(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("projects", [
            "title": "Projects"
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
        return req.view.render("editor", [
            "title": "New Post"
        ])
    }
    
    func editPost(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("editor", [
            "title": "Editing Post"
        ])
    }
}
