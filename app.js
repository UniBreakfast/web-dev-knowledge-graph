import { graphus } from './js/graphus.js';
import { headus } from './js/headus.js';
import { nodus } from './js/nodus.js';
import { linkus } from './js/linkus.js';
import { dialogus } from './js/dialogus.js';

const EXAMPLE_PATH = 'example-graph.json';
const STORAGE_KEY = 'graph_app_data';
const VERSION = '0.0.1';

addCustomListeners();
initApp();

function isFirstRun() {
  return localStorage.getItem('graph_app_data') === null;
}

function showBody() {
  document.body.hidden = false;
}

async function initApp() {
  const firstRun = isFirstRun();
  let data;

  if (firstRun) {
    data = await getExampleData();

  } else {
    try {
      const storedData = getLSData();

      if (graphus.isValidGraph(storedData)) data = storedData;
      else throw new Error("Invalid data in localStorage.");

    } catch (e) {
      console.error(e.message, "Falling back to example graph.");

      data = await getExampleData();
    }
  }

  headus.init();
  nodus.init();
  linkus.init();
  dialogus.init();
  graphus.init(data);

  if (firstRun) {
    dialogus.open('splash', { version: VERSION, canClose: true });
  }
}

function getLSData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

async function getExampleData() {
  const response = await fetch(EXAMPLE_PATH);
  const data = await response.json();
  return data;
}

function addCustomListeners() {
  listenForGraphusEvents();
  listenForHeadusEvents();
  listenForNodusEvents();
  listenForLinkusEvents();
  listenForDialogusEvents();
}

function listenForGraphusEvents() {
  graphus.addEventListener('graphloaded', handleLoad);

  graphus.addEventListener('graphupdated', handleUpdate);

  function handleLoad(event) {
    const { nodes, links, names } = event.detail;

    headus.listNodes(names);
    nodus.showMany(nodes);
    linkus.showMany(links);

    showBody();
  }

  function handleUpdate(event) {
    const { change } = event.detail;

    if (change.type === 'node' && change.action === 'add') {
      headus.enlistNode(change.name);
      const newNode = graphus.getNodeById(change.id);
      nodus.showOne(newNode);
      linkus.showTwin([], change.id); // Show empty links for the new node
    }

    if (change.type === 'link' && change.action === 'add') {
      const currentId = nodus.getCurrentId();
      if (currentId === change.id.from) {
        changeCurrentNodeBy({ id: change.id.from, select: { id: change.id.to } });
      } else if (currentId === change.id.to) {
        // This case is less common but good to handle
        changeCurrentNodeBy({ id: change.id.to, select: { id: change.id.from } });
      }
    }

    if (change.type === 'node' && change.action === 'delete') {
      // If the currently viewed node was the one deleted, go back to "show many"
      if (nodus.getCurrentId() === change.id) {
        showMany();
      }
      // We will add more cleanup logic here later (e.g., nodus.removeNode)
    }

    if (change.type === 'link' && change.action === 'delete') {
      const currentId = nodus.getCurrentId();
      if (currentId === change.id.from || currentId === change.id.to) {
        // Refresh the view to remove the link from the UI
        changeCurrentNodeBy({ id: currentId });
      }
    }
  }
}

function listenForHeadusEvents() {
  headus.addEventListener('addnodetrigger', event => {
    const { name = '' } = event.detail;
    const data = { canClose: true };

    if (name && !graphus.isNameTaken(name)) data.name = name;

    dialogus.open('add node', data);
  });

  headus.addEventListener('menutrigger', () => {
    const stats = graphus.getStats();
    const counts = {
      descriptionless: stats.descriptionless,
      linksPerNode: stats.linksPerNode.count,
      present: {
        nodes: !!stats.nodes,
        links: !!stats.links,
      },
    }
    dialogus.open('menu', { counts, canClose: true });
  });
}

