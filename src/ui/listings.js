import { describeFact } from '../domain/facts.js';

export function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

export function renderListings(container, properties, onDetail, comparison) {
  container.replaceChildren();
  if (!properties.length) {
    container.append(element('p', 'Bu filtrelerle eşleşen örnek yok. Filtreleri sıfırlayarak tekrar deneyin.', 'empty'));
    return;
  }
  for (const property of properties) {
    const article = element('article', undefined, 'listing');
    const illustration = element('div', 'TEMSİLİ KAYIT', 'listing-art');
    article.append(illustration, element('p', property.region, 'eyebrow'), element('h3', property.local));
    const price = describeFact(property, ['price', 'Fiyat', 'TL']);
    const area = describeFact(property, ['area', 'Alan', 'm²']);
    const titleType = describeFact(property, ['type', 'Tapu türü']);
    article.append(element('p', `${area.value} · ${titleType.value}`, 'muted'));
    article.append(element('p', price.value, 'price'), element('p', price.status, 'muted'));
    const button = element('button', 'Örnek detayı incele ↗', 'detail-button');
    button.type = 'button';
    button.setAttribute('aria-label', `${property.local} örnek portföy detayını incele`);
    button.addEventListener('click', () => onDetail(property, button));
    article.append(button);
    const label = element('label', undefined, 'compare-choice');
    const checkbox = element('input');
    checkbox.type = 'checkbox';
    checkbox.checked = comparison.ids.includes(property.id);
    checkbox.disabled = !checkbox.checked && comparison.ids.length >= comparison.limit;
    checkbox.setAttribute('aria-label', `${property.local} karşılaştırmaya ekle`);
    checkbox.addEventListener('change', () => comparison.onToggle(property.id));
    label.append(checkbox, element('span', 'Karşılaştır'));
    article.append(label);
    container.append(article);
  }
}
