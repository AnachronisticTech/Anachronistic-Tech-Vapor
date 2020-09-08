import Fluent
import Vapor
import Files
import Ink

final class PortfolioItem: Model, Content {
    static var schema: String = "portfolio"
    
    @ID(custom: "id")
    var id: Int?
    
    @Field(key: "icon")
    var icon: String?
    
    @Field(key: "type")
    var type: Int
    
    @Field(key: "tag")
    var tag: String
    
    init() {}
    
    init(
        id: Int? = nil,
        icon: String? = nil,
        type: Int,
        tag: String
    ) {
        self.id = id
        self.icon = icon
        self.type = type
        self.tag = tag
    }
    
    struct Input: Content {
        var icon: String?
        var data: Data?
        var secret: String
    }
    
    struct Output: Content {
        var id: Int
        var type: Int
        var icon: String?
        var tag: String
        var title: String
        var subtitle: String
        var content: String
        var github: String?
        var web: String?
    }
    
    func toOutput(with request: Request) -> Output {
        let markdown = try! Folder(path: "\(request.application.directory.publicDirectory)portfolio")
            .file(named: "\(id!).md")
            .readAsString(encodedAs: .utf8)
            .replacingOccurrences(of: "\r\n", with: "\n")
        let parser = MarkdownParser()
        let result = parser.parse(markdown)
        
        return Output(
            id: id!,
            type: type,
            icon: icon,
            tag: tag,
            title: result.title!,
            subtitle: result.metadata["subtitle"] ?? "",
            content: result.html,
            github: result.metadata["github"],
            web: result.metadata["web"]
        )
    }
}
