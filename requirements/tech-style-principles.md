[Back to README](..)

# Tech Stack, Code Style & Development Principles

### Document Purpose
This document outlines the technical foundation, coding conventions, and guiding principles for the GRAPH application. Its purpose is to ensure consistency, maintainability, and alignment with the project's core philosophy of creating a lightweight, robust, and dependency-free tool that runs directly in the browser without any build steps.

- [1. Technology Stack](#1-technology-stack)
  - [1.1. Core Languages](#11-core-languages)
  - [1.2. Architecture](#12-architecture)
  - [1.3. Frameworks & Libraries](#13-frameworks--libraries)
  - [1.4. Styling](#14-styling)
  - [1.5. Development & Deployment](#15-development--deployment)
- [2. Code Style & Conventions](#2-code-style--conventions)
  - [2.1. JavaScript](#21-javascript)
  - [2.2. HTML](#22-html)
  - [2.3. CSS](#23-css)
  - [2.4. File Naming](#24-file-naming)
- [3. Development Principles](#3-development-principles)
  - [3.1. What You Write Is What You Run](#31-what-you-write-is-what-you-run)
  - [3.2. Strict Modularity & Isolation](#32-strict-modularity--isolation)
  - [3.3. Centralized Orchestration](#33-centralized-orchestration)
  - [3.4. Stateless Data Module](#34-stateless-data-module)
  - [3.5. Code Decomposition](#35-code-decomposition)

[Back to top](#tech-stack-code-style--development-principles)

## 1. Technology Stack

### 1.1. Core Languages
*   **HTML5:** We use modern, semantic HTML5 elements to structure the application.
*   **CSS3:** Styling is achieved with modern CSS3, leveraging features like CSS Custom Properties (Variables) and native nesting.
*   **JavaScript (ES6+):** The application logic is written in modern, vanilla JavaScript.

### 1.2. Architecture
*   **Module Pattern:** The application is architected as a set of decoupled modules (`graphus`, `nodus`, etc.). Each module is a plain object instance of the native `EventTarget`, created by assigning methods to it (e.g., via `Object.assign`).
*   **Event-Driven Communication:** Modules communicate in a strictly unidirectional manner. The component modules (`...us` files) *only* dispatch custom events. `app.js` is the *only* module that listens to these events and orchestrates the application's response.
*   **Client-Side Only:** The application runs entirely in the user's browser with no server-side component.
*   **Local Persistence:** The entire graph state is persisted between sessions in the browser's `localStorage`.

### 1.3. Frameworks & Libraries
*   **None.** The project intentionally avoids all external frameworks (like React, Vue, Angular) and utility libraries (like jQuery, Lodash).

### 1.4. Styling
*   **Modular CSS:** To maintain a clear separation of concerns, our CSS is organized into files that mirror the JavaScript modules. Each module (e.g., `headus.js`) has a corresponding CSS file (`headus.css`) that styles its specific DOM elements.
*   **Native Nesting:** We leverage modern native CSS features, including the native nesting syntax, to co-locate related styles and improve readability without requiring a preprocessor.
*   **CSS Variables:** We use CSS Custom Properties for theming (colors, fonts, spacing) to ensure consistency and easy maintenance, as outlined in the [UI Guidelines](ui-guidelines).
*   **CSS-Driven Presentation:** UI state changes (e.g., toggling between "show one" and "show many" views) are managed through CSS selectors targeting the state of hidden radio buttons or checkboxes. This is a deliberate technique to separate presentational logic from JavaScript.

### 1.5. Development & Deployment
*   **No Build Tools:** The project requires no `npm`, bundlers (Webpack, Vite), or transpilers (Babel). The code is written to run directly in the browser.
*   **Development:** Use a live-server extension provided by your IDE (e.g., for VS Code) for local development.
*   **Formatting:** The IDE's built-in code formatter is sufficient. No external linters or formatters like ESLint or Prettier are required.
*   **Deployment:** The application can be deployed directly to any static hosting service, such as GitHub Pages.

[Back to top](#tech-stack-code-style--development-principles)

## 2. Code Style & Conventions

### 2.1. JavaScript
*   **Functions:** Use classic function declarations (`function doSomething() {}`) for top-level and exported functions. Arrow functions are acceptable for short, anonymous callbacks passed as arguments.
*   **Function Length:** Functions should ideally be no longer than 33 lines. This is a guideline, and exceptions can be made for functions with simple, repetitive logic (e.g., a `switch` statement).
*   **Naming:** Use `camelCase` for all functions and variables.
*   **Variables:** Use `const` by default. Use `let` only for variables that must be reassigned. Avoid `var`.

### 2.2. HTML
*   **Semantics:** Always use the most semantic HTML element for the job.
*   **Accessibility:** Ensure interactive elements are accessible and keyboard-navigable.

### 2.3. CSS
*   **Selectors:** Use `id` attributes for selecting the top-level element of each module and for other unique elements within them. Use classes only where necessary for styling multiple, non-unique elements (e.g., link direction indicators). This approach keeps selectors simple and direct.

### 2.4. File Naming
*   All filenames should be lowercase and use hyphens to separate words (e.g., `app-level.md`, `dialogus.js`, `headus.css`).

[Back to top](#tech-stack-code-style--development-principles)

## 3. Development Principles

### 3.1. What You Write Is What You Run
This is our most important principle. The project avoids all forms of compilation, transpilation, bundling, and minification. The raw HTML, CSS, and JavaScript files in the repository are the exact same files that run in the user's browser. This guarantees simplicity, transparency, and zero-dependency development.

### 3.2. Strict Modularity & Isolation
The component modules (`graphus`, `nodus`, etc.) are completely isolated.
*   They **do not** call methods on any other module.
*   They **do not** listen for events from any other module.
*   They **only** know how to manage their designated part of the DOM and how to dispatch events based on user interaction within that part.

### 3.3. Centralized Orchestration
`app.js` acts as the central "controller" or "mediator."
*   It is the **only** module that calls methods on the component modules.
*   It is the **only** module that listens for the custom events dispatched by the component modules.
*   It contains all the "wiring" logic that connects the application together. For example, when `app.js` hears an `editnodetrigger` event from `nodus`, it calls `graphus.getNodeById()` to get data, then calls `dialogus.open()` to show the form.
*   `app.js` **does not** dispatch any events.

### 3.4. Stateless Data Module
The `graphus` module is the single source of truth for the graph structure, but it is stateless between function calls. It does not hold the graph in a private variable. On every call, a `graphus` method reads the required data from `localStorage`, processes it, and writes back to `localStorage` if a change occurred.

### 3.5. Code Decomposition
Developers are encouraged to create additional private helper functions within a module to break down complex logic and adhere to the function length guideline. These helper functions should not be documented in the public-facing requirements but serve to improve the maintainability and readability of the code.

[Back to top](#tech-stack-code-style--development-principles)

<img width="480" alt="GRAPH logo" src="https://github.com/user-attachments/assets/259d5bbd-d8ad-497c-b417-14940e78e246" />
