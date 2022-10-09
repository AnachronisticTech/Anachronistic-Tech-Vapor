//
//  CreateNewsItem.swift
//  
//
//  Created by Daniel Marriner on 09/10/2022.
//

import Fluent

struct CreateNewsItem: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("news")
            .id()
            .field("publisher", .string, .required)
            .field("category", .string, .required)
            .field("headline", .string, .required)
            .field("published", .datetime, .required)
            .field("description", .string, .required)
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema("news").delete()
    }
}
