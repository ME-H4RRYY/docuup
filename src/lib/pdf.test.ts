import {describe,it,expect} from 'vitest';
import {PDFDocument} from 'pdf-lib';
import {extractPdfPages,mergePdfs,rotatePdf,rewritePdf} from './pdf';
async function fixture(count:number){const doc=await PDFDocument.create();for(let i=0;i<count;i++)doc.addPage([300,400]);return doc.save()}
describe('PDF operations produce readable files',()=>{
 it('merges PDFs in order',async()=>{const out=await mergePdfs([await fixture(1),await fixture(2)]);expect((await PDFDocument.load(out)).getPageCount()).toBe(3)});
 it('extracts selected pages',async()=>{const out=await extractPdfPages(await fixture(4),[0,2]);const doc=await PDFDocument.load(out);expect(doc.getPageCount()).toBe(2);expect(doc.getPage(0).getSize().width).toBe(300)});
 it('rotates all pages',async()=>{const out=await rotatePdf(await fixture(2),90);const doc=await PDFDocument.load(out);expect(doc.getPages().every(p=>p.getRotation().angle===90)).toBe(true)});
 it('rewrites a readable PDF',async()=>{const out=await rewritePdf(await fixture(1));expect((await PDFDocument.load(out)).getPageCount()).toBe(1)});
});
