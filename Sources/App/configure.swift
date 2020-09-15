import Fluent
import FluentMySQLDriver
import Vapor
import Leaf
import NIOSSL

// configures your application
public func configure(_ app: Application) throws {
    // uncomment to serve files from /Public folder
    app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))
    
    app.views.use(.leaf)
    app.leaf.cache.isEnabled = app.environment.isRelease

    app.databases.use(.mysql(
        hostname: Environment.get("DATABASE_HOST") ?? "localhost",
        username: Environment.get("DATABASE_USERNAME") ?? "vapor_username",
        password: Environment.get("DATABASE_PASSWORD") ?? "vapor_password",
        database: Environment.get("DATABASE_NAME") ?? "vapor_database",
        tlsConfiguration: .forClient(certificateVerification: .none)
    ), as: .mysql)
    
    app.routes.defaultMaxBodySize = ByteCount(integerLiteral: 10240000)
    
    let homePath = Environment.get("CERTIFICATE_PATH") ?? app.directory.workingDirectory
    let certPath = homePath + "/fullchain.pem"
    let keyPath = homePath + "/privkey.pem"

    let certs = try! NIOSSLCertificate.fromPEMFile(certPath)
        .map { NIOSSLCertificateSource.certificate($0) }
    let tls = TLSConfiguration.forServer(certificateChain: certs, privateKey: .file(keyPath))

    app.http.server.configuration = .init(
        hostname: "localhost",
        port: 8080,
        backlog: 256,
        reuseAddress: true,
        tcpNoDelay: true,
        responseCompression: .disabled,
        requestDecompression: .disabled,
        supportPipelining: false,
        supportVersions: Set<HTTPVersionMajor>([.two]),
        tlsConfiguration: tls,
        serverName: nil,
        logger: nil
    )

    // register routes
    try routes(app)
}
