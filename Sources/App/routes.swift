import Fluent
import Vapor
import Leaf

func routes(_ app: Application) throws {
    // AnachronisticTech
    try app.register(collection: AnachronisticTech())
    try app.register(collection: AnachronisticTechAPI())

    // CentralSeaServer
    try app.register(collection: CentralSeaServerAPI())

    // Psakse
    try app.register(collection: PsakseAPI())
}
