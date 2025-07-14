export const headus = new EventTarget;

let elements = {};

Object.assign(headus, {
  init() {
    _initElements();
  },

  listNodes(names) {
    const options = names.map(name => new Option(name));
    elements.datalist.replaceChildren(...options);
  },
});

function _initElements() {
  elements.datalist = document.getElementById('nodes-datalist');
}
