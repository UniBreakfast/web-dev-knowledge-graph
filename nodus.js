export const nodus = new EventTarget;

let elements = {};

Object.assign(nodus, {
  init() {
    _initElements();
    elements.manyContainer.addEventListener('click', _handleNodusClick);
    elements.currentContainer.addEventListener('click', _handleCurrentViewInteraction);
    elements.currentContainer.addEventListener('change', _handleCurrentViewInteraction);
  },

  showOne(node, selectedId) {
    const view = _populateCurrentNode(node);
    elements.currentContainer.replaceChildren(view);

    const linkedNodesList = elements.currentContainer.querySelector('.linked-nodes-list');
    const hasLinks = node.linksToNodes?.length > 0;

    elements.currentContainer.querySelector('#linked-nodes-toggle').checked = hasLinks;

    if (hasLinks) {
      const items = node.linksToNodes.map(linkedNode => _populateLinkedNodeItem(linkedNode, selectedId));
      linkedNodesList.replaceChildren(...items);
    }

    elements.viewCurrentRadio.checked = true;
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
  elements.viewCurrentRadio = document.getElementById('nodus-view-current');
  elements.currentContainer = document.getElementById('nodus-current');
  elements.nodeCurrentTemplate = document.getElementById('node-current-template');
  elements.linkedNodeItemTemplate = document.getElementById('linked-node-item-template');
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

function _populateCurrentNode(node) {
  const viewClone = elements.nodeCurrentTemplate.content.cloneNode(true);
  const view = viewClone.querySelector('.node-current-content');
  
  view.dataset.id = node.id;
  view.querySelector('[data-name]').textContent = node.name;
  view.querySelector('[data-description]').textContent = node.description || 'No description.';

  return viewClone;
}

function _populateLinkedNodeItem(linkedNode, selectedId) {
  const itemClone = elements.linkedNodeItemTemplate.content.cloneNode(true);
  const radio = itemClone.querySelector('input[type="radio"]');
  const span = itemClone.querySelector('.linked-node-item');
  
  radio.value = linkedNode.id;
  if (linkedNode.id === selectedId) {
    radio.checked = true;
  }
  
  span.textContent = linkedNode.name;
  span.classList.add(linkedNode.direction);
  span.dataset.id = linkedNode.id;
  
  return itemClone;
}

function _handleNodusClick(event) {
  const button = event.target.closest('.goto-node-button');
  if (!button) return;

  const card = button.closest('.node-card');
  const id = +card.dataset.id;
  const detail = { id };

  nodus.dispatchEvent(new CustomEvent('gotonodetrigger', { detail }));
}

function _handleCurrentViewInteraction(event) {
  const target = event.target;
  const isRadio = target.matches('input[name="nodus-linked-node-select"]');
  const span = target.closest('.linked-node-item');

  if (!isRadio && !span) return;

  const currentId = +target.closest('.node-current-content').dataset.id;

  // Case 1: A new node is selected (change event)
  if (isRadio && event.type === 'change') {
    const selectedId = +target.value;
    const detail = {current: currentId, selected: selectedId};
    nodus.dispatchEvent(new CustomEvent('nodeselectedtrigger', {detail}));
  }
  // Case 2: An already-selected node is clicked (click event)
  else if (span && event.type === 'click') {
    const radio = span.parentElement.querySelector('input[type="radio"]');
    if (radio.checked) {
      const detail = {id: +span.dataset.id};
      nodus.dispatchEvent(new CustomEvent('gotonodetrigger', {detail}));
    }
  }
}
