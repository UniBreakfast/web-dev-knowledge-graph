## Linkus module requirements

### This document holds requirements for the `linkus.js` file

It should export a `linkus` object that is an instance of `EventTarget` with the following methods:

- [`init()`](#init)
- [`showTwin(...)`](#showtwin)
- [`showMany(...)`](#showmany)

[Back to top](#linkus-module-requirements)

## Methods

### `init()`

[Back to top](#linkus-module-requirements)

### `showTwin(links)`

This function (method) is to be used for side effects only. It should show the link list presenting the given `links` array between two nodes.

[Back to top](#linkus-module-requirements)

### `showMany(links)`

This function (method) is to be used for side effects only. It should show the link list presenting the given `links` array in `all` mode.

[Back to top](#linkus-module-requirements)
