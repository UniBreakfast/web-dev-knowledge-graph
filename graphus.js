export const graphus = new EventTarget;

const STORAGE_KEY = 'graph_app_data';

Object.assign(graphus, {
  init(data) {
    if (!this.isValidGraph(data)) {
      console.error("Invalid graph data provided to init. Halting.");
      // In a real-world scenario, you might want to load a default
      // or clear localStorage, but for now, we'll just stop.
      return;
    }
    _setGraphData(data);

    const detail = {
      names: this.getNodeNames(),
      nodes: this.getNodes(),
      links: this.getLinks(),
    };
    const event = new CustomEvent('graphloaded', { detail });
    this.dispatchEvent(event);
  },

  isValidGraph(data) {
    if (!data || typeof data !== 'object') return false;

    const topLevelKeys = ['version', 'nextId', 'nodes', 'links'];
    if (Object.keys(data).length !== topLevelKeys.length || !topLevelKeys.every(k => k in data)) {
      return false;
    }

    if (typeof data.version !== 'number' || data.version < 1) return false;
    if (typeof data.nextId !== 'number' || data.nextId < 1) return false;
    if (typeof data.nodes !== 'object' || data.nodes === null) return false;
    if (typeof data.links !== 'object' || data.links === null) return false;

    for (const [id, nodeData] of Object.entries(data.nodes)) {
      if (isNaN(parseInt(id, 10))) return false;
      if (typeof nodeData !== 'object' || Object.keys(nodeData).length !== 1) return false;
      const [name, description] = Object.entries(nodeData)[0];
      if (typeof name !== 'string' || name.trim() === '') return false;
      if (typeof description !== 'string') return false;
    }

    const nodeIds = Object.keys(data.nodes);
    for (const [linkId, description] of Object.entries(data.links)) {
      const parts = linkId.split('_');
      if (parts.length !== 2) return false;
      const [fromId, toId] = parts;
      if (!nodeIds.includes(fromId) || !nodeIds.includes(toId)) return false;
      if (fromId === toId) return false;
      if (typeof description !== 'string') return false;
    }

    return true;
  },

  isNameTaken(name) {
    const data = _getGraphData();
    if (!data?.nodes) return false;
    const trimmedName = name.trim();
    return Object.values(data.nodes).some(nodeData => Object.keys(nodeData)[0] === trimmedName);
  },

  doesLinkExist(fromId, toId) {
    const data = _getGraphData();
    if (!data?.links) return false;
    return `${fromId}_${toId}` in data.links;
  },

  getIdByName(name) {
    const data = _getGraphData();
    if (!data?.nodes) return null;

    const entry = Object.entries(data.nodes).find(([, nodeData]) =>
      Object.keys(nodeData)[0] === name
    );

    return entry ? +entry[0] : null;
  },

  getNameById(id) {
    const data = _getGraphData();
    const node = data?.nodes?.[id];
    return node ? Object.keys(node)[0] : null;
  },

  getNodeById(id) {
    const data = _getGraphData();
    if (!data?.nodes?.[id]) return null;

    const [[name, description]] = Object.entries(data.nodes[id]);
    const links = Object.keys(data.links);
    const linksToNodes = new Map();

    for (const linkId of links) {
      const [fromId, toId] = linkId.split('_').map(Number);
      if (fromId !== id && toId !== id) continue;

      const peerId = fromId === id ? toId : fromId;
      const [peerName] = Object.keys(data.nodes[peerId]);
      const current = linksToNodes.get(peerId) || { id: peerId, name: peerName };

      if (fromId === id) { // Outgoing
        current.direction = current.direction === 'incoming' ? 'two-way' : 'outgoing';
      }
      if (toId === id) { // Incoming
        current.direction = current.direction === 'outgoing' ? 'two-way' : 'incoming';
      }
      linksToNodes.set(peerId, current);
    }

    return {
      id,
      name,
      description,
      linksToNodes: [...linksToNodes.values()],
      linkCount: linksToNodes.size
    };
  },

  getLinksById(id1, id2) {
    const data = _getGraphData();
    if (!data?.links) return [];

    const linkEntries = Object.entries(data.links);
    const results = [];

    const getPeerNodeInfo = (peerId) => {
      const [[name, description]] = Object.entries(data.nodes[peerId]);
      return { id: peerId, name, description };
    };

    for (const [linkId, description] of linkEntries) {
      const [fromId, toId] = linkId.split('_').map(Number);

      if (id2) { // Get links between id1 and id2
        if (fromId === id1 && toId === id2) {
          results.push({ direction: 'outgoing', description, node: getPeerNodeInfo(toId) });
        }
        if (fromId === id2 && toId === id1) {
          results.push({ direction: 'incoming', description, node: getPeerNodeInfo(fromId) });
        }
      } else { // Get all links for id1
        if (fromId === id1) {
          results.push({ direction: 'outgoing', description, node: getPeerNodeInfo(toId) });
        }
        if (toId === id1) {
          results.push({ direction: 'incoming', description, node: getPeerNodeInfo(fromId) });
        }
      }
    }
    return results;
  },

  getNodeNames() {
    const data = _getGraphData();
    if (!data?.nodes) return [];
    return Object.values(data.nodes).map(node => Object.keys(node)[0]);
  },

  getNodes(filter) {
    const data = _getGraphData();
    if (!data?.nodes) return [];

    const allNodes = Object.entries(data.nodes).map(([id, nodeData]) => {
      const [[name, description]] = Object.entries(nodeData);

      const outgoing = Object.keys(data.links).filter(linkId => linkId.startsWith(`${id}_`)).length;
      const incoming = Object.keys(data.links).filter(linkId => linkId.endsWith(`_${id}`)).length;
      const linkCount = { incoming, outgoing };

      id = +id;
      return { id, name, description, linkCount };
    });

    if (!filter) return allNodes;
    // Filtering logic to be implemented later per requirements
    return allNodes;
  },

  getLinks(filter) {
    const data = _getGraphData();
    if (!data?.links) return [];

    const allLinks = Object.entries(data.links).map(([linkId, description]) => {
      const [fromId, toId] = linkId.split('_').map(Number);
      const [fromName] = Object.keys(data.nodes[fromId]);
      const [toName] = Object.keys(data.nodes[toId]);

      const from = { id: fromId, name: fromName };
      const to = { id: toId, name: toName };
      return { from, to, description };
    });

    if (!filter) return allLinks;
    // Filtering logic to be implemented later per requirements
    return allLinks;
  },

  addNode(name, description = '') {
    const data = _getGraphData();
    const trimmedName = name.trim();
    if (!trimmedName || this.isNameTaken(trimmedName)) {
      console.error("Attempted to add node with invalid or duplicate name.");
      return;
    }

    const newId = data.nextId;
    data.nodes[newId] = { [trimmedName]: description.trim() };
    data.nextId++;
    
    const change = {
      type: 'node',
      action: 'add',
      id: newId,
      name: trimmedName,
      description: description.trim(),
    };
    _saveAndDispatch(data, change);
  },

  addLink(fromId, toId, description = '') {
    const data = _getGraphData();
    if (this.doesLinkExist(fromId, toId)) {
      console.error("Attempted to add a link that already exists.");
      return;
    }

    data.links[`${fromId}_${toId}`] = description.trim();

    const change = {
      type: 'link',
      action: 'add',
      id: { from: fromId, to: toId },
      description: description.trim(),
    };
    _saveAndDispatch(data, change);
  },

  deleteNode(id) {
    const data = _getGraphData();
    const nodeToDelete = data.nodes[id];
    if (!nodeToDelete) {
      console.error(`Attempted to delete non-existent node with id: ${id}`);
      return;
    }

    const nodeName = Object.keys(nodeToDelete)[0];

    // Find and filter out links connected to the node
    const linksToDelete = Object.keys(data.links).filter(linkId => {
      const [fromId, toId] = linkId.split('_');
      return +fromId === id || +toId === id;
    });

    // Delete the node
    delete data.nodes[id];

    // Delete the links
    for (const linkId of linksToDelete) {
      delete data.links[linkId];
    }
    
    const change = {
      type: 'node',
      action: 'delete',
      id: id,
      name: nodeName, // For UI feedback
      links: linksToDelete.map(linkId => { // For UI cleanup
        const [from, to] = linkId.split('_').map(Number);
        return { from, to };
      }),
    };
    _saveAndDispatch(data, change);
  },
});

// --- Private Helper Functions (hoisted) ---
function _getGraphData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

function _setGraphData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function _saveAndDispatch(data, change) {
  data.version++;
  _setGraphData(data);
  const event = new CustomEvent('graphupdated', { detail: { change } });
  graphus.dispatchEvent(event);
}
