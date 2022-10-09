//
//  psakse-api.swift
//  
//
//  Created by Daniel Marriner on 08/10/2022.
//

import Vapor

struct PsakseAPI: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let api = routes.grouped("psakse-api")
        api.get(use: getAllPuzzles)
        api.post(use: createPuzzle)
        api.get("editor", use: editor)
    }

    // MARK: - Handlers relating to views
    func editor(req: Request) throws -> EventLoopFuture<View> {
        return req.view.render("Psakse/editor", [
            "title": "Puzzle upload"
        ])
    }

    // MARK: - Handlers relating to Puzzles
    func getAllPuzzles(req: Request) throws -> EventLoopFuture<[Puzzle]> {
        return Puzzle.query(on: req.db).all()
    }

    func createPuzzle(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        fatalError("not yet implemented")
    }
}
