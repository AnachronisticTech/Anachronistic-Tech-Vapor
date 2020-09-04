import Fluent
import Vapor
import Files
import Ink

final class Post: Model, Content {
    static var schema: String = "content"
    
    @ID(custom: "id")
    var id: Int?
    
    @Field(key: "icon")
    var icon: String?
    
    @Field(key: "type")
    var type: Int
    
    init() {}
    
    init(
        id: Int? = nil,
        icon: String? = nil,
        type: Int
    ) {
        self.id = id
        self.icon = icon
        self.type = type
    }
    
    struct Input: Content {
        var icon: String?
        var type: Int
        var data: Data?
    }
    
    struct Output: Content {
        var id: Int
        var type: Int
        var icon: String?
        var date: Date
        var title: String
        var summary: String
        var content: String
    }
    
    func toOutput(with request: Request) -> Output {
        let markdown = try! Folder(path: "\(request.application.directory.publicDirectory)/posts")
            .file(named: "\(id!).md")
            .readAsString(encodedAs: .utf8)
            .replacingOccurrences(of: "\r\n", with: "\n")
        let parser = MarkdownParser()
        let result = parser.parse(markdown)
        
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.dateFormat = "dd/mm/yyyy"
        
        return Output(
            id: id!,
            type: type,
            icon: icon,
            date: formatter.date(from: result.metadata["date"]!)!,
            title: result.title!,
            summary: result.metadata["summary"] ?? "",
            content: result.html
        )
    }
}
