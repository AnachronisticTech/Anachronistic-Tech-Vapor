//
//  CreatePortfolio.swift
//  
//
//  Created by Daniel Marriner on 08/10/2022.
//

import Vapor
import FluentKit

struct CreatePortfolio: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        return database
            .schema(PortfolioItem.schema)
            .field("id", .int, .identifier(auto: true))
            .field("icon", .string)
            .field("type", .int, .required)
            .field("tag", .string, .required)
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database
            .schema(PortfolioItem.schema)
            .delete()
    }
}
