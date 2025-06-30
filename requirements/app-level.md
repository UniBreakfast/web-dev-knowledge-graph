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
   
[Back to top](#application-level-requirements)

## `init()`

Function should initialize the application. Have to be called only once on each page load after all the event handlers are registered, for the side effects only. It should run the following in that order:

- [`isFirstRun()`](#isfirstrun)
- [`headus.init()`](./headus#init)
- [`nodus.init()`](./nodus#init)
- [`linkus.init()`](./linkus#init)
- [`dialogus.init()`](./dialogus#init)
- [`graphus.init(data)`](./graphus#init)

If the app is running for the first time, `data` should be fetched from the `example_graph.json` file. Otherwise, it should be loaded from the `localStorage`, checked for validity with `graphus.isValidGraph(data)` to make sure the data is of expected shape, and passed to `graphus.init(data)`.

Also, if the app is running for the first time, it should call `dialogus.open('splash', {version, canClose: true})`
   
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

Function should add all the event listeners for the `headus` module custom events. Have to be called only once on each page load, for side effects only.
