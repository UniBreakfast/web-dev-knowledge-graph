let nodes = {
  1: { "Alpha": "First letter" },
  2: { "Beta": "Second letter" }
}

let links = {
  "1_2": "From Alpha to Beta",
  "2_1": "From Beta to Alpha"
}

let nextNodeId = 3

export const graphus = new EventTarget

Object.assign(graphus, {
  load(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid graph data format')
    }
    
    if (
      !data.nodes || !data.links || typeof data.nodes !== 'object' 
        || typeof data.links !== 'object'
    ) {
      throw new Error('Graph data must contain nodes and links objects')
    }

    for (const [id, nodeData] of Object.entries(data.nodes)) {
      if (typeof nodeData !== 'object' || Object.keys(nodeData).length !== 1) {
        throw new Error('Each node must have exactly one name-description pair')
      }
    }

    for (const [key, description] of Object.entries(data.links)) {
      const [fromId, toId] = key.split('_')
      if (!fromId || !toId || !data.nodes[fromId] || !data.nodes[toId]) {
        throw new Error('Links must reference existing nodes')
      }
    }

    const highestId = Math.max(...Object.keys(data.nodes).map(Number))
    nextNodeId = highestId + 1

    nodes = data.nodes
    links = data.links

    const detail = { 
      nodes: Object.fromEntries(
        Object.entries(nodes).map(([id, node]) => [Number(id), node])
      ),
      links 
    }
    this.dispatchEvent(new CustomEvent('change', { detail }))
  },

  getNodeNames() {
    return Object.values(nodes).flatMap(descriptor => Object.keys(descriptor))
  },
  
  getNodeById(id) {
    const nodeId = Number(id)
    const nodeDescriptor = nodes[nodeId]
    if (!nodeDescriptor) return null
    
    const [[name, description]] = Object.entries(nodeDescriptor)
    let neighbors = this.getLinksById(nodeId).map(link => {
      const direction = link.to === nodeId ? 'incoming' : 'outgoing'
      const nid = direction === 'incoming' ? link.from : link.to
      const name = direction === 'incoming' ? link.fromName : link.toName
      return {id: nid, name, direction}
    })
    neighbors = Object.values(
      Object.groupBy(neighbors, neighbor => neighbor.id)
    ).map(arr => {
      if (arr.length < 2) return arr[0]
      else return {...arr[0], direction: 'two-way'}
    })
    const node = {id: nodeId, name, description, neighbors}
    return node
  },
  
  getNodeByName(name) {
    const id = Object.entries(nodes).find(
      ([id, descriptor]) => Object.keys(descriptor)[0] === name
    )?.[0]
    return id ? this.getNodeById(Number(id)) : null
  },

  getRandomNode() {
    const ids = Object.keys(nodes)
    if (ids.length === 0) return null
    const i = Math.floor(Math.random() * ids.length)
    const id = ids[i]
    return this.getNodeById(Number(id))
  },
  
  getLinksById(nodeId) {
    nodeId = Number(nodeId)
    const keys = Object.keys(links).filter(
      key => key.split('_').map(Number).includes(nodeId)
    )
    return keys.map(key => {
      const [from, to] = key.split('_').map(Number)
      return this.getLinkFromTo(from, to)
    })
  },

  getLinkFromTo(fromId, toId) {
    const from = Number(fromId)
    const to = Number(toId)
    const key = `${from}_${to}`
    if (!(key in links)) return null
    
    const description = links[key]
    const [fromName] = Object.keys(nodes[from])
    const [toName] = Object.keys(nodes[to])
    const link = {from, to, description, fromName, toName}
    return link
  },

  addNode(name, description) {
    const id = nextNodeId++
    nodes[id] = {[name]: description}
    const node = {id, name, description}
    const detail = {nodes, links}
    this.dispatchEvent(new CustomEvent('change', {detail}))
  },

  updateNode(id, data) {
    id = Number(id)
    const node = this.getNodeById(id)
    const name = 'name' in data ? data.name || node.name : node.name
    const description = 'description' in data ? data.description : node.description
    nodes[id] = {[name]: description}
    const detail = { 
      nodes: Object.fromEntries(
        Object.entries(nodes).map(([id, node]) => [Number(id), node])
      ),
      links 
    }
    this.dispatchEvent(new CustomEvent('change', { detail }))
  },

  deleteNode(id) {
    id = Number(id)
    delete nodes[id]
    links = Object.fromEntries(
      Object.entries(links).filter(([key]) => {
        const [from, to] = key.split('_').map(Number)
        return from !== id && to !== id
      })
    )
    const detail = { 
      nodes: Object.fromEntries(
        Object.entries(nodes).map(([id, node]) => [Number(id), node])
      ),
      links 
    }
    this.dispatchEvent(new CustomEvent('change', { detail }))
  },

  addLink(fromId, toId, description) {
    fromId = Number(fromId)
    toId = Number(toId)
    const key = `${fromId}_${toId}`
    if (key in links) throw new Error("There's already a link like that")

    links[key] = description
    const detail = {nodes, links}
    this.dispatchEvent(new CustomEvent('change', {detail}))
  },

  updateLink(fromId, toId, description) {
    fromId = Number(fromId)
    toId = Number(toId)
    const key = `${fromId}_${toId}`
    if (!(key in links)) throw new Error("There's no link like that")

    links[key] = description
    const detail = { 
      nodes: Object.fromEntries(
        Object.entries(nodes).map(([id, node]) => [Number(id), node])
      ),
      links 
    }
    this.dispatchEvent(new CustomEvent('change', { detail }))
  },

  deleteLink(fromId, toId) {
    fromId = Number(fromId)
    toId = Number(toId)
    const key = `${fromId}_${toId}`
    delete links[key]
    const detail = { 
      nodes: Object.fromEntries(
        Object.entries(nodes).map(([id, node]) => [Number(id), node])
      ),
      links 
    }
    this.dispatchEvent(new CustomEvent('change', { detail }))
  },
})