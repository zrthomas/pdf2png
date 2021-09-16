"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ghostscriptPath = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const tmp_1 = __importDefault(require("tmp"));
const axios_1 = __importDefault(require("axios"));
const promises_1 = require("fs/promises");
let initialized = false;
// Add Ghostscript executables path
let projectPath = __dirname.split(path_1.default.sep);
projectPath.pop();
let parentPath = projectPath.join(path_1.default.sep);
exports.ghostscriptPath = path_1.default.join(parentPath, "executables", "ghostScript");
class PDFConvert {
    /**
     * Constructs a new Convert Object
     * @param source Can be either the buffer of the data, or a web url of the file
     * @param options ghostScript Options
     */
    constructor(source, options) {
        /**
         * Gets the page count of the pdf
         * @returns number of pages in the pdf
         */
        this.getPageCount = () => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // If the file wasn't yet written to temp location, we need to do that
            if (!this.tempLocation) {
                try {
                    this.tempLocation = yield this.writeFileToTemp();
                }
                catch (e) {
                    return reject("Unable to get page count, " + e);
                } //end try catch
            } //end if
            const cmd = `gs -q -dNODISPLAY -c "(${this.tempLocation.replace(/\\/g, "/")}) (r) file runpdfbegin pdfpagecount = quit"`;
            (0, child_process_1.exec)(cmd, (err, stdout, stderr) => {
                if (err)
                    return reject("Unable to get page count, " + err);
                //Remove the \n at the end
                const pageCount = parseInt(stdout.substr(0, stdout.length - 1));
                return resolve(pageCount);
            });
        }));
        /**
         * Writes the source file to a tmp location
         * @returns Filename
         */
        this.writeFileToTemp = () => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let file;
            // If this is a web path then use axios to fetch the file
            if (typeof (this.source) === "string") {
                try {
                    const response = yield (0, axios_1.default)({
                        url: this.source,
                        method: 'GET',
                        responseType: 'blob'
                    });
                    file = response.data;
                }
                catch (e) {
                    return reject("Unable to fetch file from web location: " + e);
                } //end try catch
            }
            else {
                file = this.source;
            } //end if else
            tmp_1.default.file({}, (err, name, fd) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return reject(`Unable to open tmp file: ` + err);
                try {
                    yield (0, promises_1.writeFile)(name, file);
                    return resolve(name);
                }
                catch (e) {
                    return reject(`Unable to write tmp file: ` + e);
                } //end try catch
            }));
        }));
        /**
         * Removes the temp file created for the PDF conversion
         * This should be called manually in case you want to do multiple operations
         */
        this.clean = () => {
            if (this.tempLocation)
                return (0, promises_1.unlink)(this.tempLocation);
            else
                return Promise.resolve();
        }; //end ()
        this.source = source;
        this.options = options;
    }
}
exports.default = PDFConvert;
//# sourceMappingURL=pdf2png.js.map