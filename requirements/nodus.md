[Up to App level requirements](app-level)

# Nodus module requirements

### This document holds requirements for the `nodus.js` file

It should export a `nodus` object that is an instance of `EventTarget` with the following methods:

- [`init()`](#init)
- [`showOne(...)`](#showonenodeselectedid)
- [`showMany(...)`](#showmanynodes)

Also `nodus` object is expected to dispatch the following custom events:

- [`gotonodetrigger`](#gotonodetrigger)
- [`editnodetrigger`](#editnodetrigger)
- [`deletenodetrigger`](#deletenodetrigger)
- [`addlinktrigger`](#addlinktrigger)

[Back to top](#nodus-module-requirements)

## Methods

### `init()`

[Back to top](#nodus-module-requirements)

### `showOne(node, ?selectedId)`

This function (method) is to be used for side effects only. It should show the given `node` with the list of linked nodes below. Each linked node label should have the class corresponding to its direction (`outgoing`, `incoming` or `two-way`).

If `selectedId` is given (positive integer expected), corresponding item in the list of linked nodes should be selected.

See the [`graphus.getNodeById(id)`](./graphus#getnodebyid) method for the expected shape of the `node` object.

[Back to top](#nodus-module-requirements)

### `showMany(nodes)`

This function (method) is to be used for side effects only. It should show the node list presenting the given `nodes` array in `all` mode.

See the [`graphus.getNodes()`](./graphus#getnodes) method for the expected shape of the `nodes` array.

[Back to top](#nodus-module-requirements)

## Custom events

### `gotonodetrigger`

This event should be dispatched when the user clicks on a "Go to Node" button next to a specific node in `all` mode. It should carry such node detail as `id`.

[Back to top](#nodus-module-requirements)

### `editnodetrigger`

[Back to top](#nodus-module-requirements)

### `deletenodetrigger`

This event should be dispatched when the user clicks on a "Delete Node" button next to a specific node. It should carry such node detail as `id`.

[Back to top](#nodus-module-requirements)

### `addlinktrigger`

[Back to top](#nodus-module-requirements)
