import Fluent
import Vapor
import Leaf

func routes(_ app: Application) throws {
    // CentralSeaServer
    try app.register(collection: CentralSeaServerAPI())
    try app.register(collection: CentralSeaServerNewsAPI(providerId: "csnn"))

    // Psakse
    try app.register(collection: PsakseAPI())
}
