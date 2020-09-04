//
//  File.swift
//  
//
//  Created by Daniel Marriner on 03/09/2020.
//

import Foundation

extension Data {
    /// Code courtesy of Tib on StackOverflow
    /// https://stackoverflow.com/questions/21789770/determine-mime-type-from-nsdata
    func ext() -> String {
        var b: UInt8 = 0
        self.copyBytes(to: &b, count: 1)
        switch b {
            case 0xFF:
                return "jpeg"
            case 0x89:
                return "png"
            case 0x47:
                return "gif"
            case 0x4D, 0x49:
                return "tiff"
            case 0x25:
                return "pdf"
            case 0x46:
                return "txt"
            default:
                return "octet-stream"
        }
    }
}
