# Application level requirements

#### This document holds requirements for the `app.js` file

Application should import, wire up and use the following modules:

- Graphus (`./js/graphus.js`)
- Headus (`./js/headus.js`)
- Nodus (`./js/nodus.js`)
- Linkus (`./js/linkus.js`)
- Dialogus (`./js/dialogus.js`)

App should have a set of functions:

- `init()`
- `isFirstRun()`
  

## `init()`

Function should initialize the application. It is to be called for the side effects only. Have to be called only once on each page load after all the event handlers are registered. It should run the following in that order:

- `isFirstRun()`
- `headus.init()`
- `nodus.init()`
- `linkus.init()`
- `dialogus.init()`
- `graphus.init(data)`

If the app is running for the first time, `data` should be fetched from the `example_graph.json` file. Otherwise, it should be loaded from the `localStorage`, checked for validity with `graphus.isValidGraph(data)` to make sure the data is of expected shape, and passed to `graphus.init(data)`.

Also, if the app is running for the first time, it should call `dialogus.open('about', {version})`

## `isFirstRun()`

Predicate function that returns `true` if the application is running for the first time, `false` otherwise. Have to be called only once on each page load after all the event handlers are registered. To determine if the app is running for the first time, should check if the `localStorage` has the `graph_app_data` entry. If it does, the app is not running for the first time.
