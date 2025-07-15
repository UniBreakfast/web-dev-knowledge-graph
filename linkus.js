export const linkus = new EventTarget;

let elements = {};

Object.assign(linkus, {
  init() {
    _initElements();
    elements.relatedContainer.addEventListener('click', _handleRelatedLinkClick);
  },

  showTwin(links, currentId) {
    if (!links?.length) {
      elements.viewMessageRadio.checked = true;
      // Later we'll add logic to show a more specific message
      return;
    }

    const cards = links.map(link => _populateRelatedLink(link, currentId));
    // Sort to show outgoing links first
    cards.sort(a => a.querySelector('[data-direction="incoming"]') ? 1 : -1);

    elements.relatedContainer.replaceChildren(...cards);
    elements.viewRelatedRadio.checked = true;
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
  elements.viewRelatedRadio = document.getElementById('linkus-view-related');
  elements.relatedContainer = document.getElementById('linkus-related');
  elements.linkRelatedTemplate = document.getElementById('link-related-template');
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

function _populateRelatedLink(link, currentId) {
  const cardClone = elements.linkRelatedTemplate.content.cloneNode(true);
  const details = cardClone.querySelector('.link-details');
  details.classList.add(link.direction);
  details.dataset.direction = link.direction;
  
  // Store IDs for event handling
  details.dataset.fromId = link.direction === 'outgoing' ? currentId : link.node.id;
  details.dataset.toId = link.direction === 'outgoing' ? link.node.id : currentId;

  details.querySelector('[data-name]').textContent = link.node.name;
  details.querySelector('[data-description]').textContent = link.description || 'No description.';
  details.querySelector('[data-node-description]').textContent = link.node.description || 'No description.';

  return cardClone;
}

function _handleRelatedLinkClick(event) {
  const deleteButton = event.target.closest('.delete-link-button');
  if (!deleteButton) return;

  const details = deleteButton.closest('.link-details');
  const { fromId, toId } = details.dataset;

  const detail = {
    id: {
      from: +fromId,
      to: +toId,
    },
  };
  linkus.dispatchEvent(new CustomEvent('deletelinktrigger', { detail }));
}
