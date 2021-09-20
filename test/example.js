const { readFileSync, writeFileSync } = require("fs");
const PDFConvert = require ("../dist/index.js").default;


// const buffer = readFileSync("multipage.pdf");

const pdfConverter = new PDFConvert("https://acplrollandcenterblob.blob.core.windows.net/cms-assets/436dd470-b1cf-11eb-936b-75a3a36a6a90.pdf");

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