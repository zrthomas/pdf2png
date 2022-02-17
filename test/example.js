const { readFileSync, writeFileSync } = require("fs");
const PDFConvert = require ("../dist/index.js").default;


// const buffer = readFileSync("multipage.pdf");

const pdfConverter = new PDFConvert("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");

pdfConverter.getPageCount()
    .then(pages => {
        console.log("PDF page count: ", pages);
        
        // pdfConverter.convertPageToImage(1)
        //     .then(buffer => {
        //         writeFileSync("example.png", buffer);
        //         console.log("PDF Written to file as PNG Image")
        //         pdfConverter.clean();
        //     })

    })
    .catch(error => {
        console.error(error);
        pdfConverter.clean();
    })