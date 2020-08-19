import Fluent
import Vapor
import Leaf

func routes(_ app: Application) throws {
    app.get { req in
        req.view.render("index", [
            "title": "Home"
        ])
    }

    app.get("projects") { req in
       req.view.render("projects", [
           "title": "Projects"
       ])
    }

    app.get("archive") { req in
       req.view.render("archive", [
           "title": "Archive"
       ])
    }

    app.get("contact") { req in
       req.view.render("contact", [
           "title": "Contact"
       ])
    }
    
    app.get("articles", ":id") { req in
        req.view.render("article", [
            "title": "Article"
        ])
    }

    try app.register(collection: PostController())
}
