export const dialogus = new EventTarget()

Object.assign(dialogus, {
  open(name, data = {}) {
    const dialog = dialogsMap.get(name)

    if (!dialog) throw new Error('unknown dialog name')

    const form = dialog.querySelector('form')
    if (form) form.reset()

    if (name === 'new node' && typeof data === 'string') {
      form.elements.name.value = data
    } else if (name === 'edit node' && data.node) {
      form.id.value = data.node.id
      form.name.value = data.node.name
      form.description.value = data.node.description
    } else if (name === 'new link' && data.node) {
      form.from.value = data.node.id
      form.fname.value = data.node.name
    } else if (name === 'delete node' && data.node) {
      form.id.value = data.node.id
      form.name.value = data.node.name
    } else if (name === 'edit link' && data.fNode && data.tNode && data.link) {
      form.from.value = data.fNode.id
      form.fname.value = data.fNode.name
      form.to.value = data.tNode.id 
      form.tname.value = data.tNode.name
      form.description.value = data.link.description
    } else if (name === 'delete link' && data.fNode && data.tNode) {
      form.from.value = data.fNode.id
      form.fname.value = data.fNode.name
      form.to.value = data.tNode.id
      form.tname.value = data.tNode.name
    }

    dialog.showModal()
  },

  close(name) {
    const dialog = dialogsMap.get(name)

    if (!dialog) throw new Error('unknown dialog name')

    dialog.close()
  },

  inform(heading, message) {
    return new Promise(resolve => {
      const dialog = dialogsMap.get('inform')
      dialog.querySelector('h3').textContent = heading
      dialog.querySelector('p').textContent = message
      dialog.onclose = resolve
      dialog.showModal()
    })
  },
})

const newNodeDialog = document.getElementById('new-node')
const editNodeDialog = document.getElementById('edit-node')
const newLinkDialog = document.getElementById('new-link')
const editLinkDialog = document.getElementById('edit-link')
const deleteNodeDialog = document.getElementById('delete-node')
const deleteLinkDialog = document.getElementById('delete-link')
const informDialog = document.getElementById('inform')

const dialogsMap = new Map([
  ['new node', newNodeDialog], [newNodeDialog, 'new node'],
  ['edit node', editNodeDialog], [editNodeDialog, 'edit node'],
  ['new link', newLinkDialog], [newLinkDialog, 'new link'],
  ['edit link', editLinkDialog], [editLinkDialog, 'edit link'],
  ['delete node', deleteNodeDialog], [deleteNodeDialog, 'delete node'],
  ['delete link', deleteLinkDialog], [deleteLinkDialog, 'delete link'],
  ['inform', informDialog], [informDialog, 'inform'],
])

document.body.onclick = ({target}) => {
  if (target.matches('.cancel')) {
    const dialog = target.closest('dialog')
    const dialogName = dialogsMap.get(dialog)
    const detail = {dialogName}
    const e = new CustomEvent('cancel', { detail })
    dialogus.dispatchEvent(e)
  }
}

document.body.onsubmit = e => {
  if (!e.target.closest('dialog')) return

  e.preventDefault()
  
  const dialog = e.target.closest('dialog')
  const dialogName = dialogsMap.get(dialog)
  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData.entries())
  const detail = { dialogName, data }

  const event = new CustomEvent('submit', { detail })
  dialogus.dispatchEvent(event)
  return false
}