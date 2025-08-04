export const linkus = new EventTarget;

let elements = {};

Object.assign(linkus, {
  init() {
    locateElements();
    // elements.relatedContainer.addEventListener('click', _handleRelatedLinkClick);
  },

  showTwin(links, currentId) {
    if (!links?.length) {
      // elements.viewMessageRadio.checked = true;
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
    const { form, unrelatedList } = elements;
    const linkItems = links.map(buildUnrelatedItem);
    
    form.related.checked = false;
    unrelatedList.replaceChildren(...linkItems);
  },
});

function locateElements() {
  elements.section = document.getElementById('linkus');
  elements.form = elements.section.querySelector('form');
  elements.unrelatedList = document.querySelector('#unrelated>.links');
  elements.unrelatedItem = elements.unrelatedList.querySelector('template')
    .content.firstElementChild;
  elements.relatedContainer = document.getElementById('linkus-related');
  elements.linkRelatedTemplate = document.getElementById('link-related-template');
}

function buildUnrelatedItem(link) {
  const item = elements.unrelatedItem.cloneNode(true);
  const [btn, from, to, description] = item.querySelectorAll('button, .from, .to, .description');

  btn.dataset.id = link.from.id + '_' + link.to.id;
  from.value = link.from.name;
  to.value = link.to.name;
  description.innerText = link.description || 'No description.';

  return item;
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
