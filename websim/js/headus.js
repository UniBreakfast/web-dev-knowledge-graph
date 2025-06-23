export const headus = new EventTarget
const header = document.querySelector('header')
const input = header.querySelector('input')
const addNodeBtn = document.getElementById('add-node')

Object.assign(headus, {
  getQuery() {
    return input.value
  },
})

init()

function init() {
  addNodeBtn.onclick = () => {
    const query = input.value
    const detail = {query}
    const e = new CustomEvent('addnode', {detail})
    
    headus.dispatchEvent(e)
  }

  input.oninput = () => {
    const query = input.value
    const detail = {query}
    const e = new CustomEvent('querynode', {detail})

    headus.dispatchEvent(e)
  }
}