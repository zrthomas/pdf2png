"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const pdf2png_1 = __importDefault(require("../src/pdf2png"));
const buffer = (0, fs_1.readFileSync)("multipage.pdf");
const pdfConverter = new pdf2png_1.default(buffer);
pdfConverter.getPageCount()
    .then(pages => {
    console.log("PDF page count: ", pages);
    pdfConverter.convertPageToImage(1)
        .then(buffer => {
        (0, fs_1.writeFileSync)("example.png", buffer);
        console.log("PDF Written to file as PNG Image");
        pdfConverter.clean();
    });
})
    .catch(error => {
    console.error(error);
    pdfConverter.clean();
});
//# sourceMappingURL=example.js.map