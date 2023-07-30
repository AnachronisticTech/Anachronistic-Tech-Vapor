import Fluent
import FluentMySQLDriver
import FluentSQLiteDriver
import Vapor
import Leaf
import NIOSSL
import AnachronisticTechAPI
import PsakseAPI
import CentralSeaServerAPI

public func configure(_ app: Application) throws
{
    app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))
    
    app.views.use(.leaf)
    app.leaf.cache.isEnabled = app.environment.isRelease
    
    app.routes.defaultMaxBodySize = ByteCount(integerLiteral: 10240000)
    
    if
        let certificatesPath = Environment.Security.certificatePath,
        let privateKeyPath = Environment.Security.privateKeyPath
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
                hostname: Environment.Database.host,
                username: Environment.Database.username,
                password: Environment.Database.password,
                database: Environment.Database.name,
                tlsConfiguration: localTLSConfiguration
            ),
            as: .mysql
        )

        app.http.server.configuration = .init(
            hostname: Environment.hostname,
            port: Environment.port,
            backlog: 256,
            reuseAddress: true,
            tcpNoDelay: true,
            responseCompression: .disabled,
            requestDecompression: .disabled,
            supportPipelining: false,
            supportVersions: Set<HTTPVersionMajor>([.two]),
            tlsConfiguration: tls
        )
    }
    else
    {
        app.http.server.configuration.hostname = Environment.hostname
        app.http.server.configuration.port = Environment.port
        app.databases.use(.sqlite(.file("db.sqlite")), as: .sqlite)
    }

    // AnachronisticTech
    try app.configure(service: AnachronisticTechWebService(
        publicPath: app.directory.publicDirectory,
        resourcesPath: app.directory.resourcesDirectory,
        pathComponent: "AnachronisticTech",
        logBehaviour: Environment.logBehaviour,
        devMode: Environment.devMode
    ))

    // Psakse
    if Environment.Services.PsakseAPIEnabled
    {
        try app.configure(service: PsakseWebService(
            publicPath: app.directory.publicDirectory,
            resourcesPath: app.directory.resourcesDirectory,
            pathComponent: "Psakse",
            logBehaviour: Environment.logBehaviour
        ))
    }

    // CentralSeaServer
    if Environment.Services.CSSAPIEnabled
    {
        try app.configure(service: CentralSeaServerService(
            publicPath: app.directory.publicDirectory,
            pathComponent: "CentralSeaServer",
            logBehaviour: Environment.logBehaviour
        ))
    }

    try app.autoMigrate().wait()
}
