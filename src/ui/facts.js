import { element } from './listings.js';

export function factContent(fact) {
  const content = element('div', undefined, 'fact-content');
  content.append(element('span', fact.value), element('small', fact.status, 'fact-status'),
    element('small', `Kaynak: ${fact.source}`), element('small', `Kontrol tarihi: ${fact.date}`));
  return content;
}
