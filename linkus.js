export const linkus = new EventTarget;

let elements = {};

Object.assign(linkus, {
  init() {
    _initElements();
  },
  
  showMany(links) {
    if (!links?.length) {
      elements.viewMessageRadio.checked = true;
      return;
    }

    const cards = links.map(_populateLinkCard);
    elements.unrelatedContainer.replaceChildren(...cards);
    elements.viewUnrelatedRadio.checked = true;
  },
});

function _initElements() {
  elements.viewUnrelatedRadio = document.getElementById('linkus-view-unrelated');
  elements.viewMessageRadio = document.getElementById('linkus-view-message');
  elements.unrelatedContainer = document.getElementById('linkus-unrelated');
  elements.linkCardTemplate = document.getElementById('link-card-template');
}

function _populateLinkCard(link) {
  const cardClone = elements.linkCardTemplate.content.cloneNode(true);
  const card = cardClone.querySelector('.link-card');
  card.dataset.fromId = link.from.id;
  card.dataset.toId = link.to.id;

  card.querySelector('[data-names]').textContent = `${link.from.name} → ${link.to.name}`;
  card.querySelector('[data-description]').textContent = link.description || 'No description.';

  return cardClone;
}
