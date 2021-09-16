import { readFileSync, writeFileSync } from "fs";
import PDFConvert from "../src/pdf2png";


const buffer = readFileSync("multipage.pdf");

const pdfConverter = new PDFConvert(buffer);

pdfConverter.getPageCount()
    .then(pages => {
        console.log("PDF page count: ", pages);
        
        pdfConverter.convertPageToImage(1)
            .then(buffer => {
                writeFileSync("example.png", buffer);
                console.log("PDF Written to file as PNG Image")
                pdfConverter.clean();
            })

    })
    .catch(error => {
        console.error(error);
        pdfConverter.clean();
    })