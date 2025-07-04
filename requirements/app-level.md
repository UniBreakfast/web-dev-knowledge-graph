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

Add [`menutrigger`](./headus#menutrigger) event handler calling the [`dialogus.open('menu', {canClose: true})`](./dialogus#openname-data) method. 

[Back to top](#application-level-requirements)

## `listenForNodusEvents()`

Function should add all the event listeners for the [`nodus` module custom events](nodus#custom-events). It has to be called only once on each page load, for side effects only.

Add [`gotonodetrigger`](./nodus#gotonodetrigger) event handler calling the [`changeCurrentNodeBy({id})`](#changecurrentnodebyidname-select-idname-silent) function for the given `event.detail.id`.

[Back to top](#application-level-requirements)

## `listenForLinkusEvents()`

Function should add all the event listeners for the [`linkus` module custom events](linkus#custom-events). It has to be called only once on each page load, for side effects only.

Add [`gotolinktrigger`](./linkus#gotolinktrigger) event handler calling the [`changeCurrentNodeBy({id: id.from, select: {id: id.to}})`](#changecurrentnodebyidname-select-idname-silent) function for the given `event.detail.id`.

[Back to top](#application-level-requirements)

## `listenForDialogusEvents()`

Function should add all the event listeners for the [`dialogus` module custom events](dialogus#custom-events). It has to be called only once on each page load, for side effects only.

Add [`splashtrigger`](./dialogus#splashtigger) event handler calling the [`dialogus.open('splash', {version, canClose: true})`](./dialogus#openname-data) method.

[Back to top](#application-level-requirements)

## `listenForGraphusEvents()`

Function should add all the event listeners for the [`graphus` module custom events](graphus#custom-events). It has to be called only once on each page load, for side effects only.

Add [`graphloaded`](./graphus#graphloaded) event handler calling the following functions in that order:

- [`headus.listNodes(names)`](./headus#listnodesnames)
- [`nodus.showMany(nodes)`](./nodus#showmanynodes)
- [`linkus.showMany(links)`](./linkus#showmanylinks)
- [`showBody()`](#showbody)

[Back to top](#application-level-requirements)

## `showBody()`

Function should remove the `hidden` attribute from the `<body>` element. It is to be used for side effects only.

[Back to top](#application-level-requirements)

## `changeCurrentNodeBy({id|name, ?select: {id|name}}, ?silent)`

Function should try to change the current node to the node with the given `id` or `name`. It should be called for side effects only.

If `id` is given or acquired from the [`graphus.getIdByName(name)`](./graphus#getidbynamename) method, should call the [`graphus.getNodeById(id)`](./graphus#getnodebyidid) method. If the node is not found and `silent` is not `true`, should call the [`dialogus.open('inform', {message: 'Node not found', canClose: true})`](./dialogus#openname-data) method. If node is found, should call the [`graphus.getLinksById(id)`](./graphus#getlinksbyidid1-id2) method for the same node id. Next [`nodus.showOne(node)`](./nodus#showonenode-selectedid) and [`linkus.showTwin(links, id)`](./linkus#showtwinlinks-id) methods should be called for the node and links respectively.

If `select` is given, function should call the [`graphus.getLinksById(id, select.id)`](./graphus#getlinksbyidid1-id2) method. Also should pass `select.id` to [`nodus.showOne(node, select.id)`](./nodus#showonenode-selectedid). 

If `name` is given instead of `id`, function should call the [`graphus.getIdByName(name)`](./graphus#getidbynamename) method first. Same for `select`, if `select.name` is given instead of `select.id`.

[Back to top](#application-level-requirements)
