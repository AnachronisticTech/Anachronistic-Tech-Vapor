import Fluent
import Vapor

final class Post: Model, Content {
    static let schema = "blog"
    
    @ID(custom: "id")
    var id: Int?
    
    @Field(key: "title")
    var title: String
    
    @Field(key: "datePublished")
    var date: Date

    @Field(key: "postType")
    var type: Int

    @OptionalField(key: "thumbnail")
    var image: String?

    @Field(key: "summary")
    var summary: String

    @Field(key: "post")
    var content: String
    
    init() {}
    
    init(
        id: Int,
        title: String,
        date: Date,
        type: Int, // Maybe make this an enum?
        image: String?,
        summary: String,
        content: String
    ) {
        self.id = id
        self.title = title
        self.date = date
        self.type = type
        self.image = image
        self.summary = summary
        self.content = content
    }
}
