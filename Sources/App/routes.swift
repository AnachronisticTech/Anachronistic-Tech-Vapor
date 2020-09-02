import Fluent
import Vapor
import Leaf

func routes(_ app: Application) throws {
    try app.register(collection: PageController())
    try app.register(collection: ApiController())
}
