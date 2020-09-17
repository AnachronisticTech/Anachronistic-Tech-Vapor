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
    
    let certPath = Environment.get("CERT_PATH")
    let keyPath = Environment.get("KEY_PATH")
    let hostname = Environment.get("HOSTNAME")
    let port = Environment.get("PORT")
    
    if let certPath = certPath, let keyPath = keyPath {
        let certs = try! NIOSSLCertificate.fromPEMFile(certPath)
            .map { NIOSSLCertificateSource.certificate($0) }
        let tls = TLSConfiguration.forServer(certificateChain: certs, privateKey: .file(keyPath))
        let portVal: Int
        if let port = port {
            portVal = Int(port) ?? 8080
        } else {
            portVal = 8080
        }

        app.http.server.configuration = .init(
            hostname: hostname ?? "127.0.0.1",
            port: portVal,
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
    }

    // register routes
    try routes(app)
}
