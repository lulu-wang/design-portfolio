import AppKit
import Foundation
import PDFKit

let src = URL(fileURLWithPath: "/Users/luluw/Downloads/Alek_Tain_Corrected_59_Pages.pdf")
let out = URL(fileURLWithPath: "/Users/luluw/design-portfolio/public/images/flipnote", isDirectory: true)
try FileManager.default.createDirectory(at: out, withIntermediateDirectories: true)

guard let doc = PDFDocument(url: src) else {
    fputs("failed to open pdf\n", stderr)
    exit(1)
}

let scale: CGFloat = 1.75
for i in 0..<doc.pageCount {
    autoreleasepool {
        guard let page = doc.page(at: i) else { return }
        let box = page.bounds(for: .mediaBox)
        let w = Int(ceil(box.width * scale))
        let h = Int(ceil(box.height * scale))
        guard let ctx = CGContext(
            data: nil,
            width: w,
            height: h,
            bitsPerComponent: 8,
            bytesPerRow: 0,
            space: CGColorSpaceCreateDeviceRGB(),
            bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
        ) else { return }
        ctx.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
        ctx.fill(CGRect(x: 0, y: 0, width: CGFloat(w), height: CGFloat(h)))
        ctx.scaleBy(x: scale, y: scale)
        page.draw(with: .mediaBox, to: ctx)
        guard let cg = ctx.makeImage() else { return }
        let rep = NSBitmapImageRep(cgImage: cg)
        guard let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.75]) else { return }
        let name = String(format: "page-%02d.jpg", i + 1)
        try! data.write(to: out.appendingPathComponent(name))
        print("\(name)\t\(w)x\(h)\t\(data.count)")
    }
}
