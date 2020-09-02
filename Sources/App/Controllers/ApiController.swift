import Fluent
import Vapor
import Files

struct ApiController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let api = routes.grouped("api")
        api.get("images", use: getAllImages)
        
        let posts = api.grouped("posts")
        posts.get(use: getAllPosts)
        posts.get(":id", use: getPost)
        posts.get("articles", use: getPostArticles)
        posts.get("articles", ":n", use: getPostArticles)
        posts.get("projects", use: getPostProjects)
        posts.get("projects", ":n", use: getPostProjects)
        
        let projects = api.grouped("projects")
        projects.get(use: getAllProjects)
//        projects.get(":id", use: getProject)
    }
    
    func getAllPosts(req: Request) throws -> EventLoopFuture<[Post]> {
        return Post
            .query(on: req.db)
            .sort(\.$date, .descending)
            .all()
    }
    
    func getPost(req: Request) throws -> EventLoopFuture<Post> {
        return Post
            .find(req.parameters.get("id"), on: req.db)
            .unwrap(or: Abort(.notFound))
    }
    
    func getPostArticles(req: Request) throws -> EventLoopFuture<[Post]> {
        if let id = req.parameters.get("n", as: Int.self) {
            return Post
                .query(on: req.db)
                .filter(\.$type == 0)
                .sort(\.$date, .descending)
                .range(0..<id)
                .all()
        } else {
            return Post
                .query(on: req.db)
                .filter(\.$type == 0)
                .sort(\.$date, .descending)
                .all()
        }
    }
    
    func getPostProjects(req: Request) throws -> EventLoopFuture<[Post]> {
        if let id = req.parameters.get("n", as: Int.self) {
            return Post
                .query(on: req.db)
                .filter(\.$type == 1)
                .sort(\.$date, .descending)
                .range(0..<id)
                .all()
        } else {
            return Post
                .query(on: req.db)
                .filter(\.$type == 1)
                .sort(\.$date, .descending)
                .all()
        }
    }
    
    func getAllProjects(req: Request) throws -> EventLoopFuture<[Project]> {
        return Project
            .query(on: req.db)
            .all()
    }
    
    func getAllImages(req: Request) throws -> [String] {
        return (try? Folder(path: "\(req.application.directory.publicDirectory)/images").files.map { $0.name }) ?? []
    }
}
