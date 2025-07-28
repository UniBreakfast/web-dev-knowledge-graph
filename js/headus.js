export const headus = new EventTarget;

let elements = {};

Object.assign(headus, {
  init() {
    locateElements();
    // elements.addNodeButton.addEventListener('click', _handleAddNodeClick);
  },

  listNodes(names) {
    const options = names.map(name => new Option(name));
    elements.datalist.replaceChildren(...options);
  },
  
  enlistNode(name) {
    elements.datalist.append(new Option(name));
  },
});

function locateElements() {
  elements.datalist = document.getElementById('names');
  elements.queryInput = document.getElementById('query-input');
  elements.addNodeButton = document.getElementById('add-node-button');
}

function _handleAddNodeClick() {
  const name = elements.queryInput.value.trim();
  const detail = {};
  if (name) {
    detail.name = name;
  }
  headus.dispatchEvent(new CustomEvent('addnodetrigger', { detail }));
}
