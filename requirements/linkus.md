# Linkus module requirements

### This document holds requirements for the `linkus.js` file

It should export a `linkus` object that is an instance of `EventTarget` with the following methods:

- [`init()`](#init)
- [`showTwin(...)`](#showtwin)
- [`showMany(...)`](#showmany)

Also `linkus` object is expected to dispatch the following custom events:

- [`gotolinktrigger`](#gotolinktrigger)
- [`editlinktrigger`](#editlinktrigger)
- [`deletelinktrigger`](#deletelinktrigger)

[Back to top](#linkus-module-requirements)

## Methods

### `init()`

[Back to top](#linkus-module-requirements)

### `showTwin(links, id)`

This function (method) is to be used for side effects only. It should show the link list presenting the given `links` array between two nodes, considering the point of view based on the `id` of the current node. List items should have the class corresponding to their direction (`outgoing` or `incoming`). Outgoing links should be shown first.

See the [`graphus.getLinksById(id)`](./graphus#getlinksbyid) method for the expected shape of the `links` array.

[Back to top](#linkus-module-requirements)

### `showMany(links)`

This function (method) is to be used for side effects only. It should show the link list presenting the given `links` array in `all` mode. All list items should have `outgoing` class.

See the [`graphus.getLinks()`](./graphus#getlinks) method for the expected shape of the `links` array.

[Back to top](#linkus-module-requirements)

## Custom events

### `gotolinktrigger`

This event should be dispatched when the "Go to link" button is clicked next to a specific link in `all` mode. It should carry the `event.detail.id` property with the following data:

```
{
  from: positive integer,
  to: different positive integer,
}
```

[Back to top](#linkus-module-requirements)
