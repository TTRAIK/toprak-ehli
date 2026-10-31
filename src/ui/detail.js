import { element } from './listings.js';
import { propertyFacts } from '../domain/facts.js';
import { factContent } from './facts.js';

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
    facts.replaceChildren(...propertyFacts(property).flatMap(fact => {
      const value = element('dd');
      value.append(factContent(fact));
      return [element('dt', fact.label), value];
    }));
    dialog.showModal();
  };
}
