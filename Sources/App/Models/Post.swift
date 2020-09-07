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
    
    @Field(key: "date")
    var date: Date
    
    init() {}
    
    init(
        id: Int? = nil,
        icon: String? = nil,
        type: Int,
        date: Date
    ) {
        self.id = id
        self.icon = icon
        self.type = type
        self.date = date
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
        var date: Date
        var title: String
        var summary: String
        var content: String
    }
    
    func toOutput(with request: Request) -> Output {
        let markdown = try! Folder(path: "\(request.application.directory.publicDirectory)posts")
            .file(named: "\(id!).md")
            .readAsString(encodedAs: .utf8)
            .replacingOccurrences(of: "\r\n", with: "\n")
        var parser = MarkdownParser()
        let imageModiefier = Modifier(target: .images) { html, md in
            let elements = html.split(separator: "\"").map { String($0) }
            let isVideo = elements[1].split(separator: ".")[1] == "mp4"
            let hasCaption = elements.count > 3
            func video(src: String) -> String {
                return """
                <video width="100%" height="auto" controls>
                    <source src="/images/\(src)" type="video/mp4">
                </video>
                """
            }
            return """
            <div class="inlineImg">
                \(isVideo ? video(src: elements[1]) : "<img src=\"/images/\(elements[1])\">" )
                \(hasCaption ? "<h5>\(elements[3])</h5>" : "")
            </div>
            """
        }
        parser.addModifier(imageModiefier)
        let result = parser.parse(markdown)
        
        return Output(
            id: id!,
            type: type,
            icon: icon,
            date: date,
            title: result.title!,
            summary: result.metadata["summary"] ?? "",
            content: result.html
        )
    }
}
