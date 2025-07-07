[Back to README](..)

# Application level requirements

#### This document holds requirements for the `app.js` file

Application should import, wire up and use the following modules:

- [Graphus (`./js/graphus.js`)](graphus)
- [Headus (`./js/headus.js`)](headus)
- [Nodus (`./js/nodus.js`)](nodus)
- [Linkus (`./js/linkus.js`)](linkus)
- [Dialogus (`./js/dialogus.js`)](dialogus)

App should have a set of functions:

- [`init()`](#init)
- [`isFirstRun()`](#isfirstrun)
- [`addCustomListeners()`](#addcustomlisteners)
- [`listenForHeadusEvents()`](#listenforheadusevents)
- [`listenForNodusEvents()`](#listenfornodusevents)
- [`listenForLinkusEvents()`](#listenforlinkusevents)
- [`listenForDialogusEvents()`](#listenfordialogusevents)
- [`listenForGraphusEvents()`](#listenforgraphusevents)
- [`showBody()`](#showbody)
- [`changeCurrentNodeBy(...)`](#changecurrentnodebyidname-select-idname-silent)
- [`showMany()`](#showMany)
   
[Back to top](#application-level-requirements)

## `init()`

Function should initialize the application. Have to be called only once on each page load after all the event handlers are registered, for the side effects only. It should run the following in that order:

- [`isFirstRun()`](#isfirstrun)
- [`headus.init()`](./headus#init)
- [`nodus.init()`](./nodus#init)
- [`linkus.init()`](./linkus#init)
- [`dialogus.init()`](./dialogus#init)
- [`graphus.init(data)`](./graphus#initdata)

If the app is running for the first time, `data` should be fetched from the `example_graph.json` file. Otherwise, it should be loaded from the `localStorage`, checked for validity with [`graphus.isValidGraph(data)`](./graphus#isvalidgraphdata), to make sure the data is of expected shape, and passed to [`graphus.init(data)`](./graphus#init).

Also, if the app is running for the first time, it should call [`dialogus.open('splash', {version, canClose: true})`](./dialogus#openname-data).
   
[Back to top](#application-level-requirements)

## `isFirstRun()`

Predicate function that returns `true` if the application is running for the first time, `false` otherwise. Have to be called only once on each page load after all the event handlers are registered. To determine if the app is running for the first time, should check if the `localStorage` has the `graph_app_data` entry. If it does, the app is not running for the first time.

[Back to top](#application-level-requirements)

## `addCustomListeners()`

Function should add all the event listeners for the custom events by calling the following functions in that order:

- [`listenForHeadusEvents()`](#listenforheadusevents)
- [`listenForNodusEvents()`](#listenfornodusevents)
- [`listenForLinkusEvents()`](#listenforlinkusevents)
- [`listenForDialogusEvents()`](#listenfordialogusevents)
- [`listenForGraphusEvents()`](#listenforgraphusevents)

Have to be called only once on each page load, for side effects only.

[Back to top](#application-level-requirements)

## `listenForHeadusEvents()`

Function should add all the event listeners for the [`headus` module custom events](headus#custom-events). It has to be called only once on each page load, for side effects only.

Add [`addnodetrigger`](./headus#addnodetrigger) event handler calling the [`dialogus.open('add node', {?name: event.detail.name, canClose: true})`](./dialogus#openname-data) method. If the `name` is not provided, the `name` property on the data argument is to be skipped.

Add [`querynode`](./headus#querynode) event handler calling the [`changeCurrentNodeBy({name}, true)`](#changecurrentnodebyidname-select-idname-silent) function for the given `event.detail.query`.

Add [`menutrigger`](./headus#menutrigger) event handler calling the [`dialogus.open('menu', {canClose: true})`](./dialogus#openname-data) method. 

[Back to top](#application-level-requirements)

## `listenForNodusEvents()`

Function should add all the event listeners for the [`nodus` module custom events](nodus#custom-events). It has to be called only once on each page load, for side effects only.

Add [`gotonodetrigger`](./nodus#gotonodetrigger) event handler calling the [`changeCurrentNodeBy({id})`](#changecurrentnodebyidname-select-idname-silent) function for the given `event.detail.id`.

Add [`deletenodetrigger`](./nodus#deletenodetrigger) event handler getting the node information with the [`graphus.getNodeById(event.detail.id)`](./graphus#getnodebyidid) method and then calling the [`dialogus.open('delete node', {node, canClose: true})`](./dialogus#openname-data) method.

[Back to top](#application-level-requirements)

## `listenForLinkusEvents()`

Function should add all the event listeners for the [`linkus` module custom events](linkus#custom-events). It has to be called only once on each page load, for side effects only.

Add [`gotolinktrigger`](./linkus#gotolinktrigger) event handler calling the [`changeCurrentNodeBy({id: id.from, select: {id: id.to}})`](#changecurrentnodebyidname-select-idname-silent) function for the given `event.detail.id`.

Add [`deletelinktrigger`](./linkus#deletelinktrigger) event handler accepting the `event.detail.id`, then getting the link information with the [`graphus.getLinksById(id.from, id.to)`](./graphus#getlinksbyidfrom-to) calling the [`dialogus.open('delete link', {link, canClose: true})`](./dialogus#openname-data) method.

[Back to top](#application-level-requirements)

## `listenForDialogusEvents()`

Function should add all the event listeners for the [`dialogus` module custom events](dialogus#custom-events). It has to be called only once on each page load, for side effects only.

Add [`splashtrigger`](./dialogus#splashtigger) event handler calling the [`dialogus.open('splash', {version, canClose: true})`](./dialogus#openname-data) method.

Add [`addnodetrigger`](./dialogus#addnodetrigger) event handler should check if `event.detail.name` is empty, and if is is, should call the [`dialogus.open('inform', {title: 'Name required', text: 'Node name cannot be empty or empty-like.', canClose: true})`](./dialogus#openname-data) method. Otherwise, should call the [`dialogus.close('add node')`](./dialogus#closename) method, and then call the [`graphus.addNode(event.detail.name, ?event.detail.description)`](./graphus#addnodename-description) method. Second argument is optional, it is passed if not empty.

Add [`deletenodetrigger`](./dialogus#deletenodetrigger) event handler calling the [`graphus.deleteNode(event.detail.id)`](./graphus#delenodeid) method.

Add [`deletelinktrigger`](./dialogus#deletelinktrigger) event handler accepting the `event.detail.id`, then calling the [`graphus.deleteLink(id.from, id.to)`](./graphus#delinkfrom-to) method.

[Back to top](#application-level-requirements)

## `listenForGraphusEvents()`

Function should add all the event listeners for the [`graphus` module custom events](graphus#custom-events). It has to be called only once on each page load, for side effects only.

Add [`graphloaded`](./graphus#graphloaded) event handler calling the following functions in that order:

- [`headus.listNodes(names)`](./headus#listnodesnames)
- [`nodus.showMany(nodes)`](./nodus#showmanynodes)
- [`linkus.showMany(links)`](./linkus#showmanylinks)
- [`showBody()`](#showbody)

Add [`graphupdated`](./graphus#graphupdated) event handler that acts based on the `event.detail.change` object.

If the `change.type` is `node` and `change.action` is `add`, call the [`headus.enlistNode(name)`](./headus#enlistnodename) method. Also call the [`nodus.showOne(node)`](./nodus#showonenode-selectedid) and [`linkus.showTwin(links, id)`](./linkus#showtwinlinks-id) methods for the new node, using data from the `change` object and passing an empty array as `links` argument.

If the `change.type` is `node` and `change.action` is `delete`, call the [`headus.unlistNode(change.id)`](./headus#unlistnodeid) method. Also if the [`headus.getQuery()`](./headus#getquery) method returns `change.name`, call the [`headus.clearQuery()`](./headus#clearquery) method. Also if the [`nodus.getCurrentId()`](./nodus#getcurrentid) method returns `change.id`, call the [`showMany()`](#showMany) function. Also if the [`nodus.getListedNodes()`](./nodus#getlistednodes) method returns an array of ids that includes `change.id`, call the [`nodus.removeNode(change.id)`](./nodus#removenodeid) method. Also if the [`linkus.geListedLinks()`](./linkus#getlistedlinks) method returns an array of links that includes any of the id pairs of either `change.id` or `change.links`, call the [`linkus.removeLink(from, to)`](./linkus#removelinkfrom-to) method for each such link id pair.
  
[Back to top](#application-level-requirements)

## `showBody()`

Function should remove the `hidden` attribute from the `<body>` element. It is to be used for side effects only.

[Back to top](#application-level-requirements)

## `changeCurrentNodeBy({id|name, ?select: {id|name}}, ?silent)`

Function should try to change the current node to the node with the given `id` or `name`. It should be called for side effects only.

If `id` is given or acquired from the [`graphus.getIdByName(name)`](./graphus#getidbynamename) method, should call the [`graphus.getNodeById(id)`](./graphus#getnodebyidid) method. If the node is not found and `silent` is not `true`, should call the [`dialogus.open('inform', {message: 'Node not found', canClose: true})`](./dialogus#openname-data) method. If node is found, should call the [`graphus.getLinksById(id)`](./graphus#getlinksbyidid1-id2) method for the same node id. Next [`nodus.showOne(node)`](./nodus#showonenode-selectedid) and [`linkus.showTwin(links, id)`](./linkus#showtwinlinks-id) methods should be called for the node and links respectively.

If second argument is a boolean it is to be assigned to `silent`, and `select` should become `undefined`.

If `select` is given, function should call the [`graphus.getLinksById(id, select.id)`](./graphus#getlinksbyidid1-id2) method. Also should pass `select.id` to [`nodus.showOne(node, select.id)`](./nodus#showonenode-selectedid). 

If `name` is given instead of `id`, function should call the [`graphus.getIdByName(name)`](./graphus#getidbynamename) method first. Same for `select`, if `select.name` is given instead of `select.id`.

[Back to top](#application-level-requirements)

## `showMany()`

Function should call the following functions in that order:

- [`graphus.getNodes()`](./graphus#getnodes)
- [`graphus.getLinks()`](./graphus#getlinks)
- [`nodus.showMany(nodes)`](./nodus#showmanynodes)
- [`linkus.showMany(links)`](./linkus#showmanylinks)
- [`showBody()`](#showbody)

[Back to top](#application-level-requirements)
