export const nodus = new EventTarget;

let elements = {};

Object.assign(nodus, {
  init() {
    _initElements();
  },

  showMany(nodes) {
    if (!nodes?.length) {
      elements.viewMessageRadio.checked = true;
      return;
    }

    const cards = nodes.map(_populateNodeCard);
    elements.manyContainer.replaceChildren(...cards);
    elements.viewManyRadio.checked = true;
  },
});

function _initElements() {
  elements.viewManyRadio = document.getElementById('nodus-view-many');
  elements.viewMessageRadio = document.getElementById('nodus-view-message');
  elements.manyContainer = document.getElementById('nodus-many');
  elements.nodeCardTemplate = document.getElementById('node-card-template');
}

function _populateNodeCard(node) {
  const cardClone = elements.nodeCardTemplate.content.cloneNode(true);
  const card = cardClone.querySelector('.node-card');
  card.dataset.id = node.id;
  
  card.querySelector('[data-name]').textContent = node.name;
  card.querySelector('[data-description]').textContent = node.description || 'No description.';
  card.querySelector('[data-incoming]').textContent = node.linkCount.incoming;
  card.querySelector('[data-outgoing]').textContent = node.linkCount.outgoing;
  
  return cardClone;
}
