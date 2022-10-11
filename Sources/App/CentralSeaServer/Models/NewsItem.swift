//
//  NewsItem.swift
//
//
//  Created by Daniel Marriner on 15/05/2022.
//

import Foundation
import Vapor
import Fluent

final class NewsItem: Model, Content {
    static let schema = "news"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "publisher")
    var publisher: String?

    @Field(key: "category")
    var category: String

    @Field(key: "headline")
    var headline: String

    @Timestamp(key: "published", on: .create)
    var published: Date?

    @Field(key: "description")
    var description: String

    init() {}

    init(
        id: UUID? = nil,
        publisher: String? = nil,
        category: String,
        headline: String,
        published: Date? = nil,
        description: String
    ) {
        self.id = id
        self.publisher = publisher
        self.category = category
        self.headline = headline
        self.published = published
        self.description = description
    }

    static let dateFormatter: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withFullDate]
        return formatter
    }()
}

struct Secret: Content {
    let secret: String
}

struct SecurePayload<T: Codable>: Content {
    let secret: String
    let content: T
}

struct NewsItemPatch: Codable {
    let category: String?
    let headline: String?
    let description: String?
}
