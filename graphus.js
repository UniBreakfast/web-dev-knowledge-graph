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
    const event = new CustomEvent('graphloaded', {detail});
    this.dispatchEvent(event);
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
      const linkCount = {incoming, outgoing};
      
      id = +id;
      return {id, name, description, linkCount};
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

      const from = {id: fromId, name: fromName};
      const to = {id: toId, name: toName};
      return {from, to, description};
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
