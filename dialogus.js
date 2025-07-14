export const dialogus = new EventTarget;

const elements = {};

Object.assign(dialogus, {
  init() {
    elements.newNodeDialog = document.getElementById('new-node-dialog');
    elements.newNodeForm = elements.newNodeDialog.querySelector('form');
  },

  open(name, data) {
    console.log('Dialogus: Opening dialog:', name, data); // Keep for debugging
    switch (name) {
      case 'add node':
        _openNewNodeDialog(data);
        break;
      // Other cases will be added here
    }
  },

  close(name) {
    switch (name) {
      case 'add node':
        elements.newNodeDialog.close();
        break;
    }
  }
});

function _openNewNodeDialog(data) {
  elements.newNodeForm.reset();
  
  if (data?.name) {
    elements.newNodeForm.elements.name.value = data.name;
  }
  
  const handleFormSubmit = (event) => {
    // Prevent default form submission which reloads the page
    event.preventDefault();
    const submitter = event.submitter;
    
    if (submitter?.value === 'add') {
      const detail = {
        name: elements.newNodeForm.elements.name.value.trim(),
        description: elements.newNodeForm.elements.description.value.trim(),
      };
      dialogus.dispatchEvent(new CustomEvent('addnodetrigger', { detail }));
    } else {
      // Any other submission (like 'cancel' or hitting Esc) just closes
      dialogus.close('add node');
    }
  };

  // The 'close' event on a dialog fires when Esc is pressed.
  // The 'submit' event fires when a submit button is clicked.
  // We use { once: true } to auto-cleanup the listener after it runs.
  elements.newNodeDialog.addEventListener('submit', handleFormSubmit, { once: true });
  elements.newNodeDialog.showModal();
}
