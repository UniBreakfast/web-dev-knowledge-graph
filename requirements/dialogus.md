[Up to App level requirements](app-level)

# Dialogus module requirements

### This document holds requirements for the `dialogus.js` file

It should export a `dialogus` object that is an instance of `EventTarget` with the following methods:

- [`init()`](#init)
- [`open(...)`](#openname-data) 
- [`close(...)`](#closename)
- [`swapDirections(...)`](#swapdirectionsname)

Also `dialogus` object is expected to dispatch the following custom events:

- [`showalltrigger`](#showalltrigger)
- [`exporttrigger`](#exporttrigger)
- [`importtrigger`](#importtrigger)
- [`statstrigger`](#statstrigger)
- [`splashtrigger`](#splashtigger)
- [`emptynodestrigger`](#emptynodestrigger)
- [`emptylinkstrigger`](#emptylinkstrigger)
- [`leastlinkedtrigger`](#leastlinkedtrigger)
- [`mostlinkedtrigger`](#mostlinkedtrigger)
- [`randomnodetrigger`](#randomnodetrigger)
- [`randomlinktrigger`](#randomlinktrigger)s
- [`addnodetrigger`](#addnodetrigger)
- [`addlinktrigger`](#addlinktrigger)
- [`savenodetrigger`](#savenodetrigger)
- [`savelinktrigger`](#savelinktrigger)
- [`deletenodetrigger`](#deletenodetrigger)
- [`deletelinktrigger`](#deletelinktrigger)
- [`swapdirectionstrigger`](#swapdirectionstrigger)

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

If `name` is `menu` then the `data` should be used to prepare the buttons in the "Menu" dialog. `data` object is expected to have the `counts` property of the following shape:

```
{
  descriptionless: {
    nodes: non-negative integer,
    links: non-negative integer
  },
  linksPerNode: {
    min: non-negative integer,
    max: non-negative integer
  },
  present: {
    nodes: boolean,
    links: boolean
  }
}
```

If `name` is `inform` then the `data` should be used to prepare the "Inform" dialog. `data` object is expected to carry the following properties:

```
{
  title: string,
  text: string
}
```

If `name` is `new node` then the `data` can optionally contain the `name` property to pre-fill the input field. 

If `name` is `edit node` then the `data` should be used to prepare the "Edit Node" dialog. `data` object is expected to have the `node` property of the following shape:

```
{
  id: positive integer,
  name: string,
  description: string
}
```

If `name` is `delete node` then the `data` should be used to prepare the "Delete Node" dialog. `data` object is expected to have the `node` property of the following shape with the following properties:

```
{
  id: positive integer,
  name: string,
  linkCount: non-negative integer
}
```

If `name` is `new link` then the `data` should be used to prepare the "New Link" dialog. `data` object can optionally contain the `from` property to pre-fill the input field.

If `name` is `edit link` then the `data` should be used to prepare the "Edit Link" dialog. `data` object is expected to have the `link` property of the following shape:

```
{
  id: {
    from: positive integer,
    to: different positive integer
  },
  from: string, node name,
  to: string, node name,
  description: string
}
```

If `name` is `delete link` then the `data` should be used to prepare the "Delete Link" dialog. `data` object is expected to have the `link` property with the following properties:

```
{
  from: {
    id: positive integer,
    name: string
  },
  to: {
    id: positive integer,
    name: string
  }
}
```

[Back to top](#dialogus-module-requirements)

### `close(name)`

This function (method) is to be used for side effects only. It should close the dialog with the given `name`.

It supposed to recognize the same dialog names as [`open(...)`](#openname-data).

[Back to top](#dialogus-module-requirements)

### `swapDirections(name)`

This function (method) is to be used for side effects only. It should swap the values in the `from` and `to` fields of the dialog with the given `name`.

It supposed to recognize the following dialog names:

- `new link`
- `edit link`

[Back to top](#dialogus-module-requirements)

## Custom events

### `showalltrigger`

This event should be dispatched when the "Show all nodes and links" button is clicked in "Menu" dialog.

[Back to top](#dialogus-module-requirements)

### `exporttrigger`

This event should be dispatched when the "Export Graph" button is clicked in "Menu" dialog.

[Back to top](#dialogus-module-requirements)

### `importtrigger`

This event should be dispatched when the "Import Graph" button is clicked in "Menu" dialog.

[Back to top](#dialogus-module-requirements)

### `statstrigger`

This event should be dispatched when the "Stats" button is clicked in "Menu" dialog.

[Back to top](#dialogus-module-requirements)

### `splashtigger`

This event should be dispatched when the "About" button is clicked in "Menu" dialog.

[Back to top](#dialogus-module-requirements)

### `emptynodestrigger`

This event should be dispatched when the "Nodes without description" button is clicked in "Menu" dialog.

[Back to top](#dialogus-module-requirements)

### `emptylinkstrigger`

This event should be dispatched when the "Links without description" button is clicked in "Menu" dialog.

[Back to top](#dialogus-module-requirements)

### `leastlinkedtrigger`

This event should be dispatched when the "Least linked nodes" button is clicked in "Menu" dialog.

[Back to top](#dialogus-module-requirements)

### `mostlinkedtrigger`

This event should be dispatched when the "Most linked nodes" button is clicked in "Menu" dialog.

[Back to top](#dialogus-module-requirements)

### `randomnodetrigger`

This event should be dispatched when the "Random node" button is clicked in "Menu" dialog.

[Back to top](#dialogus-module-requirements)

### `randomlinktrigger`

This event should be dispatched when the "Random link" button is clicked in "Menu" dialog.

[Back to top](#dialogus-module-requirements)

### `addnodetrigger`

This event should be dispatched when the "Add" button is clicked in "Add node" dialog. It should carry the `event.detail.node` object of the following shape:

```
{
  name: trimmed string,
  description: trimmed string,
}
```

[Back to top](#dialogus-module-requirements)

### `addlinktrigger`

This event should be dispatched when the "Add" button is clicked in "Add Link" dialog. It should carry the `event.detail.link` object of the following shape:

```
{
  from: trimmed string,
  to: trimmed string,
  description: trimmed string,
}
```

[Back to top](#dialogus-module-requirements)

### `savelinktrigger`

This event should be dispatched when the "Save" button is clicked in "Edit link" dialog. It should carry the `event.detail.link` object of the following shape:

```
{
  id {
    from: positive integer,
    to: different positive integer,
  },
  from: trimmed string,
  to: trimmed string,
  description: trimmed string,
}
```

[Back to top](#dialogus-module-requirements)

### `savenodetrigger`

This event should be dispatched when the "Save" button is clicked in "Edit node" dialog. It should carry the `event.detail.node` object of the following shape:

```
{
  id: positive integer,
  name: trimmed string,
  description: trimmed string,
}
```

[Back to top](#dialogus-module-requirements)

### `deletenodetrigger`

This event should be dispatched when the "Delete" button is clicked in "Delete node" dialog. It should contain the node information as `event.detail.id`. Right after the event is dispatched, the "Delete node" dialog should be closed.

[Back to top](#dialogus-module-requirements)

### `deletelinktrigger`

This event should be dispatched when the "Delete" button is clicked in "Delete link" dialog. It should contain the link information as `event.detail.id` object of the following shape:

```
{
  from: positive integer,
  to: different positive integer,
}
```

Right after the event is dispatched, the "Delete link" dialog should be closed.

[Back to top](#dialogus-module-requirements)s

### `swapdirectionstrigger`

This event should be dispatched when the "Swap" button is clicked in "Add link" or "Edit link" dialog. It should contain the dialog name as `event.detail.name`. Dialogus should also listen for this event and call the [`swapDirections(event.detail.name)`](#swapdirectionsname) method on itself.

[Back to top](#dialogus-module-requirements)
