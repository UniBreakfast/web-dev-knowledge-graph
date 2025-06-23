export const nodus = new EventTarget

const article = document.querySelector('article')
const section = article.parentElement
const nodeName = article.querySelector('h2')
const nodeDescription = article.querySelector('p')
const editBtn = article.querySelector('.edit')
const addLinkBtn = article.querySelector('.link')
const deleteBtn = article.querySelector('.delete')
const neighborList = article.querySelector('ul')

Object.assign(nodus, {
  getCurrentNodeId() {
    return article.dataset.id ? Number(article.dataset.id) : null
  },

  present(node) {
    article.dataset.id = node.id
    nodeName.textContent = node.name
    nodeDescription.textContent = node.description

    // Clear and rebuild neighbor list
    neighborList.innerHTML = ''
    if (node.neighbors) {
      for (const neighbor of node.neighbors) {
        const li = document.createElement('li')
        li.innerHTML = `
          <label class="button ${neighbor.direction}">
            <input type="radio" name="node" hidden>
            <span>${neighbor.name}</span>
          </label>
        `
        li.dataset.id = neighbor.id
        neighborList.appendChild(li)
      }
    }
    
    section.replaceChildren(article)
  },

  clear() {
    delete article.dataset.id
    nodeName.textContent = ''
    nodeDescription.textContent = ''
    neighborList.innerHTML = ''
  },
})

init()

function init() {
  editBtn.onclick = () => {
    if (!article.dataset.id) return
    
    const {id} = article.dataset
    const detail = {id}
    const e = new CustomEvent('editnode', {detail})
    nodus.dispatchEvent(e)
  }

  addLinkBtn.onclick = () => {
    let e
    if (article.dataset.id) {
      const {id} = article.dataset
      const detail = {id}
      e = new CustomEvent('addlink', {detail})
    } else {
      e = new CustomEvent('addlink')
    }
    nodus.dispatchEvent(e)
  }

  deleteBtn.onclick = () => {
    if (!article.dataset.id) return
    
    const {id} = article.dataset
    const detail = {id}
    const e = new CustomEvent('deletenode', {detail})
    nodus.dispatchEvent(e)
  }

  neighborList.onclick = e => {
    if (!e.target.matches('li:has(:checked) :not(input)')) return

    const li = e.target.closest('li')
    const id = Number(li.dataset.id)
    const detail = {id}
    
    {
      const e = new CustomEvent('shownode', {detail})
      nodus.dispatchEvent(e)
    }
  }

  article.replaceWith(document.createElement('article'))
}