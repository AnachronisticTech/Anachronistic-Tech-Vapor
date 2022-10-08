import Fluent
import Vapor
import Files
import Ink
import HTMLEntities

final class Post: Model, Content {
    static var schema: String = "posts"
    
    @ID(custom: "id")
    var id: Int?
    
    @Field(key: "icon")
    var icon: String?
    
    @Field(key: "type")
    var type: Int
    
    @Field(key: "date")
    var date: Date
    
    @Field(key: "tags")
    var tags: String
    
    init() {}
    
    init(
        id: Int? = nil,
        icon: String? = nil,
        type: Int,
        date: Date,
        tags: String = ""
    ) {
        self.id = id
        self.icon = icon
        self.type = type
        self.date = date
        self.tags = tags
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
        var tags: [String]
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
        
        let imageModifier = Modifier(target: .images) { html, _ in
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
            <figure>
                \(isVideo ? video(src: elements[1]) : "<img src=\"/images/\(elements[1])\"\(hasCaption ? "alt=\"\(elements[3])\"" : "")>" )
                \(hasCaption ? "<figcaption>\(elements[3])</figcaption>" : "")
            </figure>
            """
        }
        let headingModifier = Modifier(target: .headings) { html, _ in
            return html
                .replacingOccurrences(of: "h3", with: "h4")
                .replacingOccurrences(of: "h2", with: "h3")
        }
        
        parser.addModifier(imageModifier)
        parser.addModifier(headingModifier)
        let result = parser.parse(markdown)
        
        return Output(
            id: id!,
            type: type,
            icon: icon,
            date: date,
            tags: tags.split(separator: ";").map { String($0) },
            title: result.title!.htmlUnescape(),
            summary: result.metadata["summary"]?.htmlUnescape() ?? "",
            content: result.html.htmlUnescape()
        )
    }

    static var dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.dateFormat = "dd/MM/yyyy"
        formatter.timeZone = TimeZone(secondsFromGMT: 0)
        return formatter
    }()
}
