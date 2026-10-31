import { element } from './listings.js';
import { formatNumber, pricePerSquareMeter } from '../domain/properties.js';

export function createDetail(dialog) {
  let trigger;
  dialog.querySelector('#close-detail').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => trigger?.focus());
  return (property, button) => {
    trigger = button;
    dialog.querySelector('#detail-title').textContent = property.local;
    dialog.querySelector('#detail-location').textContent = property.region;
    const facts = dialog.querySelector('#detail-facts');
    const unitPrice = pricePerSquareMeter(property.price, property.area);
    const rows = [
      ['Örnek fiyat', `${formatNumber(property.price)} TL`], ['Alan', `${formatNumber(property.area)} m²`],
      ['Örnek m² fiyatı', unitPrice === null ? 'Hesaplanamadı' : `${formatNumber(unitPrice)} TL/m²`],
      ['Tapu türü', `${property.type} (temsili, doğrulanmadı)`],
      ...['Ada / parsel', 'İmar', 'Yol erişimi', 'Altyapı', 'Kaynak', 'Doğrulama tarihi', 'Fiyat tarihi'].map(label => [label, 'Bilgi sağlanmadı']),
    ];
    facts.replaceChildren(...rows.flatMap(([key, value]) => [element('dt', key), element('dd', value)]));
    dialog.showModal();
  };
}
