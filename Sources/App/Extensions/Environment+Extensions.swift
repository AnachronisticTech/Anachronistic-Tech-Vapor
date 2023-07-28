//
//  Environment+Extensions.swift
//  
//
//  Created by Daniel Marriner on 28/07/2023.
//

import Vapor
import WebServiceBuilder

extension Environment
{
    static var hostname: String { Environment.get("HOSTNAME") ?? "127.0.0.1" }
    static var port: Int { Int(Environment.get("PORT") ?? "") ?? 8080 }
    static var devMode: Bool { Bool(Environment.get("DEV_MODE") ?? "") ?? false }
    static var logBehaviour: LogBehaviour
    {
        guard let behaviour = Environment.get("LOG_BEHAVIOUR") else { return .none }
        return LogBehaviour(stringValue: behaviour)
    }

    enum Database
    {
        static var host: String { Environment.get("DATABASE_HOST") ?? "localhost" }
        static var username: String { Environment.get("DATABASE_USERNAME") ?? "vapor_username" }
        static var password: String { Environment.get("DATABASE_PASSWORD") ?? "vapor_password" }
        static var name: String { Environment.get("DATABASE_NAME") ?? "vapor_database" }
    }

    enum Security
    {
        static var certificatePath: String? { Environment.get("CERT_PATH") }
        static var privateKeyPath: String? { Environment.get("KEY_PATH") }
    }

    enum Services
    {
        static var CSSAPIEnabled: Bool { Bool(Environment.get("CSS_API_ENABLED") ?? "") ?? false }
        static var PsakseAPIEnabled: Bool { Bool(Environment.get("PSAKSE_API_ENABLED") ?? "") ?? false }
    }
}
