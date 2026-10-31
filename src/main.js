import { properties } from './data/properties.js';
import { filterProperties } from './domain/properties.js';
import { renderListings } from './ui/listings.js';
import { createDetail } from './ui/detail.js';
import { comparisonLimit, toggleComparison } from './domain/comparison.js';
import { renderComparison } from './ui/comparison.js';

const form = document.querySelector('#filters');
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
  const matches = filterProperties(properties, currentFilters);
  renderListings(document.querySelector('#listings'), matches, openDetail,
    { ids: selectedIds, limit: comparisonLimit, onToggle: toggle });
  document.querySelector('#results').textContent = `${matches.length} temsili portföy gösteriliyor.`;
  document.querySelector('#comparison-status').textContent = `${selectedIds.length} / ${comparisonLimit} portföy seçildi. ${selectedIds.length === comparisonLimit ? 'Yeni seçim için bir portföyü kaldırın.' : 'Seçimler filtre değiştiğinde korunur.'}`;
  renderComparison(document.querySelector('#comparison'), properties.filter(property => selectedIds.includes(property.id)), id => toggle(id, true));
  document.querySelector('#clear-comparison').disabled = !selectedIds.length;
}
form.addEventListener('submit', event => {
  event.preventDefault();
  currentFilters = Object.fromEntries(new FormData(form));
  render();
});
form.addEventListener('reset', () => { currentFilters = {}; render(); });
document.querySelector('#clear-comparison').addEventListener('click', () => {
  selectedIds = [];
  render();
  document.querySelector('#comparison-title').focus();
});
render();
