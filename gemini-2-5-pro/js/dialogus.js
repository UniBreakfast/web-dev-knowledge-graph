export const dialogus = new EventTarget

Object.assign(dialogus, {
  init() { /* Placeholder */ },
  open(name, data) {
    console.log('Dialogus: Opening dialog:', name, data);
  }
})
