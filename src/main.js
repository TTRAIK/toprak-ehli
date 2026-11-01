import { properties as bundledProperties } from './data/properties.js';
import { fetchPortfolio } from './data/remote.js';
import { initializeInquiry } from './ui/inquiry.js';
import { discoverProperties } from './domain/discovery.js';
import { renderListings } from './ui/listings.js';
import { createDetail } from './ui/detail.js';
import { comparisonLimit, toggleComparison } from './domain/comparison.js';
import { renderComparison } from './ui/comparison.js';
import { renderContact, renderWhatsAppShortcut } from './ui/contact.js';
import { initializeSite } from './ui/site.js';
import { site } from './data/site.js';
import { createMotion } from './ui/motion.js';
import { initializeAssistant } from './ui/assistant.js';

let properties=bundledProperties, remoteRevision=null, loadError='';
if(site.online || site.localManaged){
  document.querySelector('#results').textContent='Portföyler yükleniyor…';
  try{const data=await fetchPortfolio(site.localManaged?'/api/records':'/api/platform/public');properties=data.records;remoteRevision=data.revision;}
  catch(error){properties=[];loadError=error.message;}
}
const form = document.querySelector('#filters');
const reveal = createMotion();
initializeSite(properties);
if(site.online) initializeInquiry(properties);
renderContact(document.querySelector('#contact-actions'));
renderWhatsAppShortcut();
const openDetail = createDetail(document.querySelector('#detail'));
let selectedIds = [];
let currentFilters = {};
let assistantSelection=null;
function toggle(id, fromTable = false) {
  selectedIds = toggleComparison(selectedIds, id, properties.map(property => property.id));
  render();
  // Rendering replaces the interacted control; restore keyboard focus to its successor.
  const property = properties.find(item => item.id === id);
  const checkbox = [...document.querySelectorAll('.compare-choice input')]
    .find(input => input.getAttribute('aria-label') === `${property.local} karşılaştırmaya ekle`);
  (fromTable ? document.querySelector('#comparison-title') : checkbox || document.querySelector('#comparison-title')).focus();
}
function render() {
  const source=assistantSelection?assistantSelection.map(id=>properties.find(p=>p.id===id)).filter(Boolean):properties;
  const matches = discoverProperties(source, currentFilters);
  renderListings(document.querySelector('#listings'), matches, openDetail,
    { ids: selectedIds, limit: comparisonLimit, onToggle: toggle });
  if (!site.preview && !properties.length) document.querySelector('.empty p').textContent = 'Portföylerimizi güncelliyoruz. Size uygun arsa ve arazi seçenekleri için bize ulaşın.';
  document.querySelector('#results').textContent = `${matches.length} ${site.preview ? 'temsili ' : ''}portföy gösteriliyor.${assistantSelection?' Asistan seçimi; tümünü görmek için filtreleri sıfırlayın.':''}`;
  document.querySelector('#comparison-status').textContent = `${selectedIds.length} / ${comparisonLimit} portföy seçildi. ${selectedIds.length === comparisonLimit ? 'Yeni seçim için bir portföyü kaldırın.' : 'Seçimler filtre değiştiğinde korunur.'}`;
  renderComparison(document.querySelector('#comparison'), properties.filter(property => selectedIds.includes(property.id)), id => toggle(id, true));
  document.querySelector('#clear-comparison').disabled = !selectedIds.length;
  reveal(document.querySelector('#listings'));
}
form.addEventListener('submit', event => {
  event.preventDefault();
  assistantSelection=null;
  currentFilters = Object.fromEntries(new FormData(form));
  render();
  const url = new URL(location.href);
  for (const key of ['query', 'region', 'budget', 'type', 'size', 'sort']) {
    const value = currentFilters[key];
    if (value && value !== 'all' && value !== 'default') url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }
  history.replaceState(null, '', url);
});
form.addEventListener('reset', () => {
  assistantSelection=null;
  currentFilters = {};
  render();
  const url = new URL(location.href);
  for (const key of ['query', 'region', 'budget', 'type', 'size', 'sort']) url.searchParams.delete(key);
  history.replaceState(null, '', url);
});
document.querySelector('#clear-comparison').addEventListener('click', () => {
  selectedIds = [];
  render();
  document.querySelector('#comparison-title').focus();
});
const params = new URLSearchParams(location.search);
for (const control of form.elements) {
  if (!control.name || !params.has(control.name)) continue;
  const value = params.get(control.name);
  if (control.tagName === 'SELECT' && ![...control.options].some(option => option.value === value)) continue;
  control.value = value;
}
currentFilters = Object.fromEntries(new FormData(form));
render();
const requested = properties.find(property => property.id === (params.get('property') || location.pathname.match(/^\/ilan\/([a-z0-9-]+)$/)?.[1]));
initializeAssistant({getProperties:()=>properties,onAction:action=>{
  if(action.type==='detail'){const p=properties.find(p=>p.id===action.payload);if(p)openDetail(p,document.querySelector('.site-chat-launcher'));return;}
  if(action.type==='contact'){document.querySelector('#iletisim').scrollIntoView({behavior:'instant'});document.querySelector('#contact-actions a')?.focus({preventScroll:true});return;}
  if(action.type==='results'){form.reset();assistantSelection=action.payload.filter(id=>properties.some(p=>p.id===id));render();document.querySelector('#portfoy').scrollIntoView({behavior:'instant'});return;}
  if(action.type==='compare'){selectedIds=[...new Set(action.payload)].filter(id=>properties.some(p=>p.id===id)).slice(0,comparisonLimit);render();document.querySelector('#comparison-title').scrollIntoView({behavior:'instant'});document.querySelector('#comparison-title').focus({preventScroll:true});}
}});
if (requested) {
  const trigger = [...document.querySelectorAll('.detail-button')].find(button => button.dataset.id === requested.id);
  openDetail(requested, trigger || document.querySelector('#portfolio-title'));
}

if(loadError){
  const empty=document.querySelector('.empty');empty.querySelector('p').textContent=loadError;
  const retry=document.createElement('button');retry.type='button';retry.className='button';retry.textContent='Yeniden dene';retry.addEventListener('click',()=>location.reload());empty.append(retry);
}
if((site.online || site.localManaged) && !loadError){
  let updating=false;
  async function synchronize(){
    if(document.hidden || updating)return;updating=true;
    try{const data=await fetchPortfolio(site.localManaged?'/api/records':'/api/platform/public');if(data.revision!==remoteRevision){
      properties=data.records;remoteRevision=data.revision;selectedIds=selectedIds.filter(id=>properties.some(record=>record.id===id));
      const region=form.elements.region;region.replaceChildren(new Option('Tüm bölgeler','all'));
      document.querySelector('#filters').hidden=false;document.querySelector('.comparison').hidden=false;document.querySelector('#results').hidden=false;
      initializeSite(properties);render();
      const detail=document.querySelector('#detail');if(detail.open)detail.close();
      document.querySelector('#results').textContent+=' Portföy bilgileri güncellendi.';
    }}catch{document.querySelector('#results').textContent='Güncel bilgiler alınamadı. Yeniden yüklemeyi deneyin.';}
    finally{updating=false;}
  }
  setInterval(synchronize,site.localManaged?3000:30000);document.addEventListener('visibilitychange',synchronize);
}

