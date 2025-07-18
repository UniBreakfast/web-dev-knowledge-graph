[Back to README](..)

# Page layout markup requirements

[UI Guidelines are here](ui-guidelines)

#### This document holds requirements for the `index.html` file

HTML markup (with CSS styling) should produce a page with 4 parts:
1. [Header](#header-requirements) at the top
2. [Article](#article-requirements) on the left
3. [Aside](#aside-requirements) on the right
4. A bunch of [dialogs](#dialogs-requirements) ready to be opened

`article` and `aside` should be grouped together in a main, each one wrapped in a section. With vertical splitter between them, splitting the space 50/50.

[Back to top](#page-layout-markup-requirements)

## [Header requirements](#header-requirements)

The `header` should have 4 elements (left to right):

1. "Add Node" button
2. Select current node input (search input, list of existing nodes)
3. GRAPH app title
4. "Menu" button

Search input should take up most of the width, leave some space for the title to take.

If page width is too small, elements should wrap to the next line, but first pair should stay together, as well as the second pair. Also second pair should be at the top in that case.

`header` should also include a hidden invisible datalist of the node names for the search input.

[Back to top](#page-layout-markup-requirements)

## [Article requirements](#article-requirements)

Normally `article` should present one node at a time, that node considered "current". There should be a heading with the node name and a description below. Floating to the right there should be a vertical group of three buttons: "Edit Node", "Delete Node" and "Add Link".

Below the description there should be a list of links to other nodes. Each link should be represented by a button (label with hidden radio button) with the node name prefixed with direction (incoming/outgoing/two-way) shown with arrows. Arrows should be added based on the corresponding class (`incoming`, `outgoing`, `two-way`). Buttons should be placed next to each other, but should wrap to the next line if there is not enough space. They should be aligned to the right. If there are no linked nodes at the moment there should be a paragraph with a message "No links to other nodes yet". List/paragraph display mode should be controlled with a hidden invisible checkbox before it.

Alternatively (if no node is currently selected) there should be a vertical list of nodes represented with list items holding a header with the node name, followed by a description. Each node item should have a vertically stacked block floating to the right with a "Go to Node" button and counters for incoming/outgoing links shown with arrows next to the numbers.

Lastly (if there's no nodes at all) `article` should show a paragraph with a message "No nodes in the graph. Add some using the 'Add Node' button in the top left corner".

Article display mode should be controlled with the hidden invisible radio buttons before it, and there should be three modes: `current`, `many`, `message`.

[Back to top](#page-layout-markup-requirements)

## [Aside requirements](#aside-requirements)

Normally `aside` should present a list of all links to and from the current node. Each link should be represented by a list item with a heading with the linked node name (prefixed with direction shown with an arrow based on the class `incoming` or `outgoing`), a link description and a vertically stacked button group floating to the right with "Edit Link" and "Delete Link" buttons.

Heading, paragraph and button group should be wrapped in a summary element with details showing the linked node description paragraph if expanded. There also should be a "Go to Node" button floating to the left of that paragraph.

Alternatively (if no node is currently selected) there should be a list of all the links. Each link should be represented by a list item with a heading with "From" node name, an arrow right and "To" node name. Every link item should have `outgoing` class. There should also be a `paragraph` with the link description below with a button "Go to Link" floating to the right of that `paragraph`.

Alternatively (if there's no links to show) `aside` should show a `paragraph` with a message "No links" or "No links from/to the current node yet. Add some with the 'Add Link' button on the left". The last one should appear is a node is currently selected and there is at least one other node existing in the graph. Which one is to be decided by the hidden invisible checkbox before it.

Aside display mode should be controlled with the hidden invisible radio buttons before it, and there should be three modes: `related`, `unrelated`, `message`.

[Back to top](#page-layout-markup-requirements)

## [Dialogs requirements](#dialogs-requirements)

There should be dialogs for:
1. [Adding a node](#new-node-dialog)
2. [Adding a link](#new-link-dialog)
3. [Editing a node](#edit-node-dialog)
4. [Editing a link](#edit-link-dialog)
5. [Deleting a node](#delete-node-dialog)
6. [Deleting a link](#delete-link-dialog)
7. [Informing about a problem](#informer-dialog)
8. [Presenting a menu](#menu-dialog)
9. [Presenting stats](#stats-dialog)
10. [Splash screen with GRAPH app logo](#splash-screen)

All dialogs should be positioned in the middle of the page, have width set as minimum of 1000px and 85vw, have height set as 70vh (with exceptions: splash screen, delete dialogs, and informer should have height max-content), be scrollable if needed, have a heading with the dialog title, buttons grouped horizontally at the bottom, and have a gray semi-transparent bluring backdrop.

[Back to top](#page-layout-markup-requirements)

### New Node dialog

Dialog should have a title "New Node" and a form with the following fields:

1. Name (search input, list of existing nodes, required)
2. Description (textarea, non-resizable, vertically greedy, optional)

and buttons "Add" and "Cancel" (class "`close`").

[Back to top](#page-layout-markup-requirements)

### New Link dialog

Dialog should have a title "New Link" and a form with the following fields:

1. From-node Name (search input, list of existing nodes, required)
2. To-node Name (search input, list of existing nodes, required)
3. Description (textarea, non-resizable, vertically greedy, optional)

and buttons "Add" and "Cancel" (class "`close`").

There also should be a switch direction button positioned between the inputs, with two-way arrows.

[Back to top](#page-layout-markup-requirements)

### Edit Node dialog

Dialog should have a title "Edit Node" and a form with the following fields:

1. Name (search input, list of existing nodes, required)
2. Description (textarea, non-resizable, vertically greedy, optional)

and buttons "Save" and "Cancel" (class "`close`").

[Back to top](#page-layout-markup-requirements)

### Edit Link dialog

Dialog should have a title "Edit Link" and a form with the following fields:

1. From-node Name (search input, list of existing nodes, required)
2. To-node Name (search input, list of existing nodes, required)
3. Description (textarea, non-resizable, vertically greedy, optional)

and buttons "Save" and "Cancel" (class "`close`").

There also should be a switch direction button positioned between the inputs, with two-way arrows.

[Back to top](#page-layout-markup-requirements)

### Delete Node Dialog

Dialog should have a title "Delete Node" and a form with a paragraph warning about the non-recoverable deletion of the node and all of its links. Node name and the number of links should be shown with output elements in bold.

Buttons should be "Delete" and "Cancel" (class "`close`").

[Back to top](#page-layout-markup-requirements)

### Delete Link Dialog

Dialog should have a title "Delete Link" and a form with a paragraph warning about the non-recoverable deletion of the link. From-node name, and To-node name should be shown with output element in bold.

Buttons should be "Delete" and "Cancel" (class "`close`").

[Back to top](#page-layout-markup-requirements)

### Informer Dialog

Dialog should have a title and a paragraph (both will be provided elsewhere).

Single "OK" button (class "`close`").

[Back to top](#page-layout-markup-requirements)

### Menu Dialog

Dialog should have a vertical list of buttons with the menu items:

- "Show all nodes and links"
- "Export Graph"
- "Import Graph"
- "Stats"
- "About"

- "Nodes without description"
- "Links without description"
- "Least linked nodes"
- "Most linked nodes"
- "Random node"
- "Random link"

Single "Cancel" button (class "`close`").

[Back to top](#page-layout-markup-requirements)

### Stats Dialog

Dialog should have a title "Stats" and a table with two columns:

1. Stat name
2. Stat value

Stat rows should be:

- Number of nodes
- Number of links
- Number of nodes without description
- Number of links without description
- Minimum number of links a node has
- Maximum number of links a node has
- Average number of links a node has

Single "OK" button (class "`close`").

[Back to top](#page-layout-markup-requirements)

### Splash Screen

Splash screen should have a logo of GRAPH app, version numbers, and copyright notice.

Single "Continue" button (class "`close`").

[Back to top](#page-layout-markup-requirements)

<img width="480" alt="GRAPH logo" src="https://github.com/user-attachments/assets/259d5bbd-d8ad-497c-b417-14940e78e246" />
