export const headus = new EventTarget;

let elements = {};

Object.assign(headus, {
  init() {
    locateElements();
    
    const { form, menuBtn } = elements;

    menuBtn.addEventListener('click', () => {
      headus.dispatchEvent(new CustomEvent('menutrigger'));
    });
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
  elements.form = document.querySelector('form');
  elements.menuBtn = document.getElementById('open-menu');
}

function _handleAddNodeClick() {
  const name = elements.queryInput.value.trim();
  const detail = {};
  if (name) {
    detail.name = name;
  }
  headus.dispatchEvent(new CustomEvent('addnodetrigger', { detail }));
}
