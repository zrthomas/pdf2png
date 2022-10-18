import test from 'ava';
import { writeFile } from 'fs/promises';
import { PdfConvert } from '../dist/index.js';

test('convert local pdf file', async (t) => {
  const pdfConverter = new PdfConvert('test/multipage.pdf');

  const pages = await pdfConverter.getPageCount();
  t.is(pages, 10);

  const buffer = await pdfConverter.convertPageToImage(1);
  t.truthy(buffer instanceof Buffer);

  await writeFile('test/page-local1.png', buffer);
  t.pass('write png');

  await pdfConverter.dispose();
  t.pass('disposed');
});

test('convert pdf file from remote', async (t) => {
  const pdfConverter = new PdfConvert('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');

  const pages = await pdfConverter.getPageCount();
  t.is(pages, 1, 'page count');

  const buffer = await pdfConverter.convertPageToImage(1);
  t.truthy(buffer instanceof Buffer);

  await writeFile('test/page-remote.png', buffer);
  t.pass('write png');

  await pdfConverter.dispose();
  t.pass('disposed');
});
