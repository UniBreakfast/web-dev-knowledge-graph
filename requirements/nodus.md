[Up to App level requirements](app-level)

# Nodus module requirements

### This document holds requirements for the `nodus.js` file

It should export a `nodus` object that is an instance of `EventTarget` with the following methods:

- [`init()`](#init)
- [`showOne(...)`](#showonenode-selectedid)
- [`showMany(...)`](#showmanynodes)
- [`getCurrentId()`](#getcurrentid)
- [`getListedNodes()`](#getlistednodes)
- [`updateOne(...)`](#updateonename-description)
- [`removeNode(id)`](#removenodeid)

Also `nodus` object is expected to dispatch the following custom events:

- [`gotonodetrigger`](#gotonodetrigger)
- [`editnodetrigger`](#editnodetrigger)
- [`deletenodetrigger`](#deletenodetrigger)
- [`addlinktrigger`](#addlinktrigger)
- [`nodeselectedtrigger`](#nodeselectedtrigger)

[Back to top](#nodus-module-requirements)

## Methods

### `init()`

[Back to top](#nodus-module-requirements)

### `showOne(node, ?selectedId)`

This function (method) is to be used for side effects only. It should show the given `node` with the list of linked nodes below. Each linked node label should have the class corresponding to its direction (`outgoing`, `incoming` or `two-way`). If there are no linked nodes, should show the "No links to other nodes yet" paragraph message by toggling the corresponding checkbox before the list of linked nodes.

If `selectedId` is given (positive integer expected), corresponding item in the list of linked nodes should be selected.

See the [`graphus.getNodeById(id)`](./graphus#getnodebyid) method for the expected shape of the `node` object.

[Back to top](#nodus-module-requirements)

### `showMany(nodes)`

This function (method) is to be used for side effects only. It should show the node list presenting the given `nodes` array in `many` mode.

See the [`graphus.getNodes()`](./graphus#getnodes) method for the expected shape of the `nodes` array.

Alternatively, if the `nodes` array is empty, should show the "No nodes in the graph..." paragraph message by toggling the corresponding radio button before the `article`.

[Back to top](#nodus-module-requirements)

### `getCurrentId()`

This function (method) should return the id of the current node.

[Back to top](#nodus-module-requirements)

### `getListedNodes()`

This function (method) should return the list of ids of the currently listed nodes either in `many` mode or in the list of linked nodes of the current node.

[Back to top](#nodus-module-requirements)

### `updateOne(name, description)`

This function (method) should update the current node with the given `name` and `description`.

[Back to top](#nodus-module-requirements)

### `removeNode(id)`

This function (method) should remove the node with the given `id` from the list of currently shown nodes either in `many` mode or in the list of linked nodes of the current node.

## Custom events

### `gotonodetrigger`

This event should be dispatched when the user clicks on a "Go to Node" button next to a specific node in `many` mode or on an already selected node in the list of linked nodes in `current` mode. It should carry such node detail as `id`.

[Back to top](#nodus-module-requirements)

### `editnodetrigger`

This event should be dispatched when the user clicks on a "Edit Node" button next to a specific node. It should carry such node detail as `id`.

[Back to top](#nodus-module-requirements)

### `deletenodetrigger`

This event should be dispatched when the user clicks on a "Delete Node" button next to a specific node. It should carry such node detail as `id`.

[Back to top](#nodus-module-requirements)

### `addlinktrigger`

This event should be dispatched when the user clicks on a "Add Link" button next to a specific node. It should carry such node detail as `id`.

[Back to top](#nodus-module-requirements)

### `nodeselectedtrigger`

This event should be dispatched when the user clicks on a node in the list of linked nodes of the current node. It should carry such node detail as `id`. It should be of the following shape:

```
{
  current: positive integer,
  selected: positive integer
} 
```

[Back to top](#nodus-module-requirements)
