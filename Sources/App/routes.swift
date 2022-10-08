import Fluent
import Vapor
import Leaf

func routes(_ app: Application) throws {
    try app.register(collection: AnachronisticTech())
    try app.register(collection: AnachronisticTechAPI())
    try app.register(collection: PsakseAPI())
}
