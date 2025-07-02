## Graphus module requirements

### This document holds requirements for the `graphus.js` file

It should export a `graphus` object that is an instance of `EventTarget` with the following methods:

- [`init()`](#init)
- [`isValidGraph(...)`](#isvalidgraph)

Also `graphus` object is expected to dispatch the following custom events:

- [`graphloaded`](#graphloaded)

[Back to top](#graphus-module-requirements)

## Methods

### `init()`

[Back to top](#graphus-module-requirements)

### `isValidGraph(data)`

[Back to top](#graphus-module-requirements)

## Custom events

### `graphloaded`

This event should be dispatched when the graph is loaded. It should carry such graph details as `nodes` and `links` as arrays of objects with all the data that needs to be displayed.

[Back to top](#graphus-module-requirements)
