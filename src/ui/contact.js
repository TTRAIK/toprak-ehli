import { contact, contactLinks } from '../data/contact.js';
import { element } from './listings.js';

export function renderContact(container, property) {
  container.replaceChildren();
  if (!property) container.append(element('p', `${contact.phoneLabel} · ${contact.email}`, 'muted'));
  const links = element('div', undefined, 'contact-links');
  for (const [label, href] of contactLinks(property)) {
    const link = element('a', label, 'button');
    link.href = href;
    if (href.startsWith('https:')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${label} (yeni sekme)`);
    }
    links.append(link);
  }
  container.append(links, element('p', 'Mesaj uygulamanızda hazırlanır; göndermeden önce inceleyebilirsiniz. Bu sitede talep kaydı oluşturulmaz.', 'muted'));
}
