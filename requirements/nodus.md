## Nodus module requirements

### This document holds requirements for the `nodus.js` file

It should export a `nodus` object that is an instance of `EventTarget` with the following methods:

- [`init()`](#init)
- [`showOne(...)`](#showone)
- [`showMany(...)`](#showmany)

Also `nodus` object is expected to dispatch the following custom events:

- [`gotonodetrigger`](#gotonodetrigger)
- [`deletenodetrigger`](#deletenodetrigger)
- [`addlinktrigger`](#addlinktrigger)

[Back to top](#nodus-module-requirements)

## Methods

### `init()`

[Back to top](#nodus-module-requirements)

### `showOne(node)`

This function (method) is to be used for side effects only. It should show the given `node` with the list of linked nodes below.

[Back to top](#nodus-module-requirements)

### `showMany(nodes)`

This function (method) is to be used for side effects only. It should show the node list presenting the given `nodes` array in `all` mode.

[Back to top](#nodus-module-requirements)

## Custom events

### `gotonodetrigger`

This event should be dispatched when the user clicks on a "Go to Node" button next to a specific node in `all` mode. It should carry such node detail as `id`.
