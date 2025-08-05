export const nodus = new EventTarget;

let elements = {};

Object.assign(nodus, {
  init() {
    locateElements();
    addListeners();
    // elements.manyContainer.addEventListener('click', _handleNodusClick);
    // elements.currentContainer.addEventListener('click', _handleCurrentViewInteraction);
    // elements.currentContainer.addEventListener('change', _handleCurrentViewInteraction);
  },

  showOne(node, selectedId) {
    const { id, name, description } = node;
    const { form, linkedList } = elements;
    const linkedItems = node.linksToNodes.map(buildLinkedItem);

    form.current.checked = true;
    form.name.value = name;
    form.description.value = description;
    form.id.value = id;
    form.selected.value = selectedId;
    linkedList.replaceChildren(...linkedItems);
  },

  showMany(nodes) {
    const { form, nodeList } = elements;
    const nodeItems = nodes.map(buildNodeItem);
    
    form.current.checked = false;
    nodeList.replaceChildren(...nodeItems);
  },

  getCurrentId() {
    if (!elements.viewCurrentRadio.checked) return null;
    const currentView = elements.currentContainer.querySelector('.node-current-content');
    return currentView ? +currentView.dataset.id : null;
  },
});

function locateElements() {
  elements.section = document.getElementById('nodus');
  elements.form = elements.section.querySelector('form');
  elements.linkedList = document.getElementById('linked');
  elements.linkedItem = elements.linkedList.querySelector('template')
    .content.firstElementChild;
  elements.nodeList = document.getElementById('nodes');
  elements.nodeItem = elements.nodeList.querySelector('template')
    .content.firstElementChild;
}

function addListeners() {
  const {form} = elements;

  form.addEventListener('submit', handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault();

  const btn = event.submitter;
  
  switch (btn.value) {
    case 'goto':
      const id = +btn.dataset.id;
      const detail = { id };
      const event = new CustomEvent('gotonodetrigger', { detail });

      nodus.dispatchEvent(event);
      break;

  }
}

function buildLinkedItem(node) {
  const item = elements.linkedItem.cloneNode(true);
  const [radio, nameOut, btn] = item.querySelectorAll('input, output, button');
  const {id, name, direction} = node;

  item.className = direction;
  radio.value = id;
  nameOut.value = name;
  btn.dataset.id = id;
  
  return item;
}

function buildNodeItem(node) {
  const item = elements.nodeItem.cloneNode(true);
  const [btn, incoming, outgoing, name, description] = 
    item.querySelectorAll('button, .incoming, .outgoing, .name, .description');

  btn.dataset.id = node.id;
  incoming.value = node.linkCount.incoming;
  outgoing.value = node.linkCount.outgoing;
  name.innerText = node.name;
  description.innerText = node.description || 'No description.';

  return item;
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

  const deleteNodeButton = target.closest('.delete-node-button');

  if (deleteNodeButton) {
    const id = +target.closest('.node-current-content').dataset.id;
    nodus.dispatchEvent(new CustomEvent('deletenodetrigger', { detail: { id } }));
    return;
  }
  
  const addLinkButton = target.closest('.add-link-button');

  if (addLinkButton) {
    const id = +target.closest('.node-current-content').dataset.id;
    nodus.dispatchEvent(new CustomEvent('addlinktrigger', { detail: { id } }));
    return;
  }

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
