[Up to App level requirements](app-level)

# Headus module requirements

### This document holds requirements for the `headus.js` file

It should export a `headus` object that is an instance of `EventTarget` with the following methods:

- [`init()`](#init)
- [`listNodes(...)`](#listnodesnames)
- [`unlistNode()`](#unlistnodename)
- [`getQuery()`](#getquery)
- [`clearQuery()`](#clearquery)

Also `headus` object is expected to dispatch the following custom events:

- [`menutrigger`](#menutrigger)

[Back to top](#headus-module-requirements)

## Methods

### `init()`

[Back to top](#headus-module-requirements)

### `listNodes(names)`

This function (method) should fill the datalist of nodes with the given `names` as options.

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

### `menutrigger`

This event should be dispatched when the "Menu" button is clicked.

[Back to top](#headus-module-requirements)
