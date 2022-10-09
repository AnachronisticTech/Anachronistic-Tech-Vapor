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

    let hostname = Environment.get("HOSTNAME") ?? "127.0.0.1"
    let port = Int(Environment.get("PORT") ?? "") ?? 8080
    
    if
        let certificatesPath = Environment.get("CERT_PATH"),
        let privateKeyPath = Environment.get("KEY_PATH")
    {
        let certificates = try! NIOSSLCertificate
            .fromPEMFile(certificatesPath)
            .map { NIOSSLCertificateSource.certificate($0) }

        let tls = TLSConfiguration.makeServerConfiguration(
            certificateChain: certificates,
            privateKey: .file(privateKeyPath)
        )

        var localTLSConfiguration = TLSConfiguration.makeClientConfiguration()
        localTLSConfiguration.certificateVerification = .none

        app.databases.use(
            .mysql(
                hostname: Environment.get("DATABASE_HOST") ?? "localhost",
                username: Environment.get("DATABASE_USERNAME") ?? "vapor_username",
                password: Environment.get("DATABASE_PASSWORD") ?? "vapor_password",
                database: Environment.get("DATABASE_NAME") ?? "vapor_database",
                tlsConfiguration: localTLSConfiguration
            ),
            as: .mysql
        )

        app.http.server.configuration = .init(
            hostname: hostname,
            port: port,
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
        app.http.server.configuration.hostname = hostname
        app.http.server.configuration.port = port
        app.databases.use(.sqlite(.file("db.sqlite")), as: .sqlite)
    }

    app.migrations.add(CreatePost())
    app.migrations.add(CreatePortfolio())

    try app.autoMigrate().wait()

    // register routes
    try routes(app)
}
