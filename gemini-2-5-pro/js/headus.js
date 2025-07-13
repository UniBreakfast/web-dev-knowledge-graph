export const headus = new EventTarget

Object.assign(headus, {
  init() { /* Placeholder */ },
  listNodes(names) {
    console.log('Headus: Listing nodes for datalist:', names);
  },
})
