export const graphus = new EventTarget();

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
});

function _getGraphData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

function _setGraphData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
