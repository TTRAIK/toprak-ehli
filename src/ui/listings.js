import { formatNumber } from '../domain/properties.js';

export function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

export function renderListings(container, properties, onDetail) {
  container.replaceChildren();
  if (!properties.length) {
    container.append(element('p', 'Bu filtrelerle eşleşen örnek yok. Filtreleri sıfırlayarak tekrar deneyin.', 'empty'));
    return;
  }
  for (const property of properties) {
    const article = element('article', undefined, 'listing');
    const illustration = element('div', 'TEMSİLİ KAYIT', 'listing-art');
    article.append(illustration, element('p', property.region, 'eyebrow'), element('h3', property.local));
    article.append(element('p', `${formatNumber(property.area)} m² · ${property.type} (temsili)`, 'muted'));
    article.append(element('p', `${formatNumber(property.price)} TL`, 'price'), element('p', 'Kaynak / doğrulama tarihi sağlanmadı', 'muted'));
    const button = element('button', 'Örnek detayı incele ↗', 'detail-button');
    button.type = 'button';
    button.setAttribute('aria-label', `${property.local} örnek portföy detayını incele`);
    button.addEventListener('click', () => onDetail(property, button));
    article.append(button);
    container.append(article);
  }
}
