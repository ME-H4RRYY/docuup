import {describe,it,expect} from 'vitest';
import {checkImage} from './validation';
describe('document requirement checks',()=>{it('checks mime, size and dimensions against user rules',()=>{const r=checkImage(new File(['x'],'photo.jpg',{type:'image/jpeg'}),200,230,'image/jpeg','100','','200','200','230','230');expect(r.every(x=>x.pass)).toBe(true)});it('reports failed requirements',()=>{const r=checkImage(new File(['x'],'photo.png',{type:'image/png'}),20,30,'image/jpeg','0','','200','','','');expect(r.some(x=>!x.pass)).toBe(true)})});


