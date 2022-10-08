//
//  CreatePost.swift
//  
//
//  Created by Daniel Marriner on 08/10/2022.
//

import Vapor
import FluentKit

struct CreatePost: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        return database
            .schema(Post.schema)
            .field("id", .int, .identifier(auto: true))
            .field("icon", .string)
            .field("type", .int, .required)
            .field("date", .date, .required)
            .field("tags", .string, .required)
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database
            .schema(Post.schema)
            .delete()
    }
}
