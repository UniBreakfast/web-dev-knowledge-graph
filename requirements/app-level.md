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

Add [`addnodetrigger`](./headus#addnodetrigger) event handler calling the [`dialogus.open('add node', {?name: event.detail.name, canClose: true})`](./dialogus#openname-data) method. If the `name` is not provided or if it is provided but the call to [`graphus.isNameTaken(name)`](./graphus#isnametakenname) returns `true`, the `name` property on the data argument is to be skipped.

Add [`querynode`](./headus#querynode) event handler calling the [`changeCurrentNodeBy({name}, true)`](#changecurrentnodebyidname-select-idname-silent) function for the given `event.detail.query`.

Add [`menutrigger`](./headus#menutrigger) event handler calling the [`dialogus.open('menu', {canClose: true})`](./dialogus#openname-data) method. 

[Back to top](#application-level-requirements)

## `listenForNodusEvents()`

Function should add all the event listeners for the [`nodus` module custom events](nodus#custom-events). It has to be called only once on each page load, for side effects only.

Add [`gotonodetrigger`](./nodus#gotonodetrigger) event handler calling the [`changeCurrentNodeBy({id})`](#changecurrentnodebyidname-select-idname-silent) function for the given `event.detail.id`.

Add [`editnodetrigger`](./nodus#editnodetrigger) event handler calling the [`dialogus.open('edit node', {node, canClose: true})`](./dialogus#openname-data) method. It should get the node information with the [`graphus.getNodeById(event.detail.id)`](./graphus#getnodebyidid) method and pass it as `node` property in the data argument.

Add [`deletenodetrigger`](./nodus#deletenodetrigger) event handler getting the node information with the [`graphus.getNodeById(event.detail.id)`](./graphus#getnodebyidid) method and then calling the [`dialogus.open('delete node', {node, canClose: true})`](./dialogus#openname-data) method.

Add [`addlinktrigger`](./nodus#addlinktrigger) event handler calling the [`graphus.getNameById(event.detail.id)`](./graphus#getnamebyidid) method, and then calling the [`dialogus.open('add link', {from: name}, canClose: true})`](./dialogus#openname-data) method.

Add [`nodeselectedtrigger`](./nodus#nodeselectedtrigger) event handler, that accepts the `event.detail.id` and then calls the [`graphus.getLinksById(id.current, id.selected)`](./graphus#getlinksbyidid1-id2) method. Next it should call the [`linkus.showTwin(links, id.current)`](./linkus#showtwinlinks-id) method.

[Back to top](#application-level-requirements)

## `listenForLinkusEvents()`

Function should add all the event listeners for the [`linkus` module custom events](linkus#custom-events). It has to be called only once on each page load, for side effects only.

Add [`gotolinktrigger`](./linkus#gotolinktrigger) event handler calling the [`changeCurrentNodeBy({id: id.from, select: {id: id.to}})`](#changecurrentnodebyidname-select-idname-silent) function for the given `event.detail.id`.

Add [`editlinktrigger`](./linkus#editlinktrigger) event handler accepting the `event.detail.id`, then getting the node names with the [`graphus.getNameById(id.from)`](./graphus#getnamebyidid) and [`graphus.getNameById(id.to)`](./graphus#getnamebyidid) methods, and the link description with the [`graphus.getLinkDescription(id.from, id.to)`](./graphus#getlinkdescriptionfrom-to) method, and then calling the [`dialogus.open('edit link', {link: {id: {from: id.from, to: id.to}, from: fromName, to: toName}, description, canClose: true})`](./dialogus#openname-data) method.

Add [`deletelinktrigger`](./linkus#deletelinktrigger) event handler accepting the `event.detail.id`, then getting the link information with the [`graphus.getLinksById(id.from, id.to)`](./graphus#getlinksbyidfrom-to) calling the [`dialogus.open('delete link', {link, canClose: true})`](./dialogus#openname-data) method.

[Back to top](#application-level-requirements)

## `listenForDialogusEvents()`

Function should add all the event listeners for the [`dialogus` module custom events](dialogus#custom-events). It has to be called only once on each page load, for side effects only.

Add [`showalltrigger`](./dialogus#showalltrigger) event handler calling the [`showMany()`](#showmany) function and [`dialogus.close('menu')`](./dialogus#closename) method.

Add [`exporttrigger`](./dialogus#exporttrigger) event handler calling the [`graphus.export()`](./graphus#exportgraph) method and then opening the native file save dialog with suggested name like `graph yyyy-mm-dd.json`.

Add [`importtrigger`](./dialogus#importtrigger) event handler opening the native file open dialog and then if the user selected a JSON-file, parsing it with `JSON.parse()`, validating with the [`graphus.isValidGraph(data)`](./graphus#isvalidgraphdata) method and then, if it is valid, calling the [`graphus.init(data)`](./graphus#initdata) method and [`dialogus.close('menu')`](./dialogus#closename) method.

Add [`splashtrigger`](./dialogus#splashtigger) event handler calling the [`dialogus.open('splash', {version, canClose: true})`](./dialogus#openname-data) method.

Add [`addnodetrigger`](./dialogus#addnodetrigger) event handler, that should check if `event.detail.name` is empty, and if is is, should call the [`dialogus.open('inform', {title: 'Name required', text: 'Node name cannot be empty or empty-like.', canClose: true})`](./dialogus#openname-data) method. Otherwise, it should call the [`graphus.isNameTaken(event.detail.name)`](./graphus#isnametakenname) method, and if it returns `true`, should call the [`dialogus.open('inform', {title: 'Name taken', text: 'There\'s already a node named ' + event.detail.name + '. Try another name.', canClose: true})`](./dialogus#openname-data) method. Otherwise, should call the [`dialogus.close('add node')`](./dialogus#closename) method, and then call the [`graphus.addNode(event.detail.name, ?event.detail.description)`](./graphus#addnodename-description) method. Second argument is optional, it is passed if not empty.

Add [`savenodetrigger`](./dialogus#savenodetrigger) event handler, that should accept the `event.detail.node` object, then it should check if `node.name` is empty, and if it is, should call the [`dialogus.open('inform', {title: 'Name required', text: 'Node name cannot be empty or empty-like.', canClose: true})`](./dialogus#openname-data) method. Otherwise, it should call the [`graphus.isNameTaken(node.name)`](./graphus#isnametakenname) method, and if it returns `true`, it should call the [`graphus.getIdByName(node.name)`](./graphus#getidbynamename) method, and if it does not return the `node.id`, then call the [`dialogus.open('inform', {title: 'Name taken', text: 'There\'s already a node named ' + node.name + '. Try another name.', canClose: true})`](./dialogus#openname-data) method. Otherwise, should call the [`dialogus.close('edit node')`](./dialogus#closename) method, and then call the [`graphus.updateNode(node.id, {name: node.name, description: node.description})`](./graphus#updatenodeid-name-description) method.

Add [`deletenodetrigger`](./dialogus#deletenodetrigger) event handler calling the [`graphus.deleteNode(event.detail.id)`](./graphus#delenodeid) method.

Add [`addlinktrigger`](./dialogus#addlinktrigger) event handler that should accept the `event.detail.link` object, then check if both `link.from` and `link.to` are empty, and if they are call the [`dialogus.open('inform', {title: 'Node names required', text: 'Links are linking pairs of nodes, so node names have to be specified.', canClose: true})`](./dialogus#openname-data) method. Otherwise, it should check if either `link.from` or `link.to` is empty, or they are equal, or [`graphus.getIdByName(link.from)`](./graphus#getidbynamename) or [`graphus.getIdByName(link.to)`](./graphus#getidbynamename) returns `null`, and if so call the [`dialogus.open('inform', {title: 'Two exising nodes required', text: 'Links can be created only between two distinct existing nodes'})`](./dialogus#openname-data) method. Otherwise, it should call [`graphus.doesLinkExist(link.from, link.to)`](./graphus#getlinkfrom-to) and if it returns `true`, call the [`dialogus.open('inform', {title: 'Link exists', text: 'There\'s already a link between those two nodes in that direction.', canClose: true})`](./dialogus#openname-data) method. Otherwise, it should call the [`dialogus.close('add link')`](./dialogus#closename) method, and then call the [`graphus.addLink(fromId, toId, link.description)`](./graphus#addlinkfrom-to-description) method.

Add [`savelinktrigger`](./dialogus#savelinktrigger) event handler accepting the `event.detail.link` object, then check if both `link.from` and `link.to` are empty, and if they are call the [`dialogus.open('inform', {title: 'Node names required', text: 'Links are linking pairs of nodes, so node names have to be specified.', canClose: true})`](./dialogus#openname-data) method. Otherwise, it should check if either `link.from` or `link.to` is empty, or they are equal, or [`graphus.getIdByName(link.from)`](./graphus#getidbynamename) or [`graphus.getIdByName(link.to)`](./graphus#getidbynamename) returns `null`, and if so call the [`dialogus.open('inform', {title: 'Two exising nodes required', text: 'Links can be created only between two distinct existing nodes'})`](./dialogus#openname-data) method. Otherwise, it should call [`graphus.getIdByName(link.from)`](./graphus#getidbynamename) and [`graphus.getIdByName(link.to)`](./graphus#getidbynamename), and if not both are equal to `link.id.from` and `link.id.to` respectively, call the [`graphus.doesLinkExist(fromId, toId)`](./graphus#doeslinkexistfrom-to) and if it returns `true`, call the [`dialogus.open('inform', {title: 'Link exists', text: 'There\'s already a link between those two nodes in that direction.', canClose: true})`](./dialogus#openname-data) method. Otherwise, it should call the [`dialogus.close('edit link')`](./dialogus#closename) method, and then call the [`graphus.updateLink(link.id.from, link.id.to, {?from: fromId, ?to: toId, description: link.description})`](./graphus#updatelinkfrom-to-description) method with `from` and `to` properties present only if they are not equal to `link.id.from` and `link.id.to` respectively.

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

If the `change.type` is `node` and `change.action` is `update`, check if `change.name.old` equals `change.name.new`. If it does not, call the [`headus.unlistNode(change.name.old)`](./headus#unlistnodename) and [`headus.enlistNode(change.name.new)`](./headus#enlistnodename) methods. Also call the [`nodus.getCurrentId()`](./nodus#getcurrentid) method and if it returns `change.id`, call the [`nodus.updateOne({name: change.name.new, description: change.description})`](./nodus#updateonename-description) method.

If the `change.type` is `node` and `change.action` is `delete`, call the [`headus.unlistNode(change.id)`](./headus#unlistnodeid) method. Also if the [`headus.getQuery()`](./headus#getquery) method returns `change.name`, call the [`headus.clearQuery()`](./headus#clearquery) method. Also if the [`nodus.getCurrentId()`](./nodus#getcurrentid) method returns `change.id`, call the [`showMany()`](#showMany) function. Also if the [`nodus.getListedNodes()`](./nodus#getlistednodes) method returns an array of ids that includes `change.id`, call the [`nodus.removeNode(change.id)`](./nodus#removenodeid) method. Also if the [`linkus.geListedLinks()`](./linkus#getlistedlinks) method returns an array of links that includes any of the id pairs of either `change.id` or `change.links`, call the [`linkus.removeLink(from, to)`](./linkus#removelinkfrom-to) method for each such link id pair.

If the `change.type` is `link` and `change.action` is `add`, call the [`nodus.getCurrentId()`](./nodus#getcurrentid) method and if it returns the `change.id.from`, call the [`changeCurrentNodeBy({id: change.id.from, select: {id: change.id.to})`](#changecurrentnodebyidname-select-idname-silent) function. Otherwise, if it returns the `change.id.to`, call the [`changeCurrentNodeBy({id: change.id.to, select: {id: change.id.from})`](#changecurrentnodebyidname-select-idname-silent) function.

If the `change.type` is `link` and `change.action` is `update`, check if `change.id.update` is provided, and if it is, call the [`changeCurrentNodeBy({id: change.id.update.from, select: {id: change.id.update.to})`](#changecurrentnodebyidname-select-idname-silent) function. Otherwise, call the [`linkus.getListedLinks()`](./linkus#getlistedlinks) method and if it returns an array of links that includes the `change.id`, call the [`linkus.updateLink(change.id.from, change.id.to, change.description)`](./linkus#updatelinkfrom-to) method.

If the `change.type` is `link` and `change.action` is `delete`, call the [`nodus.getCurrentId()`](./nodus#getcurrentid) method, and if it returns the `change.id.from`, call the [`changeCurrentNodeBy({id: change.id.from})`](#changecurrentnodebyidname-select-idname-silent) function. Otherwise, if it returns the `change.id.to`, call the [`changeCurrentNodeBy({id: change.id.to})`](#changecurrentnodebyidname-select-idname-silent) function.
  
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
