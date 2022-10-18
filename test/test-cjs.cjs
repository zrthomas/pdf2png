const test = require('ava');
const { readFile } = require('node:fs/promises');
const { PdfConvert } = require('../dist/index.cjs');

test('page count of local pdf file', async (t) => {
  const pdfConverter = new PdfConvert('test/multipage.pdf');

  const pages = await pdfConverter.getPageCount();
  t.is(pages, 10);

  await pdfConverter.dispose();
  t.pass('disposed');
});

test('read as buffer', async (t) => {
  const buffer = await readFile('test/multipage.pdf');
  t.truthy(buffer instanceof Buffer);

  const pdfConverter = new PdfConvert(buffer);

  const pages = await pdfConverter.getPageCount();
  t.is(pages, 10);

  await pdfConverter.dispose();
  t.pass('disposed');
});
