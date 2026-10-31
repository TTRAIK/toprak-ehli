import { properties } from './data/properties.js';
import { discoverProperties } from './domain/discovery.js';
import { renderListings } from './ui/listings.js';
import { createDetail } from './ui/detail.js';
import { comparisonLimit, toggleComparison } from './domain/comparison.js';
import { renderComparison } from './ui/comparison.js';
import { renderContact, renderWhatsAppShortcut } from './ui/contact.js';
import { initializeSite } from './ui/site.js';
import { site } from './data/site.js';

const form = document.querySelector('#filters');
initializeSite(properties);
renderContact(document.querySelector('#contact-actions'));
renderWhatsAppShortcut();
const openDetail = createDetail(document.querySelector('#detail'));
let selectedIds = [];
let currentFilters = {};
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
  const matches = discoverProperties(properties, currentFilters);
  renderListings(document.querySelector('#listings'), matches, openDetail,
    { ids: selectedIds, limit: comparisonLimit, onToggle: toggle });
  if (!site.preview && !properties.length) document.querySelector('.empty p').textContent = 'Portföylerimizi güncelliyoruz. Size uygun arsa ve arazi seçenekleri için bize ulaşın.';
  document.querySelector('#results').textContent = `${matches.length} ${site.preview ? 'temsili ' : ''}portföy gösteriliyor.`;
  document.querySelector('#comparison-status').textContent = `${selectedIds.length} / ${comparisonLimit} portföy seçildi. ${selectedIds.length === comparisonLimit ? 'Yeni seçim için bir portföyü kaldırın.' : 'Seçimler filtre değiştiğinde korunur.'}`;
  renderComparison(document.querySelector('#comparison'), properties.filter(property => selectedIds.includes(property.id)), id => toggle(id, true));
  document.querySelector('#clear-comparison').disabled = !selectedIds.length;
}
form.addEventListener('submit', event => {
  event.preventDefault();
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
const requested = properties.find(property => property.id === params.get('property'));
if (requested) {
  const trigger = [...document.querySelectorAll('.detail-button')].find(button => button.dataset.id === requested.id);
  openDetail(requested, trigger || document.querySelector('#portfolio-title'));
}
