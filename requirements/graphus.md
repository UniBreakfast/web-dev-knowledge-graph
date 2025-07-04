# Graphus module requirements

### This document holds requirements for the `graphus.js` file

It should export a `graphus` object that is an instance of `EventTarget` with the following methods:

- [`init(...)`](#initdata)
- [`isValidGraph(...)`](#isvalidgraphdata)
- [`getIdByName(...)`](#getidbynamename)
- [`getNodeById(...)`](#getnodebyidid)
- [`getLinksById(...)`](#getlinksbyidd1id2)
- [`getNodes()`](#getnodes)
- [`getLinks()`](#getlinks)

Also `graphus` object is expected to dispatch the following custom events:

- [`graphloaded`](#graphloaded)

[Back to top](#graphus-module-requirements)

## Methods

### `init(?data)`

This function (method) is to be used for side effects only. It should initialize the graph with the given `data`, if any, which should lead to the [`graphloaded`](#graphloaded) event being dispatched.

[Back to top](#graphus-module-requirements)

### `isValidGraph(data)`

Predicate function that returns `true` if the given `data` is of expected shape, `false` otherwise. Expected shape is:

```
{
  version: positive integer,
  nextId: positive integer,
  nodes: { 0 or more properties like the one below
    id: { name: string },
  },
  links: { 0 or more properties like the one below
    fromId_toId: string,
  }
}
no other properties are allowed
id, fromId, toId are strings with positive integer values
fromId and toId are distinct keys in nodes
id and fromId_toId combined do not repeat.
string values can be empty, if not - should be sanitized and trimmed
name should be non-empty sanitized and trimmed string
```

[Back to top](#graphus-module-requirements)

### `getIdByName(name)`

This method (function) should return the id of the node with the given `name` or `null` if the node is not found. Should expect `name` to be a non-empty string.

[Back to top](#graphus-module-requirements)

### `getNodeById(id)`

This method (function) should return the node with the given `id` or `null` if the node is not found. Should expect `id` to be a positive integer. Expected shape of the node is:

```
{
  id: positive integer,
  name: string,
  description: string,
  linksToNodes: [ 0 or more elements like the one below
    {
      id: positive integer,
      name: string,
      direction: 'incoming' | 'outgoing' | 'two-way'
    },
  ]
}
```

[Back to top](#graphus-module-requirements)

### `getLinksById(id1, ?id2)`

This method (function) should return an array of links to/from the node with the given `id1` or an empty array if no links with that specific node are found. Should expect `id1` to be a positive integer. Expected shape of result is:

```
[ 0 or more elements like the one below
  {
    direction: 'incoming' | 'outgoing',
    description: string,
    node {
      id: positive integer,
      name: string,
      description: string,
    },
  },
]
```

If `id2` is given, should return an array of links between the nodes with `id1` and `id2` only.

[Back to top](#graphus-module-requirements)

### `getNodes()`

This method (function) should return an array of all nodes in the graph. Expected shape of result is:

```
[ 0 or more elements like the one below
  {
    id: positive integer,
    name: string,
    description: string,
    linkCount: {
      incoming: non-negative integer,
      outgoing: non-negative integer
    }
  },
]
```

[Back to top](#graphus-module-requirements)

### `getLinks()`

This method (function) should return an array of all links in the graph. Expected shape of result is:

```
[ 0 or more elements like the one below
  {
    from {
      id: positive integer,
      name: string,
    },
    to {
      id: positive integer,
      name: string,
    },
    description: string
  },
]
```

[Back to top](#graphus-module-requirements)

## Custom events

### `graphloaded`

This event should be dispatched when the graph is loaded. It should carry such graph details as `nodes` and `links` as arrays of objects with all the data that needs to be displayed.

See the [`graphus.getNodes()`](./graphus#getnodes) and [`graphus.getLinks()`](./graphus#getlinks) methods for the expected shape of the arrays.

[Back to top](#graphus-module-requirements)
