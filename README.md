# Pdf2PNG (Typescript Support)


## Install
```
npm install pdf2png-ts
```


This is based on another project. (https://github.com/Inkognitoo/Pdf2Png)

This version uses typescript and promises to greatly simplify usage since the old module is almost 7 years old.

---
## Setup
### Windows
No additional setup is needed for Windows

### Linux
If you want to use it with linux, you will need to install ghostscript and pass the executable location as the second argument to the constructor.
If ghostscript is installed globaly and can be accessed by simply specifying "gs" in a shell terminal, then pass "false" to the argument
Here is an example if you install ghostscript using debian/ubuntu apt and its accessable globally:
~~~
> sudo apt-get update
> sudo apt-get install ghostscript
~~~
```typescript
const pdfConverter = new PDFConvert(buffer, false);
```

Here is an example if you have a specific location for the ghostscript binary:
```typescript
const pdfConverter = new PDFConvert(buffer, "/somedir/ghostscript_dir");
```

---
## Examples
here some examples how to use:

```typescript

// Create a PDFConvert Object to use for the each pdf file
// Buffer
const pdfConverter = new PDFConvert(buffer);
// OR web url
const pdfConverter = new PDFConvert("http://example.com/example.pdf");

// Get the page count of the PDF (this returns a promise)
const pages = await pdfConverter.getPageCount()

// Get page 1 as a PNG Image Buffer
const buffer = await pdfConverter.convertPageToImage(1)
await fs.writeFile("example_page1.png", buffer);

/**
 * Make sure you always clean the converter object when you're done using it, 
 * Otherwise the pdf tmp file will not be removed.
 * 
 * Having to manually call clean allows you to run multiple operations on the same tmp file
 * and reduces latency with having to refetch and write the pdf to a tmp location on every
 * call.
 */
pdfConverter.clean()

```