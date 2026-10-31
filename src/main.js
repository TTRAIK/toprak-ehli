import { properties } from './data/properties.js';
import { filterProperties } from './domain/properties.js';
import { renderListings } from './ui/listings.js';
import { createDetail } from './ui/detail.js';

const form = document.querySelector('#filters');
const openDetail = createDetail(document.querySelector('#detail'));
function render(filters = {}) {
  const matches = filterProperties(properties, filters);
  renderListings(document.querySelector('#listings'), matches, openDetail);
  document.querySelector('#results').textContent = `${matches.length} temsili portföy gösteriliyor.`;
}
form.addEventListener('submit', event => {
  event.preventDefault();
  render(Object.fromEntries(new FormData(form)));
});
form.addEventListener('reset', () => render());
render();
