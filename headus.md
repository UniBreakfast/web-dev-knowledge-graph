[Up to App level requirements](app-level)

# Headus module requirements

### This document holds requirements for the `headus.js` file

It should export a `headus` object that is an instance of `EventTarget` with the following methods:

- [`init()`](#init)
- [`listNodes(...)`](#listnodesnames)
- [`enlistNode(...)`](#enlistnodename)
- [`unlistNode(...)`](#unlistnodename)
- [`getQuery()`](#getquery)
- [`clearQuery()`](#clearquery)

Also `headus` object is expected to dispatch the following custom events:

- [`addnodetrigger`](#addnodetrigger)
- [`querynode`](#querynode)
- [`menutrigger`](#menutrigger)

[Back to top](#headus-module-requirements)

## Methods

### `init()`

[Back to top](#headus-module-requirements)

### `listNodes(names)`

This function (method) should fill the datalist of nodes with the given `names` as options.

[Back to top](#headus-module-requirements)

### `enlistNode(name)`

This function (method) should add the option with the given `name` to the datalist of nodes.

[Back to top](#headus-module-requirements)

### `unlistNode(name)`

This function (method) should remove the option with the given `name` from the datalist of nodes.

[Back to top](#headus-module-requirements)

### `getQuery()`

This function (method) should return the current value of the query input field.

[Back to top](#headus-module-requirements)

### `clearQuery()`

This function (method) should clear the query input field.

[Back to top](#headus-module-requirements)

## Custom events

### `addnodetrigger`

This event should be dispatched when the "Add Node" button is clicked. It should carry the current value of the query input field as `event.detail.name` if it is not empty after trim.

[Back to top](#headus-module-requirements)

### `querynode`

This event should be dispatched when the query input field is changed. It should carry the query string as `event.detail.query` object.

[Back to top](#headus-module-requirements)

### `menutrigger`

This event should be dispatched when the "Menu" button is clicked.

[Back to top](#headus-module-requirements)

<img width="480" alt="GRAPH logo" src="https://github.com/user-attachments/assets/259d5bbd-d8ad-497c-b417-14940e78e246" />
