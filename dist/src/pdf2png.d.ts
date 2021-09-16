/// <reference types="node" />
export default class PDFConvert {
    options: any;
    source: Buffer | string;
    tempLocation: string | undefined;
    ghostscriptPath: string;
    /**
     * Constructs a new Convert Object
     * @param source Can be either the buffer of the data, or a web url of the file
     * @param options ghostScript Options
     */
    constructor(source: Buffer | string, options?: any);
    convertPageToImage: (page: number) => Promise<Buffer>;
    /**
     * Gets the page count of the pdf
     * @returns number of pages in the pdf
     */
    getPageCount: () => Promise<number>;
    /**
     * Writes the source file to a tmp location
     * @returns Filename
     */
    private writePDFToTemp;
    /**
     * Removes the temp file created for the PDF conversion
     * This should be called manually in case you want to do multiple operations
     */
    clean: () => Promise<void>;
}
