import Fluent
import Vapor

final class Project: Model, Content {
    static let schema = "projects"
    
    @ID(custom: "id")
    var id: Int?
    
    @Field(key: "title")
    var title: String

    @OptionalField(key: "thumbnail")
    var image: String?

    @Field(key: "summary")
    var summary: String

    @OptionalField(key: "source")
    var source: String?

    @OptionalField(key: "link")
    var link: String?

    @OptionalField(key: "short")
    var short: String?
    
    init() {}
    
    init(
        id: Int,
        title: String,
        image: String,
        summary: String,
        source: String?,
        link: String?,
        short: String?
    ) {
        self.id = id
        self.title = title
        self.image = image
        self.summary = summary
        self.source = source
        self.link = link
        self.short = short
    }
}
