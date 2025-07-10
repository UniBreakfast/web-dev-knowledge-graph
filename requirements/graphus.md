[Up to App level requirements](app-level)

# Graphus module requirements

### This document holds requirements for the `graphus.js` file

It should export a `graphus` object that is an instance of `EventTarget` with the following methods:

- [`init(...)`](#initdata)
- [`export()`](#export)
- [`isValidGraph(...)`](#isvalidgraphdata)
- [`isNameTaken(...)`](#isnametakenname)
- [`doesLinkExist(...)`](#doeslinkexistfrom-to)
- [`getIdByName(...)`](#getidbynamename)
- [`getNameById(...)`](#getnamebyidid)
- [`getNodeById(...)`](#getnodebyidid)
- [`getLinksById(...)`](#getlinksbyidid1-id2)
- [`getLinkDescription(...)`](#getlinkdescriptionfrom-to)
- [`getNodeNames()`](#getnodenames)
- [`getNodes(...)`](#getnodesfilter)
- [`getLinks(...)`](#getlinksfilter)
- [`getStats()`](#getstats)
- [`addNode(...)`](#addnodename-description)
- [`addLink(...)`](#addlinkfrom-to-description)
- [`updateNode(...)`](#updatenodeid-name-description)
- [`updateLink(...)`](#updatelinkfrom-to-data)
- [`deleteNode(...)`](#deletenodeid)
- [`deleteLink(...)`](#deletelinkfrom-to)

Also `graphus` object is expected to dispatch the following custom events:

- [`graphloaded`](#graphloaded)
- [`graphupdated`](#graphupdated)

[Back to top](#graphus-module-requirements)

## Methods

### `init(?data)`

This function (method) is to be used for side effects only. It should initialize the graph with the given `data`, if any, which should lead to the [`graphloaded`](#graphloaded) event being dispatched.

[Back to top](#graphus-module-requirements)

### `export()`

This function (method) should return the current graph structure serialized as a JSON string.

[Back to top](#graphus-module-requirements)

### `isValidGraph(data)`

Predicate function (method) that returns `true` if the given `data` is of expected shape, `false` otherwise. Expected shape is:

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

### `isNameTaken(name)`

Predicate function (method) that returns `true` if some node in the graph structure has the given `name`, `false` otherwise.

[Back to top](#graphus-module-requirements)

### `doesLinkExist(from, to)`

Predicate function (method) that returns `true` if the graph structure contains a link from `from` to `to`, `false` otherwise.

[Back to top](#graphus-module-requirements)

### `getIdByName(name)`

This function (method) should return the id of the node with the given `name` or `null` if the node is not found. Should expect `name` to be a non-empty string.

[Back to top](#graphus-module-requirements)

### `getNameById(id)`

This function (method) should return the name of the node with the given `id` or `null` if the node is not found. Should expect `id` to be a positive integer.

[Back to top](#graphus-module-requirements)

### `getNodeById(id)`

This function (method) should return the node with the given `id` or `null` if the node is not found. Should expect `id` to be a positive integer. Expected shape of the node is:

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

This function (method) should return an array of links to/from the node with the given `id1` or an empty array if no links with that specific node are found. Should expect `id1` to be a positive integer. Expected shape of result is:

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

### `getLinkDescription(from, to)`

This function (method) should return the description of the link with the given `from` and `to` ids or `null` if the link is not found. Should expect both `from` and `to` to be positive integers.

[Back to top](#graphus-module-requirements)

### `getNodeNames()`

This function (method) should return an array of all node names in the graph.

[Back to top](#graphus-module-requirements)

### `getNodes(?filter)`

This function (method) should return an array of all nodes in the graph. Expected shape of result is:

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

If `filter` is given, should return an array of nodes that match the filter, with `filter` being a predicate function that returns `true` if the node matches the filter, `false` otherwise. That `filter` function can expect two arguments: a node of the shape shown above and a stats object with `min` and `max` positive integer properties, telling you how many links the nodes in the graph tend to have.

[Back to top](#graphus-module-requirements)

### `getLinks(?filter)`

This function (method) should return an array of all links in the graph. Expected shape of result is:

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

If `filter` is given, should return an array of links that match the filter, with `filter` being a predicate function that returns `true` if the link matches the filter, `false` otherwise. That `filter` function can expect a link of the shape shown above to be passed as an argument to it.

[Back to top](#graphus-module-requirements)

### `getStats()`

This function (method) should return an object with the following properties:

```
{
  nodes: non-negative integer,
  links: non-negative integer,
  descriptionless: {
    nodes: non-negative integer,
    links: non-negative integer
  },
  linksPerNode: {
    min: non-negative integer,
    max: non-negative integer,
    avg: non-negative integer
  }
}
```

[Back to top](#graphus-module-requirements)

### `addNode(name, ?description)`

This function (method) should add the node with the given `name` and `description` to the graph. Should expect `name` to be a non-empty string. Should also expect `description` to be a string. Then it should dispatch the [`graphupdated`](#graphupdated) event with the change details.

[Back to top](#graphus-module-requirements)

### `addLink(from, to, ?description)`

This function (method) should add the link between the nodes with the given `from` and `to` ids to the graph. Should expect both `from` and `to` to be positive integers. Should also expect `description` to be a string. Then it should dispatch the [`graphupdated`](#graphupdated) event with the change details.

[Back to top](#graphus-module-requirements)

### `updateNode(id, {?name, ?description})`

This function (method) should update the node with the given `id` with the new `name` and/or `description`. Should expect `id` to be a positive integer. If `name` is given, it should be a non-empty string. If `description` is given, it should be a string. Then it should dispatch the [`graphupdated`](#graphupdated) event with the change details.

[Back to top](#graphus-module-requirements)

### `updateLink(from, to, data)`

This function (method) should update the link between the nodes with the given `from` and `to` ids with the new data. Should expect both `from` and `to` to be positive integers. The `data` object can contain the following properties:

- `from`: positive integer, the new `fromId` if changed
- `to`: positive integer, the new `toId` if changed
- `description`: string

Then it should dispatch the [`graphupdated`](#graphupdated) event with the change details.

[Back to top](#graphus-module-requirements)

### `deleteNode(id)`

This function (method) should delete the node with the given `id` from the graph. Should expect `id` to be a positive integer. It should also delete all the links to/from the node as well. Then it should dispatch the [`graphupdated`](#graphupdated) event with the change details. 

[Back to top](#graphus-module-requirements)

### `deleteLink(from, to)`

This function (method) should delete the link between the nodes with the given `from` and `to` ids from the graph. Should expect both `from` and `to` to be positive integers. Then it should dispatch the [`graphupdated`](#graphupdated) event with the change details.

[Back to top](#graphus-module-requirements)

## Custom events

### `graphloaded`

This event should be dispatched when the graph is loaded. It should carry such graph details as `nodes` and `links` as arrays of objects with all the data that needs to be displayed.

[Back to top](#graphus-module-requirements)

### `graphupdated`

This event should be dispatched when the graph is updated. It should carry the details of the change as `event.detail.change` object of the following shape:

```
{
  type: 'node' | 'link',
  action: 'add' | 'delete' | 'update',
  id: positive integer // if type is 'node'
      | { // if type is 'link'
        from: positive integer, 
        to: positive integer,
        update: { // if linked nodes are different now
          from: positive integer,
          to: positive integer
        }
      },
  name: string // if type is 'node' and action is add
        | { // if action is update
          old: string,
          new: string
        },
  description: string, // if action is add or update
  links: [ 0 or more elements like the one below
    {
      from: positive integer,
      to: positive integer,
    }, // if type is 'node', action is 'delete' and 
  ]   // there were links to/from the deleted node
}
```

[Back to top](#graphus-module-requirements)
