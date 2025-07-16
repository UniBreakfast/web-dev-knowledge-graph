[Back to README](..)

# High-Level Requirements Document

[Brief description is here](brief)

### Document Purpose
This document provides a consolidated, high-level overview of the GRAPH web application. It is intended to define the project's vision, core concepts, key features, and functional requirements. It serves as a bridge between the strategic project goals and the detailed, module-specific implementation requirements.

- [1. Project Vision & Goals](#1-project-vision--goals)
  - [1.1. Vision Statement](#11-vision-statement)
  - [1.2. Primary Problem](#12-primary-problem)
  - [1.3. Target Audience](#13-target-audience)
  - [1.4. Core Goals](#14-core-goals)
- [2. Core Concepts](#2-core-concepts)
  - [2.1. Node](#21-node)
  - [2.2. Link](#22-link)  
- [3. Functional Requirements](#3-key-features--functional-areas)
  - [3.1. Graph Visualization & Navigation](#31-graph-visualization--navigation)
  - [3.2. Node & Link Manipulation (CRUD)](#32-node--link-manipulation-crud)
  - [3.3. Search & Discovery](#33-search--discovery)
  - [3.4. Data Management](#34-data-management)
- [4. Non-Functional Requirements](#4-non-functional-requirements)

[Back to top](#high-level-requirements-document)

## 1. Project Vision & Goals

### 1.1. Vision Statement
To provide a highly interactive and persistent web-based tool for users to create, visualize, manage, and analyze directed knowledge graphs.

[Back to top](#high-level-requirements-document)

### 1.2. Primary Problem
Individuals and teams often struggle to manage and understand complex systems of interconnected information, such as software architectures, learning topics, or project dependencies. Traditional linear notes or spreadsheets fail to capture the rich, non-linear relationships between concepts. GRAPH aims to solve this by providing a fluid, visual, and graph-based interface for knowledge management.

[Back to top](#high-level-requirements-document)

### 1.3. Target Audience
This application is designed for technically-minded users who need to map and analyze complex systems, including:
*   Developers and software architects.
*   Researchers and students.
*   Technical writers and system analysts.
*   Anyone who benefits from visual, non-linear note-taking and system mapping.

[Back to top](#high-level-requirements-document)

### 1.4. Core Goals
*   **Interactivity:** Ensure a fluid and responsive user experience where all user actions provide immediate visual feedback.
*   **Persistence:** Automatically save the user's graph data locally in the browser, ensuring their work is preserved between sessions.
*   **Data Portability:** Allow users to easily export their graph for backup or use in other systems, and import existing graph data.
*   **Structural Analysis:** Provide tools to help users understand the structure and completeness of their graph.

[Back to top](#high-level-requirements-document)

## 2. Core Concepts

The application is built around two fundamental entities: **Nodes** and **Links**.

### 2.1. Node

A **Node** represents a single concept, entity, or piece of information.

*   Every Node must have a **unique name** that identifies it within the graph.
*   A Node can have an optional, longer **description** for detailed information.

[Back to top](#high-level-requirements-document)

### 2.2. Link

A **Link** represents a directed, one-way relationship from a "from" Node to a "to" Node.

*   A Link connects two distinct, existing Nodes.
*   A maximum of one Link is permitted in the same direction between any two Nodes (e.g., from Node A to Node B). A second, separate Link can exist in the opposite direction (from Node B to Node A).
*   A Link can have an optional **description** to explain the nature of the relationship.

[Back to top](#high-level-requirements-document)

## 3. Key Features & Functional Areas

### 3.1. Graph Visualization & Navigation

The application provides two primary views for interacting with the graph:

*   **Global View ("Show All"):** This is the default initial view.
    *   The left panel displays a list of all Nodes in the graph.
    *   The right panel displays a list of all Links in the graph.
    *   This view allows the user to get a complete overview of the graph's contents.

*   **Focused View ("Single Node"):** This view is activated when a user selects a specific Node to inspect.
    *   The selected Node becomes the "current" node, and its details (name, description, and action buttons) are displayed in the left panel.
    *   Below the description, a list of all directly connected Nodes is shown, with arrows indicating the direction of the links (incoming, outgoing, or two-way).
    *   The right panel displays detailed information about the links between the "current" node and a "selected" linked node.
    *   Users can navigate the graph by clicking "Go to Node" buttons or by clicking on linked nodes to make them the new "current" node.

[Back to top](#high-level-requirements-document)

### 3.2. Node & Link Manipulation (CRUD)

All create, update, and delete operations are handled through modal dialogs to provide a consistent user experience.

*   **Creating Nodes & Links:**
    *   Users can add a new Node via the "Add Node" dialog, providing a required unique name and an optional description.
    *   Users can create a new Link between two existing Nodes via the "New Link" dialog.

*   **Editing Nodes & Links:**
    *   Users can edit an existing Node's name or description through the "Edit Node" dialog.
    *   Users can edit a Link's source/destination nodes or its description through the "Edit Link" dialog.

*   **Deleting Nodes & Links:**
    *   Users can delete a Node through a confirmation dialog. Deleting a Node will also automatically delete all Links connected to it.
    *   Users can delete a specific Link through a confirmation dialog without affecting the connected Nodes.

[Back to top](#high-level-requirements-document)

### 3.3. Search & Discovery

The application provides multiple tools to help users find and analyze information within their graph.

*   **Header Search:** A prominent search bar in the header allows users to quickly find and jump to a Node by typing its name.
*   **Menu-Driven Discovery:** A central "Menu" dialog offers powerful discovery and analysis functions, including:
    *   Finding all Nodes or Links that are missing descriptions.
    *   Finding the "least linked" or "most linked" Nodes.
    *   Jumping to a random Node or Link to encourage exploration.
    *   Accessing application stats and the "About" screen.

[Back to top](#high-level-requirements-document)

### 3.4. Data Management

*   **First-Time Use:** On a user's first visit, the application loads a pre-made example graph to demonstrate its functionality and presents a splash screen.
*   **Local Persistence:** On subsequent visits, the application loads the user's last-saved graph state from the browser's `localStorage`. All changes are saved automatically.
*   **Import/Export:** Users can export the entire graph structure to a JSON file and import a valid graph JSON file to overwrite the current state. The application validates imported data to ensure its integrity.

[Back to top](#high-level-requirements-document)

## 4. Non-Functional Requirements

*   **Layout:** The interface consists of a fixed header, a main content area split vertically into two panels (for Node and Link information), and a system of modal dialogs for user actions. The layout is responsive and adapts to smaller screen sizes.
*   **Performance:** The application must be highly responsive. The event-driven architecture is designed to ensure that UI updates happen immediately in response to user actions or data changes, without page reloads.
*   **Data Integrity:** The application enforces strict rules to maintain a valid graph state, such as ensuring Node name uniqueness and preventing the creation of invalid Links.
*   **Usability:** The interface uses clear, conventional UI patterns (buttons, forms, dialogs). Informative dialogs guide the user and prevent common errors, such as creating a node with a duplicate name.

[Back to top](#high-level-requirements-document)

<img width="480" alt="GRAPH logo" src="https://github.com/user-attachments/assets/259d5bbd-d8ad-497c-b417-14940e78e246" />