function listenForNodusEvents() {
  nodus.addEventListener('gotonodetrigger', event => {
    const { id } = event.detail;
    changeCurrentNodeBy({ id });
  });

  nodus.addEventListener('nodeselectedtrigger', event => {
    const { current, selected } = event.detail;
    const links = graphus.getLinksById(current, selected);
    linkus.showTwin(links, current);
  });

  nodus.addEventListener('addlinktrigger', event => {
    const fromName = graphus.getNameById(event.detail.id);
    dialogus.open('add link', { from: fromName, canClose: true });
  });

  nodus.addEventListener('deletenodetrigger', event => {
    const node = graphus.getNodeById(event.detail.id);
    if (node) {
      // The node object from graphus has the name and linkCount we need
      dialogus.open('delete node', { node, canClose: true });
    }
  });
  /* To be implemented */
}

function listenForLinkusEvents() {
  linkus.addEventListener('deletelinktrigger', event => {
    const { id } = event.detail; // id: { from, to }
    // Per requirements, get the full link object to pass to the dialog
    const links = graphus.getLinks(l => l.from.id === id.from && l.to.id === id.to);
    if (links.length) {
      dialogus.open('delete link', { link: links[0], canClose: true });
    }
  });
}

function listenForDialogusEvents() {
  dialogus.addEventListener('addnodetrigger', handleAddNode);

  dialogus.addEventListener('addlinktrigger', event => {
    const { link } = event.detail;

    if (!link.from || !link.to) {
      dialogus.open('inform', { title: 'Node names required', text: 'Links must connect two nodes. Both "from" and "to" fields are required.', canClose: true });
      return;
    }

    if (link.from === link.to) {
      dialogus.open('inform', { title: 'Two distinct nodes required', text: 'A node cannot link to itself.', canClose: true });
      return;
    }

    const fromId = graphus.getIdByName(link.from);
    const toId = graphus.getIdByName(link.to);

    if (!fromId || !toId) {
      const missing = !fromId ? `"${link.from}"` : `"${link.to}"`;
      dialogus.open('inform', { title: 'Node not found', text: `Could not find a node named ${missing}. Links can only be created between existing nodes.`, canClose: true });
      return;
    }

    if (graphus.doesLinkExist(fromId, toId)) {
      dialogus.open('inform', { title: 'Link exists', text: 'A link from "' + link.from + '" to "' + link.to + '" already exists.', canClose: true });
      return;
    }

    dialogus.close('add link');
    graphus.addLink(fromId, toId, link.description);
  });

  dialogus.addEventListener('deletenodetrigger', event => {
    graphus.deleteNode(event.detail.id);
  });

  dialogus.addEventListener('deletelinktrigger', event => {
    const { id } = event.detail;
    graphus.deleteLink(id.from, id.to);
  });

  function handleAddNode(event) {
    const { name, description } = event.detail;

    if (!name) {
      dialogus.open('inform', { title: 'Name required', text: 'Node name cannot be empty or empty-like.', canClose: true });
      return;
    }

    if (graphus.isNameTaken(name)) {
      dialogus.open('inform', { title: 'Name taken', text: 'There\'s already a node named "' + name + '". Try another name.', canClose: true });
      return;
    }

    dialogus.close('add node');
    graphus.addNode(name, description);
  }
}

function changeCurrentNodeBy({ id, name, select }, silent) {
  if (typeof select === 'boolean') {
    silent = select;
    select = undefined;
  }

  const nodeId = id ?? graphus.getIdByName(name);
  if (!nodeId) {
    if (!silent) {
      dialogus.open('inform', { message: 'Node not found', canClose: true });
    }
    return;
  }

  const node = graphus.getNodeById(nodeId);
  if (!node) {
    if (!silent) {
      dialogus.open('inform', { message: 'Node not found', canClose: true });
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

function showMany() {
  const nodes = graphus.getNodes();
  const links = graphus.getLinks();
  nodus.showMany(nodes);
  linkus.showMany(links);
  showBody();
}
