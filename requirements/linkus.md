[Up to App level requirements](app-level)

# Linkus module requirements

### This document holds requirements for the `linkus.js` file

It should export a `linkus` object that is an instance of `EventTarget` with the following methods:

- [`init()`](#init)
- [`showTwin(...)`](#showtwinlinks-id)
- [`showMany(...)`](#showmanylinks)
- [`geListedLinks()`](#getlistedlinks)
- [`updateLink(...)`](#updatelinkfrom-to-description)
- [`removeLink(...)`](#removelinkfrom-to)

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

This function (method) is to be used for side effects only. It should show the link list presenting the given `links` array in `unrelated` mode. All list items should have `outgoing` class.

See the [`graphus.getLinks()`](./graphus#getlinksfilter) method for the expected shape of the `links` array.

[Back to top](#linkus-module-requirements)

### `geListedLinks()`

This function (method) should return an array of links that are currently shown in the right panel. Expected shape of result is:

```
[ 0 or more elements like the one below
  {
    from: positive integer,
    to: different positive integer,
  },
]
```

[Back to top](#linkus-module-requirements)

### `updateLink(from, to, description)`

This function (method) should update the description of the link with the given `from` and `to` ids on the page. It should be called for side effects only.

[Back to top](#linkus-module-requirements)

### `removeLink(from, to)`

This function (method) should remove the link with the given `from` and `to` ids from the list on the page. It should be called for side effects only.

## Custom events

### `gotolinktrigger`

This event should be dispatched when the "Go to link" button is clicked next to a specific link in `unrelated` mode. It should carry the `event.detail.id` property with the following data:

```
{
  from: positive integer,
  to: different positive integer,
}
```

[Back to top](#linkus-module-requirements)

### `editlinktrigger`

This event should be dispatched when the "Edit link" button is clicked next to a specific link. It should carry the `event.detail.id` property with the following data:

```
{
  from: positive integer,
  to: different positive integer,
}
```

[Back to top](#linkus-module-requirements)

### `deletelinktrigger`

This event should be dispatched when the "Delete link" button is clicked next to a specific link. It should carry such link detail as `id` property with the following data:

```
{
  from: positive integer,
  to: different positive integer,
}
```

[Back to top](#linkus-module-requirements)

<img width="480" alt="GRAPH logo" src="https://github.com/user-attachments/assets/259d5bbd-d8ad-497c-b417-14940e78e246" />
