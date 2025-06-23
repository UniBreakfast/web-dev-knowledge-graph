import {graphus} from './js/graphus.js'
import {headus} from './js/headus.js'
import {nodus} from './js/nodus.js'
import {linkus} from './js/linkus.js'
import {dialogus} from './js/dialogus.js'

const nodeList = document.getElementById('node-list')

window.graphus = graphus
await init()
showBody()

async function init() {
  // Load saved graph data if it exists
  try {
    const savedGraph = localStorage.getItem('graph')
    if (savedGraph) {
      const data = JSON.parse(savedGraph)
      graphus.load(data)
    }
  } catch (error) {
    console.error('Failed to load saved graph:', error)
  }
  
  // events-handlers assembly
  { 
    graphus.addEventListener('change', e => {
      const {nodes, links} = e.detail

      updateNodeList()
      
      try {
        localStorage.setItem('graph', JSON.stringify({nodes, links}))
      } catch (error) {
        console.error('Failed to save graph:', error) 
      }

      const currentId = nodus.getCurrentNodeId()
      if (currentId) {
        const node = graphus.getNodeById(currentId)
        if (node) {
          nodus.present(node)
          const nodeLinks = graphus.getLinksById(currentId)
          linkus.present(nodeLinks, currentId)
        } else {
          nodus.clear()
          linkus.clear()
        }
      }
    })
    
    headus.addEventListener('addnode', e => {
      if (e.detail?.query) {
        const {query} = e.detail
        dialogus.open('new node', query)
      } else {
        dialogus.open('new node')
      }
    })
    
    headus.addEventListener('querynode', e => {
      const {query} = e.detail
      const node = graphus.getNodeByName(query)
      if (!node) return
      
      nodus.present(node)
      const links = graphus.getLinksById(node.id)
      linkus.present(links, node.id)
    })

    nodus.addEventListener('shownode', e => {
      const {id} = e.detail
      const node = graphus.getNodeById(id)
      if (!node) return
      
      nodus.present(node)
      const links = graphus.getLinksById(id)
      linkus.present(links, id)
    })
  
    nodus.addEventListener('addlink', e => {
      if (e.detail?.id) {
        const {id} = e.detail
        const node = graphus.getNodeById(id)
        if (!node) return
        
        dialogus.open('new link', { node })
      } else {
        dialogus.open('new link')
      }    
    })
  
    nodus.addEventListener('editnode', e => {
      const {id} = e.detail
      const node = graphus.getNodeById(id)
      if (!node) return
      
      dialogus.open('edit node', { node })
    })
  
    nodus.addEventListener('deletenode', e => {
      const {id} = e.detail
      const node = graphus.getNodeById(id)
      if (!node) return
      
      dialogus.open('delete node', { node })
    })
  
    linkus.addEventListener('editlink', e => {
      const {from, to} = e.detail
      const fNode = graphus.getNodeById(from)
      const tNode = graphus.getNodeById(to)
      const link = graphus.getLinkFromTo(from, to)
      if (!fNode || !tNode || !link) return
  
      dialogus.open('edit link', {fNode, tNode, link})
    })
  
    linkus.addEventListener('deletelink', e => {
      const {from, to} = e.detail
      const fNode = graphus.getNodeById(from)
      const tNode = graphus.getNodeById(to)
      const link = graphus.getLinkFromTo(from, to)
      if (!fNode || !tNode || !link) return
  
      dialogus.open('delete link', {fNode, tNode, link})
    })
  
    dialogus.addEventListener('cancel', e => {
      const {dialogName} = e.detail
      dialogus.close(dialogName)
    })
  
    dialogus.addEventListener('submit', e => {
      const { dialogName, data } = e.detail

      switch (dialogName) {
        case 'new node':
          graphus.addNode(data.name, data.description)
          break

        case 'edit node':
          graphus.updateNode(Number(data.id), { 
            name: data.name, 
            description: data.description 
          })
          break

        case 'new link': {
          const fromNode = data.from ? 
            graphus.getNodeById(Number(data.from)) :
            graphus.getNodeByName(data.fname)
          const toNode = graphus.getNodeByName(data.tname)
          
          if (fromNode && toNode) {
            graphus.addLink(fromNode.id, toNode.id, data.description)
          }
          break
        }

        case 'edit link':
          graphus.updateLink(
            Number(data.from),
            Number(data.to),
            data.description
          )
          break

        case 'delete node':
          graphus.deleteNode(Number(data.id))
          nodus.clear()
          linkus.clear()
          break

        case 'delete link':
          graphus.deleteLink(Number(data.from), Number(data.to))
          break
      }

      dialogus.close(dialogName)
    })
  }

  // Show random node/link if nodes exist
  const node = graphus.getRandomNode()
  if (node) {
    nodus.present(node)
    const links = graphus.getLinksById(node.id)
    if (links && links.length) {
      linkus.present(links, node.id)
    }
    updateNodeList()
  }
}

function showBody() {
  document.body.removeAttribute('hidden')
}

function updateNodeList() {
  const nodeNames = graphus.getNodeNames()

  nodeList.innerHTML = nodeNames.map(
    n => `<option>${n}</option>`
  ).join('')
}