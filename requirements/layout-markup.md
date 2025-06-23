# Page layout markup requirements

#### This document holds requirements for the `index.html` file

HTML markup (with CSS styling) should produce a page with 4 parts:
1. [Header](#header-requirements) at the top
2. [Article](#article-requirements) on the left
3. [Aside](#aside-requirements) on the right
4. A bunch of [dialogs](#dialogs-requirements) ready to be opened

Article and aside should be grouped together in a main, each one wrapped in a section. With vertical splitter between them, splitting the space 50/50.

[Back to top](#page-layout-markup-requirements)

## [Header requirements](#header-requirements)

Header should have 4 elements (left to right):

1. "Add Node" button
2. Search input
3. GRAPH app title
4. "Menu" button

Search input should take up most of the width, leave some space for the title to take.

If page width is too small, elements should wrap to the next line, but first pair should stay together, as well as the second pair. Also second pair should be at the top in that case.

[Back to top](#page-layout-markup-requirements)

## [Article requirements](#article-requirements)

Normally article should present one node at a time, that node considered "current". There should be a heading with the node name and a description below. Floating to the right there should be a vertical group of three buttons: "Edit Node", "Delete Node" and "Add Link".

Below the description there should be a list of links to other nodes. Each link should be represented by a button (label with hidden radio button) with the node name prefixed with direction (incoming/outgoing/two-way) shown with arrows. Buttons should be placed next to each other, but should wrap to the next line if there is not enough space. They should be aligned to the right.

Alternatively (if no node is currently selected) there should be a vertical list of nodes represented with list items holding a header with the node name, followed by a description. Each node item should have a vertically stacked block floating to the right with a "Go to Node" button and counters for incoming/outgoing links shown with arrows next to the numbers.

[Back to top](#page-layout-markup-requirements)

## [Aside requirements](#aside-requirements)

Normally aside should present a list of all links to and from the current node. Each link should be represented by a list item with a heading with the linked node name (prefixed with direction shown with an arrow), a link description and a vertically stacked button group floating to the right with "Edit Link" and "Delete Link" buttons.

Heading, paragraph and button group should be wrapped in a summary element with details showing the linked node description paragraph if expanded. There also should be a "Go to Node" button floating to the left of that paragraph.

Alternatively (if no node is currently selected) there should be a list of all the links. Each link should be represented by a list item with a heading with "From" node name, an arrow right and "To" node name. There should also be a paragraph with the link description below with a button "Go to Link" floating to the right of that paragraph.

[Back to top](#page-layout-markup-requirements)

## [Dialogs requirements](#dialogs-requirements)

[Back to top](#page-layout-markup-requirements)
