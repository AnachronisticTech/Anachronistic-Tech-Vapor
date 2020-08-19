import Fluent
import Vapor

struct PostController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let posts = routes.grouped("api", "posts")
        posts.get(use: getAll)
        posts.get(":id", use: get)
        posts.get("articles", use: getAllArticles)
        posts.get("articles", ":n", use: getNArticles)
        posts.get("projects", use: getAllProjects)
        posts.get("projects", ":n", use: getNProjects)
    }
    
    func getAll(req: Request) throws -> EventLoopFuture<[Post]> {
        return Post
            .query(on: req.db)
            .sort(\.$date, .descending)
            .all()
    }
    
    func getAllArticles(req: Request) throws -> EventLoopFuture<[Post]> {
        return Post
            .query(on: req.db)
            .filter(\.$type == 0)
            .sort(\.$date, .descending)
            .all()
    }
    
    func getNArticles(req: Request) throws -> EventLoopFuture<[Post]> {
        return Post
            .query(on: req.db)
            .filter(\.$type == 0)
            .sort(\.$date, .descending)
            .range(..<(req.parameters.get("n", as: Int.self)!))
            .all()
    }
    
    func getAllProjects(req: Request) throws -> EventLoopFuture<[Post]> {
        return Post
            .query(on: req.db)
            .filter(\.$type == 1)
            .sort(\.$date, .descending)
            .all()
    }
    
    func getNProjects(req: Request) throws -> EventLoopFuture<[Post]> {
        return Post
            .query(on: req.db)
            .filter(\.$type == 1)
            .sort(\.$date, .descending)
            .range(..<(req.parameters.get("n", as: Int.self)!))
            .all()
    }
    
    func get(req: Request) throws -> EventLoopFuture<Post> {
        return Post
            .find(req.parameters.get("id"), on: req.db)
            .unwrap(or: Abort(.notFound))
    }
}
