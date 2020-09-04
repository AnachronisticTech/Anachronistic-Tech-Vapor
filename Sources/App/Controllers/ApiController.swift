import Fluent
import Vapor
import Files

struct ApiController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let api = routes.grouped("api")
        api.get("images", use: getAllImages)
        api.post("upload", use: postImage)
        
        let posts = api.grouped("posts")
        posts.get(use: getAllPosts)
        posts.post(use: createNewPost)
        posts.get(":id", use: getPost)
        posts.post(":id", use: updatePost)
        posts.get("articles", use: getPostArticles)
        posts.get("articles", ":n", use: getPostArticles)
        posts.get("projects", use: getPostProjects)
        posts.get("projects", ":n", use: getPostProjects)
        
        let projects = api.grouped("projects")
        projects.get(use: getAllProjects)
//        projects.get(":id", use: getProject)
    }
    
    func getAllPosts(req: Request) throws -> EventLoopFuture<[Post.Output]> {
        return Post
            .query(on: req.db)
            .sort(\.$id, .descending)
            .all()
            .mapEach { $0.toOutput(with: req) }
    }
    
    func createNewPost(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        guard let payload = try? req.content.decode(Post.Input.self), let data = payload.data else {
            throw Abort(HTTPResponseStatus.badRequest)
        }
        
        let post = Post(icon: payload.icon, type: payload.type)
        return post
            .save(on: req.db)
            .map {
                do {
                    let _ = try Folder(path: "\(req.application.directory.publicDirectory)/posts")
                        .createFile(at: "\(post.id!).md", contents: data)
                } catch {
                    return .badRequest
                }
                return .ok
            }
    }
    
    func getPost(req: Request) throws -> EventLoopFuture<Post.Output> {
        return Post
            .find(req.parameters.get("id"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .map { $0.toOutput(with: req) }
    }
    
    func updatePost(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        guard let payload = try? req.content.decode(Post.Input.self), let id = req.parameters.get("id", as: Int.self) else {
            throw Abort(HTTPResponseStatus.badRequest)
        }
        
        let post = Post(icon: payload.icon, type: payload.type)
        return Post.query(on: req.db)
            .filter(\.$id == id)
            .set(\.$type, to: post.type)
            .set(\.$icon, to: post.icon)
            .update()
            .map {
                if let data = payload.data, data.count > 10 {
                    do {
                        let _ = try Folder(path: "\(req.application.directory.publicDirectory)/posts")
                            .createFile(at: "\(id).md", contents: data)
                    } catch {
                        return .badRequest
                    }
                }
                return .ok
            }
    }
    
    func getPostArticles(req: Request) throws -> EventLoopFuture<[Post.Output]> {
        if let id = req.parameters.get("n", as: Int.self) {
            return Post
                .query(on: req.db)
                .filter(\.$type == 0)
                .sort(\.$id, .descending)
                .range(0..<id)
                .all()
                .mapEach { $0.toOutput(with: req) }
        } else {
            return Post
                .query(on: req.db)
                .filter(\.$type == 0)
                .sort(\.$id, .descending)
                .all()
                .mapEach { $0.toOutput(with: req) }
        }
    }
    
    func getPostProjects(req: Request) throws -> EventLoopFuture<[Post.Output]> {
        if let id = req.parameters.get("n", as: Int.self) {
            return Post
                .query(on: req.db)
                .filter(\.$type == 1)
                .sort(\.$id, .descending)
                .range(0..<id)
                .all()
                .mapEach { $0.toOutput(with: req) }
        } else {
            return Post
                .query(on: req.db)
                .filter(\.$type == 1)
                .sort(\.$id, .descending)
                .all()
                .mapEach { $0.toOutput(with: req) }
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
    
    func postImage(req: Request) throws -> Response {
        struct PostData: Content {
            var file: Vapor.File
        }
        
        if let payload = try? req.content.decode(PostData.self) {
            do {
                let data = Data(buffer: payload.file.data)
                let _ = try Folder(
                    path: "\(req.application.directory.publicDirectory)/images")
                    .createFile(
                        at: payload.file.filename,
                        contents: data
                    )
            } catch {
                return Response(
                    status: .badRequest,
                    body: Response.Body(string: "upload failed with reason: \(error)")
                )
            }
            return Response(
                status: .ok,
                body: Response.Body(string: "file uploaded")
            )
        } else {
            return Response(
                status: .badRequest,
                body: Response.Body(string: "couldn't decode data from \(req)")
            )
        }
    }
}
