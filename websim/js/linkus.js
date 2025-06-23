export const linkus = new EventTarget

const aside = document.querySelector('aside')
const section = aside.parentElement
const linkList = aside.querySelector('ul')

Object.assign(linkus, {
  present(links, currentNodeId) {
    currentNodeId = Number(currentNodeId)
    linkList.innerHTML = ''
    
    for (const link of links) {
      const li = document.createElement('li')
      const isOutgoing = link.from === currentNodeId
      const displayName = isOutgoing ? link.toName : link.fromName
      
      li.className = isOutgoing ? 'outgoing' : 'incoming'
      li.dataset.from = link.from
      li.dataset.to = link.to
      
      li.innerHTML = `
        <div class="slot">
          <button class="edit">🖉 Link</button>
        </div>
          
        <h3><span>${displayName}</span></h3>
          
        <div class="slot">
          <button class="delete">— Link</button>
        </div>
          
        <p>${link.description}</p>
      `
      
      linkList.appendChild(li)
    }
    
    if (links.length) {
      section.replaceChildren(aside)
    }
  },

  clear() {
    linkList.innerHTML = ''
  },
})

init()

function init() {
  linkList.onclick = e => {
    const btn = e.target.closest('.edit, .delete')
    if (!btn) return

    const li = btn.closest('li')
    const {from, to} = li.dataset
    const detail = {from: Number(from), to: Number(to)}
    
    if (btn.matches('.edit')) {
      e = new CustomEvent('editlink', {detail})
    } else if (btn.matches('.delete')) {
      e = new CustomEvent('deletelink', {detail})
    }
    
    linkus.dispatchEvent(e)
  }

  aside.replaceWith(document.createElement('aside'))
}


