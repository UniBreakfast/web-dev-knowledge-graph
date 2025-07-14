import {graphus} from './graphus.js';
import {headus} from './headus.js';
import {nodus} from './nodus.js';
import {linkus} from './linkus.js';
import {dialogus} from './dialogus.js';

const version = '1.0.0'; // Example version for splash screen later

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
function listenForNodusEvents() { /* To be implemented */ }
function listenForLinkusEvents() { /* To be implemented */ }
function listenForDialogusEvents() { /* To be implemented */ }

function addCustomListeners() {
  listenForGraphusEvents();
  listenForHeadusEvents();
  listenForNodusEvents();
  listenForLinkusEvents();
  listenForDialogusEvents();
}

// --- App Entry Point ---
addCustomListeners();
init();
