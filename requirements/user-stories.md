# User stories

  -  [Initial Splash Screen on first visit](#initial-splash-screen-on-first-visit)
  -  [Subsequent Visits](#subsequent-visits)
  -  [Initial view of all premade nodes and links](#initial-view-of-all-premade-nodes-and-links)
  -  [Specific node view](#specific-node-view)
  -  [Specific link view](#specific-link-view)
  -  [Main page without any nodes](#main-page-without-any-nodes)
  -  [Right panel without any links](#right-panel-without-any-links)
  -  [Query for nodes from the header](#query-for-nodes-from-the-header)
  -  [New node addition](#new-node-addition)
  -  [Name is required in New Node dialog](#name-is-required-in-new-node-dialog)
  -  [New Node dialog can be closed](#new-node-dialog-can-be-closed)
  -  [New Node dialog with name pre-filled](#new-node-dialog-with-name-pre-filled)
  -  [New node name pre-filling only if it doesn't exist](#new-node-name-pre-filling-only-if-it-doesnt-exist)
  -  [New node with non-unique name](#new-node-with-non-unique-name)
  -  [Existing node editing](#existing-node-editing)
  -  [Edit Node dialog can be closed](#edit-node-dialog-can-be-closed)
  -  [Change name to a non-unique name](#change-name-to-a-non-unique-name)
  -  [New link addition](#new-link-addition)

## Initial Splash Screen on first visit
   
Steps:

  1. User opens the GRAPH application page in a browser for the first time. 
  2. User sees the splash screen with GRAPH app logo, version numbers, and copyright notice.
  3. User clicks the "Continue" button below.
  4. Splash screen is closed and the user sees the main page of the application.
   
[Back to top](#user-stories)

## Subsequent Visits

Steps:

  1. User opens the GRAPH application page in a browser after previous visit.
  2. User sees the main page of the application.
  3. User actively wants to see that splash screen again.
  4. User clicks the "Menu" button in the top right corner.
  5. Menu dialog is opened. There's an "About" button.
  6. User clicks the "About" button.
  7. Splash screen is opened.
   
[Back to top](#user-stories)

## Initial view of all premade nodes and links

Steps:

  1. User gets to the main page of the application before changing the app state in any way.
  2. App presents the list of all premade example nodes in the left panel.
  3. App presents the list of all premade example links in the right panel.
   
[Back to top](#user-stories)

## Specific node view

Steps:

  1. User gets to the main page of the application.
  2. There's a list of all nodes and links in the graph.
  3. User wants to view a specific node and/or work with it or its links.
  4. User clicks the "Go to Node" button next to the specific node.
  5. That node becomes "current".
  6. Left panel now shows that node name, description and list of names of nodes having links to and from it.
  7. There's also a stack of buttons at the right side of the left panel with "Edit Node", "Delete Node" and "Add Link" buttons.
  8. If list of linked nodes is not empty, a random one of them becomes "selected".
  9. Right panel now shows the list of link(s) to/from the selected node from/to the current node.
   
[Back to top](#user-stories)

## Node removal

Steps:

  1. User gets to the main page presenting a specific node.
  2. Left panel now shows that node name and description with "Delete Node" button on the right.
  3. User clicks the "Delete Node" button.
  4. Delete node dialog is opened with warning about the non-recoverable deletion of the node and all of its links.
  5. User clicks the "Cancel" button.
  6. Delete node dialog is closed without deleting the node.
  7. User clicks the "Delete Node" button again.
  8. Delete node dialog is opened with the same warning.
  9. User clicks the "Delete" button.
  10. That node and all of its links are deleted from the graph structure.
  11. Page now shows the list of all remaining nodes and links.
   
[Back to top](#user-stories)

## Main page without any nodes

Steps:

  1. User gets to the main page of the application after removing all nodes.
  2. Instead of node list in the left panel, there's a message telling that there are no nodes and suggesting to add some.
  3. Instead of link list in the right panel, there's a short message telling that there are no links.
   
[Back to top](#user-stories)

## Right panel without any links

Steps:

  1. User gets to the main page presenting a specific node before adding any links or after removing all its links.
  2. Instead of list of names of linked nodes below the node description, there's a message telling that there are no linked nodes.
  3. Instead of link list in the right panel, there's a message telling that there are no links and suggesting to add some.
   
[Back to top](#user-stories)

## Query for nodes from the header

Steps:

  1. User gets to the main page of the application.
  2. Premade nodes are still there or other nodes with "a" in their names are present.
  3. There's a search input in the top left corner.
  4. User types "A" in the search input.
  5. Search dropdown shows a list of node names that have "A" or "a" in their names.
  6. As user inputs more characters, the dropdowns list is filtered.
  7. User may select a node name from the list.
  8. User makes input value the exact name of a node by typing, pasting or selecting it from the list.
  9. As soon as that happen the node with that name becomes "current".
  10. Left panel now shows that node name, description and list of names of nodes having links to and from it.
  11. Change of input value to something other than a node name doesn't change the current node. 
   
[Back to top](#user-stories)

## New node addition

Steps:

  1. User gets to the main page of the application.
  2. User clicks the "Add Node" button in the header.
  3. New Node dialog is opened.
  4. User enters a name for the new node.
  5. User optionally enters a description for the new node.
  6. User clicks the "Add" button.
  7. That node is added to the graph structure.
  8. New Node dialog is closed.
  9. New node becomes "current".
  10. Left panel now shows that node name and description, if any was entered.
   
[Back to top](#user-stories)

## Name is required in New Node dialog

Steps:

  1. User gets to the New Node dialog.
  2. Name input is empty.
  3. User clicks the "Add" button.
  4. Notification is shown that the name is required.
   
[Back to top](#user-stories)

## New Node dialog can be closed

Steps:

  1. User gets to the New Node dialog.
  2. User enters a name for the new node and optionally a description.
  3. User clicks the "Cancel" button.
  4. New Node dialog is closed without adding a new node.
  5. Left and right panels are still showing what was there before.
   
[Back to top](#user-stories)

## New Node dialog with name pre-filled

Steps:

  1. User gets to the main page of the application.
  2. User inputs a name for the node in the search input in the header.
  3. There's no node with that name.
  4. User clicks the "Add Node" button in the header.
  5. New Node dialog is opened.
  6. Name input is pre-filled with the value of the search input.
   
[Back to top](#user-stories)

## New node name pre-filling only if it doesn't exist

Steps:

  1. User gets to the main page of the application.
  2. User inputs a name for the node in the search input in the header.
  3. There's a node with that name.
  4. That node becomes "current".
  5. Left panel now shows that node name, description and list of names of linked nodes, if any.
  6. User clicks the "Add Node" button in the header.
  7. New Node dialog is opened.
  8. Name input is empty because there's already a node with that name.
   
[Back to top](#user-stories)

## New node with non-unique name

Steps:

  1. User gets to the New Node dialog.
  2. User enters a name for the new node.
  3. There's already a node with that name.
  4. User clicks the "Add" button.
  5. Informer dialog is opened.
  6. Dialog is titled "Node already exists".
  7. There's a message that only nodes with unique names can be added.
  8. User clicks the "OK" button.
  9. Informer dialog is closed.
  10. User can change the name in the input and try again.
   
[Back to top](#user-stories)

## Existing node editing

Steps:

  1. User gets to the main page of the application.
  2. User goes to a specific node by any means.
  3. There's an "Edit Node" button in the left panel on the right side.
  4. User clicks the "Edit Node" button.
  5. Edit Node dialog is opened.
  6. Current node name and possibly description are pre-filled in the Edit Node form fields. 
  7. User changes the name and/or adds/edits/removes the description.
  8. User clicks the "Save" button.
  9. Current node is updated.
  10. Edit Node dialog is closed.
  11. Left panel now shows that node updated name and description, if any was entered.
   
[Back to top](#user-stories)

## Name is required in Edit Node dialog

Steps:

  1. User gets to the Edit Node dialog.
  2. User removes the name from the input.
  3. User clicks the "Save" button.
  4. Notification is shown that the name is required.
   
[Back to top](#user-stories)

## Edit Node dialog can be closed

Steps:

  1. User gets to the Edit Node dialog.
  2. User changes the name and/or the description.
  3. User clicks the "Cancel" button.
  4. Edit Node dialog is closed without updating the node.
  5. Left panel shows the unchanged name and possibly description of the current node.
   
[Back to top](#user-stories)

## Change name to a non-unique name

Steps:

  1. User gets to the Edit Node dialog.
  2. User changes the current node name to a name of another existing node.
  3. User clicks the "Save" button.
  4. Informer dialog is opened.
  5. Dialog is titled "Node name is occupied".
  6. There's a message that only nodes with unique names can exist in the graph.
  7. User clicks the "OK" button.
  8. Informer dialog is closed.
  9. User can change the name to a unique one and try again or close the dialog.
   
[Back to top](#user-stories)

## New link addition

Steps:

  1. User gets to the main page of the application.
  2. User goes to a specific node by any means.
  3. There's an "Add Link" button in the left panel on the right side.
  4. User clicks the "Add Link" button.
  5. New Link dialog is opened.
  6. Current node name is pre-filled in the From-node name input.
  7. User changes the To-node name.
  8. Names of existing nodes are suggested in the To-node name input.
  9. User chooses or inputs manually the name of the To-node.
  10. User optionally adds a description for the new link.
  11. User clicks the "Add" button.
  12. New link is added.
  13. New Link dialog is closed.
  14. Left panel now shows the selected To-node name in the list of linked nodes below the current node description.
  15. It is selected with a clear visual indication.
  16. Right panel now shows the list of link(s) to/from the selected node from/to the current node. 
   
[Back to top](#user-stories)

##

Steps:

  1. 
   
[Back to top](#user-stories)

##

Steps:

  1. 
   
[Back to top](#user-stories)

##

Steps:

  1. 
   
[Back to top](#user-stories)

##

Steps:

  1. 
   
[Back to top](#user-stories)

##

Steps:

  1. 
   
[Back to top](#user-stories)

##

Steps:

  1. 
   
[Back to top](#user-stories)

##

Steps:

  1. 
   
[Back to top](#user-stories)
