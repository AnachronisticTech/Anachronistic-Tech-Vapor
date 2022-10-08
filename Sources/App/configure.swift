import Fluent
import FluentMySQLDriver
import FluentSQLiteDriver
import Vapor
import Leaf
import NIOSSL

public func configure(_ app: Application) throws {
    app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))
    
    app.views.use(.leaf)
    app.leaf.cache.isEnabled = app.environment.isRelease
    
    app.routes.defaultMaxBodySize = ByteCount(integerLiteral: 10240000)
    
    if
        let certPath = Environment.get("CERT_PATH"),
        let keyPath = Environment.get("KEY_PATH")
    {
        let certs = try! NIOSSLCertificate
            .fromPEMFile(certPath)
            .map { NIOSSLCertificateSource.certificate($0) }

        let tls = TLSConfiguration.makeServerConfiguration(
            certificateChain: certs,
            privateKey: .file(keyPath)
        )

        app.databases.use(
            .mysql(
                hostname: Environment.get("DATABASE_HOST") ?? "localhost",
                username: Environment.get("DATABASE_USERNAME") ?? "vapor_username",
                password: Environment.get("DATABASE_PASSWORD") ?? "vapor_password",
                database: Environment.get("DATABASE_NAME") ?? "vapor_database",
                tlsConfiguration: .makeClientConfiguration()
            ),
            as: .mysql
        )

        app.http.server.configuration = .init(
            hostname: Environment.get("HOSTNAME") ?? "127.0.0.1",
            port: Int(Environment.get("PORT") ?? "") ?? 8080,
            backlog: 256,
            reuseAddress: true,
            tcpNoDelay: true,
            responseCompression: .disabled,
            requestDecompression: .disabled,
            supportPipelining: false,
            supportVersions: Set<HTTPVersionMajor>([.two]),
            tlsConfiguration: tls
        )
    } else {
        app.databases.use(.sqlite(.file("db.sqlite")), as: .sqlite)
    }

    app.migrations.add(CreatePost())
    app.migrations.add(CreatePortfolio())

    try app.autoMigrate().wait()

    // register routes
    try routes(app)
}
