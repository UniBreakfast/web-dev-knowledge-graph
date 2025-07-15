export const dialogus = new EventTarget;

const elements = {};

Object.assign(dialogus, {
  init() {
    elements.newNodeDialog = document.getElementById('new-node-dialog');
    elements.newNodeForm = elements.newNodeDialog.querySelector('form');
    elements.informDialog = document.getElementById('inform-dialog');
    elements.informTitle = elements.informDialog.querySelector('[data-title]');
    elements.informText = elements.informDialog.querySelector('[data-text]');
    elements.newLinkDialog = document.getElementById('new-link-dialog');
    elements.newLinkForm = elements.newLinkDialog.querySelector('form');
    elements.newLinkDialog.querySelector('.swap-button').addEventListener('click', () => {
      const {from, to} = elements.newLinkForm.elements;
      [from.value, to.value] = [to.value, from.value];
    });
  },

  open(name, data) {
    console.log('Dialogus: Opening dialog:', name, data); // Keep for debugging
    switch (name) {
      case 'add node':
        _openNewNodeDialog(data);
        break;
      case 'inform':
        _openInformDialog(data);
        break;
      case 'add link':
        _openNewLinkDialog(data);
        break;
      // Other cases will be added here
    }
  },

  close(name) {
    switch (name) {
      case 'add node':
        elements.newNodeDialog.close();
        break;
      case 'inform':
        elements.informDialog.close();
        break;
      case 'add link':
        elements.newLinkDialog.close();
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

function _openInformDialog(data) {
  elements.informTitle.textContent = data.title || 'Information';
  elements.informText.textContent = data.text || 'An unspecified event occurred.';
  elements.informDialog.showModal();
}

function _openNewLinkDialog(data) {
  elements.newLinkForm.reset();
  
  if (data?.from) {
    elements.newLinkForm.elements.from.value = data.from;
  }
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const submitter = event.submitter;
    
    if (submitter?.value === 'add') {
      const detail = {
        link: {
          from: elements.newLinkForm.elements.from.value.trim(),
          to: elements.newLinkForm.elements.to.value.trim(),
          description: elements.newLinkForm.elements.description.value.trim(),
        }
      };
      dialogus.dispatchEvent(new CustomEvent('addlinktrigger', { detail }));
    } else {
      dialogus.close('add link');
    }
  };

  elements.newLinkDialog.addEventListener('submit', handleFormSubmit, { once: true });
  elements.newLinkDialog.showModal();
}
