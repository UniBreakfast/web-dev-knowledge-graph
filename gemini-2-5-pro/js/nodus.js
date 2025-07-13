export const nodus = new EventTarget

Object.assign(nodus, {
  init() { /* Placeholder */ },
  showMany(nodes) {
    console.log('Nodus: Showing many nodes:', nodes);
  }
})
