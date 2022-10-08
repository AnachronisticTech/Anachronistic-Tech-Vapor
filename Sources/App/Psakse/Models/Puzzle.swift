import Fluent
import Vapor

final class Puzzle: Model, Content {
    static var schema: String = "puzzles"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "size")
    var size: Int

    @Field(key: "fixed")
    var fixed: [Int: String]

    @Field(key: "deck")
    var deck: [String: Int]

    init() {}

    init(
        id: UUID? = nil,
        size: Int,
        fixed: [Int: String],
        deck: [String: Int]
    ) {
        self.id = id
        self.size = size
        self.fixed = fixed
        self.deck = deck

//        let count = Array(deck.values).reduce(0, +) + fixed.count
    }

    struct Input: Content {
        var size: Int
        var fixed: [Int: String]
        var deck: [String: Int]
    }
}
