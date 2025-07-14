export const graphus = new EventTarget;

const STORAGE_KEY = 'graph_app_data';

Object.assign(graphus, {
  init(data) {
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

    // Check for required top-level properties
    const topLevelKeys = ['version', 'nextId', 'nodes', 'links'];
    if (Object.keys(data).length !== topLevelKeys.length || !topLevelKeys.every(k => k in data)) {
      return false;
    }

    // Basic type checks
    if (typeof data.version !== 'number' || data.version < 1) return false;
    if (typeof data.nextId !== 'number' || data.nextId < 1) return false;
    if (typeof data.nodes !== 'object' || data.nodes === null) return false;
    if (typeof data.links !== 'object' || data.links === null) return false;

    // Check nodes structure
    for (const [id, nodeData] of Object.entries(data.nodes)) {
      if (isNaN(parseInt(id, 10))) return false; // ID must be a number string
      if (typeof nodeData !== 'object' || Object.keys(nodeData).length !== 1) return false;
      const [name, description] = Object.entries(nodeData)[0];
      if (typeof name !== 'string' || name.trim() === '') return false;
      if (typeof description !== 'string') return false;
    }

    // Check links structure
    const nodeIds = Object.keys(data.nodes);
    for (const [linkId, description] of Object.entries(data.links)) {
      const parts = linkId.split('_');
      if (parts.length !== 2) return false;
      const [fromId, toId] = parts;
      if (!nodeIds.includes(fromId) || !nodeIds.includes(toId)) return false; // Link must connect existing nodes
      if (fromId === toId) return false; // No self-links
      if (typeof description !== 'string') return false;
    }

    return true;
  },

  getNodeNames() {
    const data = _getGraphData();
    if (!data?.nodes) return [];
    return Object.values(data.nodes).map(node => Object.keys(node)[0]);
  },

  getIdByName(name) {
    const data = _getGraphData();
    if (!data?.nodes) return null;

    const entry = Object.entries(data.nodes).find(([, nodeData]) =>
      Object.keys(nodeData)[0] === name
    );

    return entry ? +entry[0] : null;
  },

  getNodeById(id) {
    const data = _getGraphData();
    if (!data?.nodes?.[id]) return null;

    const [[name, description]] = Object.entries(data.nodes[id]);
    const links = Object.keys(data.links);

    const linksToNodes = new Map();

    for (const linkId of links) {
      const [fromId, toId] = linkId.split('_').map(Number);

      if (fromId === id) { // Outgoing
        const [nodeName] = Object.keys(data.nodes[toId]);
        const current = linksToNodes.get(toId) || { id: toId, name: nodeName };
        current.direction = current.direction === 'incoming' ? 'two-way' : 'outgoing';
        linksToNodes.set(toId, current);
      }

      if (toId === id) { // Incoming
        const [nodeName] = Object.keys(data.nodes[fromId]);
        const current = linksToNodes.get(fromId) || { id: fromId, name: nodeName };
        current.direction = current.direction === 'outgoing' ? 'two-way' : 'incoming';
        linksToNodes.set(fromId, current);
      }
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

      // Case 1: Single ID provided, get all connected links
      if (!id2) {
        if (fromId === id1) { // Outgoing from id1
          results.push({
            direction: 'outgoing',
            description,
            node: getPeerNodeInfo(toId)
          });
        }
        if (toId === id1) { // Incoming to id1
          results.push({
            direction: 'incoming',
            description,
            node: getPeerNodeInfo(fromId)
          });
        }
      }
      // Case 2: Two IDs provided, get links between them
      else {
        if (fromId === id1 && toId === id2) { // Outgoing from id1 to id2
          results.push({
            direction: 'outgoing',
            description,
            node: getPeerNodeInfo(toId) // The node is the peer
          });
        }
        if (fromId === id2 && toId === id1) { // Incoming to id1 from id2
          results.push({
            direction: 'incoming',
            description,
            node: getPeerNodeInfo(fromId) // The node is the peer
          });
        }
      }
    }
    return results;
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
    // Filtering logic will be implemented later
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
    // Filtering logic will be implemented later
    return allLinks;
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
