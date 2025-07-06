[Up to App level requirements](app-level)

# Dialogus module requirements

### This document holds requirements for the `dialogus.js` file

It should export a `dialogus` object that is an instance of `EventTarget` with the following methods:

- [`init()`](#init)
- [`open(...)`](#openname-data) 

Also `dialogus` object is expected to dispatch the following custom events:

- [`splashtrigger`](#splashtigger)
- [`deletenodetrigger`](#deletenodetrigger)

[Back to top](#dialogus-module-requirements)

## Methods

### `init()`

[Back to top](#dialogus-module-requirements)

### `open(name, ?data)`

This function (method) is to be used for side effects only. It should open the dialog with the given `name`. If `data` is provided, it should be used to prepare the dialog. 

If `data.canClose` is `true`, the dialog buttons like `Cancel`, `Close`, `Continue` and `OK` (class `close`) should close the dialog until it is closed once. Also the dialog should be closed if the user clicks outside of it or presses the `ESC` key. But again, only until the dialog is closed once.

It supposed to recognize the following dialog names:

- `menu`
- `splash`
- `inform`
- `new node`
- `edit node`
- `delete node`
- `new link`
- `edit link`
- `delete link`

[Back to top](#dialogus-module-requirements)

## Custom events

### `splashtigger`

This event should be dispatched when the "About" button is clicked in "Menu" dialog.

[Back to top](#dialogus-module-requirements)

### `deletenodetrigger`

This event should be dispatched when the "Delete" button is clicked in "Delete node" dialog. It should contain the node information as `event.detail.id`.

[Back to top](#dialogus-module-requirements)
