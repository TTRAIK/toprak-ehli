import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, writeFile, cp, rename, lstat, readdir } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const live=process.env.TOPRAK_DEPLOY_MODE==='live';
execFileSync(process.execPath,[join(root,'scripts/build.mjs'),...(live?[]:['--demo'])],{cwd:root,stdio:'inherit'});
const latest=JSON.parse(await readFile(join(root,live?'releases/latest.json':'releases/latest-demo.json'),'utf8'));
const source=resolve(latest.directory);
if(!source.startsWith(resolve(root,'releases')+sep))throw new Error('Geçersiz paket kaynağı.');
const parent=resolve(root,'.deploy');
await mkdir(parent,{recursive:true});
const staging=await mkdtemp(join(parent,'staging-'));
await cp(source,staging,{recursive:true,filter:path=>!path.endsWith(`${sep}_headers`)});
// Müşteri sunumunda geliştirme dili kaldırılır; temsili kayıtlar gerçek diye işaretlenmez.
if(!live){
  const htmlPath=join(staging,'index.html');
  let html=await readFile(htmlPath,'utf8');
  html=html.replace('Toprak Ehli yerel geliştirme önizlemesi. Portföyler temsili örnektir.','Toprak Ehli — Trakya arsa ve arazi. Portföy seçeneklerini inceleyin ve bizimle iletişime geçin.')
    .replace('Geliştirme önizlemesi · Tüm portföyler temsili, bilgiler doğrulanmamıştır.','Toprak Ehli · Arsa & Yatırım · Trakya')
    .replace('Örnek portföyleri incele ↗','Portföyleri incele ↗')
    .replace('Yerel geliştirme · Temsili içerik','Arsa & Yatırım · Trakya')
    .replace('Bu önizleme yatırım tavsiyesi içermez.','İçerikler yatırım tavsiyesi değildir.');
  await writeFile(htmlPath,html);
}
const allowed=new Set(['index.html','404.html','robots.txt','src']);
for(const entry of await readdir(staging))if(!allowed.has(entry))throw new Error('Dağıtım kökünde beklenmeyen dosya.');
const output=join(parent,'site');
try{
  const current=await lstat(output);
  if(current.isSymbolicLink()||!current.isDirectory())throw new Error('Dağıtım yolu normal klasör olmalıdır.');
  const archive=join(parent,`previous-${Date.now()}`);
  if(!resolve(output).startsWith(parent+sep)||!resolve(archive).startsWith(parent+sep))throw new Error('Güvensiz taşıma yolu.');
  await rename(output,archive);
}catch(error){if(error.code!=='ENOENT')throw error;}
if(!resolve(staging).startsWith(parent+sep)||!resolve(output).startsWith(parent+sep))throw new Error('Güvensiz çıktı yolu.');
await rename(staging,output);
console.log(`Vercel hazır: ${live?'onaylı gerçek içerik':'açıkça etiketli müşteri demosu'} · ${latest.records} kayıt · .deploy/site`);
