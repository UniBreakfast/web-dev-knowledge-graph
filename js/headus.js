export const headus = new EventTarget;

let elements = {};

Object.assign(headus, {
  init() {
    locateElements();
    addListeners();
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

function addListeners() {
  const { form, menuBtn } = elements;

  form.addEventListener('submit', handleSubmit);

  menuBtn.addEventListener('click', handleClick);
}

function handleSubmit(e) {
  e.preventDefault();
  
  const name = elements.form.query.value.trim();
  const detail = { name };
  const event = new CustomEvent('addnodetrigger', { detail });

  headus.dispatchEvent(event);
}

function handleClick() {
  headus.dispatchEvent(new CustomEvent('menutrigger'));
}
