import Fluent
import Vapor
import Files
import Ink

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
            .sort(\.$date, .descending)
            .all()
            .mapEach { $0.toOutput(with: req) }
    }
    
    func createNewPost(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        guard let payload = try? req.content.decode(Post.Input.self), let data = payload.data else {
            throw Abort(.custom(code: 47, reasonPhrase: "error decoding payload"))
        }
        
        guard let secret = Environment.get("UPLOAD_SECRET"), try Bcrypt.verify(payload.secret, created: secret) else {
            throw Abort(.unauthorized)
        }
        
        let markdown = String(data: data, encoding: .utf8)!
            .replacingOccurrences(of: "\r\n", with: "\n")
        let parser = MarkdownParser()
        let result = parser.parse(markdown)
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.dateFormat = "dd/MM/yyyy"
        
        guard let dateString = result.metadata["date"], let date = formatter.date(from: dateString) else {
            throw Abort(.custom(code: 47, reasonPhrase: "bad date value"))
        }
        
        let post = Post(
            icon: payload.icon,
            type: result.metadata["type"] == "project" ? 1 : 0,
            date: date
        )
        return post
            .save(on: req.db)
            .map {
                do {
                    let _ = try Folder(path: "\(req.application.directory.publicDirectory)/posts")
                        .createFile(at: "\(post.id!).md", contents: data)
                } catch {
                    return .custom(code: 47, reasonPhrase: "error saving file")
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
            throw Abort(.custom(code: 47, reasonPhrase: "error getting id or decoding payload"))
        }
        
        guard let secret = Environment.get("UPLOAD_SECRET"), try Bcrypt.verify(payload.secret, created: secret) else {
            throw Abort(.unauthorized)
        }
        
        return Post
            .find(id, on: req.db)
            .unwrap(or: Abort(.notFound))
            .map { $0.toOutput(with: req) }
            .flatMap { post in
                let date: Date
                let type: Int
                if let data = payload.data, data.count > 10 {
                    let markdown = String(data: data, encoding: .utf8)!
                        .replacingOccurrences(of: "\r\n", with: "\n")
                    let parser = MarkdownParser()
                    let result = parser.parse(markdown)
                    let formatter = DateFormatter()
                    formatter.locale = Locale(identifier: "en_US_POSIX")
                    formatter.dateFormat = "dd/MM/yyyy"
                    
                    date = formatter.date(from: result.metadata["date"]!)!
                    type = result.metadata["type"] == "project" ? 1 : 0
                } else {
                    date = post.date
                    type = post.type
                }
                
                return Post.query(on: req.db)
                    .filter(\.$id == id)
                    .set(\.$type, to: type)
                    .set(\.$icon, to: payload.icon)
                    .set(\.$date, to: date)
                    .update()
                    .map {
                        if let data = payload.data, data.count > 10 {
                            do {
                                let _ = try Folder(path: "\(req.application.directory.publicDirectory)/posts")
                                    .createFile(at: "\(id).md", contents: data)
                            } catch {
                                return .custom(code: 47, reasonPhrase: "error saving file")
                            }
                        }
                        return .ok
                    }
            }
    }
    
    func getPostArticles(req: Request) throws -> EventLoopFuture<[Post.Output]> {
        if let id = req.parameters.get("n", as: Int.self) {
            return Post
                .query(on: req.db)
                .filter(\.$type == 0)
                .sort(\.$date, .descending)
                .range(0..<id)
                .all()
                .mapEach { $0.toOutput(with: req) }
        } else {
            return Post
                .query(on: req.db)
                .filter(\.$type == 0)
                .sort(\.$date, .descending)
                .all()
                .mapEach { $0.toOutput(with: req) }
        }
    }
    
    func getPostProjects(req: Request) throws -> EventLoopFuture<[Post.Output]> {
        if let id = req.parameters.get("n", as: Int.self) {
            return Post
                .query(on: req.db)
                .filter(\.$type == 1)
                .sort(\.$date, .descending)
                .range(0..<id)
                .all()
                .mapEach { $0.toOutput(with: req) }
        } else {
            return Post
                .query(on: req.db)
                .filter(\.$type == 1)
                .sort(\.$date, .descending)
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
            var secret: String
        }
        
        guard let payload = try? req.content.decode(PostData.self) else {
            throw Abort(.custom(code: 47, reasonPhrase: "couldn't decode data"))
        }
        
        guard let secret = Environment.get("UPLOAD_SECRET"), try Bcrypt.verify(payload.secret, created: secret) else {
            throw Abort(.unauthorized)
        }
        
        let data = Data(buffer: payload.file.data)
        guard let _ = try? Folder(path: "\(req.application.directory.publicDirectory)/images")
            .createFile(at: payload.file.filename, contents: data) else {
            throw Abort(.custom(code: 47, reasonPhrase: "error saving file"))
        }
        
        return Response(
            status: .ok,
            body: Response.Body(string: "file uploaded")
        )
    }
}
