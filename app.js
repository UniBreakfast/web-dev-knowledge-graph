import {graphus} from './graphus.js';
import {headus} from './headus.js';
import {nodus} from './nodus.js';
import {linkus} from './linkus.js';
import {dialogus} from './dialogus.js';

const version = '1.0.0'; // Example version for splash screen later

// --- App Entry Point ---
addCustomListeners();
init();

function isFirstRun() {
  return localStorage.getItem('graph_app_data') === null;
}

function showBody() {
  document.body.hidden = false;
}

async function init() {
  const firstRun = isFirstRun();
  let data;

  if (firstRun) {
    const response = await fetch('example-graph.json');
    data = await response.json();
  } else {
    try {
      const storedData = JSON.parse(localStorage.getItem('graph_app_data'));
      if (graphus.isValidGraph(storedData)) {
        data = storedData;
      } else {
        throw new Error("Invalid data in localStorage.");
      }
    } catch (e) {
      console.error(e.message, "Falling back to example graph.");
      const response = await fetch('example-graph.json');
      data = await response.json();
    }
  }

  // Init all modules in order as per requirements
  headus.init();
  nodus.init();
  linkus.init();
  dialogus.init();
  graphus.init(data); // This triggers the 'graphloaded' event

  if (firstRun) {
    // dialogus.open('splash', { version, canClose: true });
  }
}

function addCustomListeners() {
  listenForGraphusEvents();
  listenForHeadusEvents();
  listenForNodusEvents();
  listenForLinkusEvents();
  listenForDialogusEvents();
}

function listenForGraphusEvents() {
  graphus.addEventListener('graphloaded', (event) => {
    const { nodes, links, names } = event.detail;
    // Call modules to render the initial "show many" view
    headus.listNodes(names);
    nodus.showMany(nodes);
    linkus.showMany(links);
    showBody();
  });
  // 'graphupdated' listener to be implemented later
}

function listenForHeadusEvents() { /* To be implemented */ }

function listenForNodusEvents() {
  nodus.addEventListener('gotonodetrigger', event => {
    const {id} = event.detail;
    changeCurrentNodeBy({id});
  });

  nodus.addEventListener('nodeselectedtrigger', event => {
    const {current, selected} = event.detail;
    const links = graphus.getLinksById(current, selected);

    // Note: 'current' here is the node ID, which linkus needs
    linkus.showTwin(links, current); 
  });
  /* To be implemented */
}

function listenForLinkusEvents() { /* To be implemented */ }
function listenForDialogusEvents() { /* To be implemented */ }

function changeCurrentNodeBy({id, name, select}, silent) {
  // If the second argument is a boolean, it's 'silent'
  if (typeof select === 'boolean') {
    silent = select;
    select = undefined;
  }

  const nodeId = id ?? graphus.getIdByName(name);
  if (!nodeId) {
    if (!silent) {
      dialogus.open('inform', {message: 'Node not found', canClose: true});
    }
    return;
  }
  
  const node = graphus.getNodeById(nodeId);
  if (!node) {
    if (!silent) {
      dialogus.open('inform', {message: 'Node not found', canClose: true});
    }
    return;
  }

  let links;
  let selectId;

  if (select) {
    selectId = select.id ?? graphus.getIdByName(select.name);
    links = graphus.getLinksById(nodeId, selectId);
  } else {
    links = graphus.getLinksById(nodeId);
  }
  
  nodus.showOne(node, selectId);
  linkus.showTwin(links, nodeId);
}
