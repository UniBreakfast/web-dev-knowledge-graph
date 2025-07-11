# UI Design Guidelines: GRAPH Application

## Guiding Philosophy

The visual design of the GRAPH application is guided by principles of **minimalism, clarity, and functionality**. The interface should be clean and unobtrusive, prioritizing content and user interaction over decoration. It employs a light, monochrome color scheme with subtle, purpose-driven color accents. The overall aesthetic is sharp, textual, and information-dense, avoiding heavy visual elements like shadows, gradients, or complex animations.

## 1. Color Palette

The palette is built on a foundation of neutral grays, ensuring a calm and focused environment. Color is used sparingly and intentionally to communicate state, signal actions, and provide semantic meaning.

#### **Primary Palette (Grays)**

| Name                | Hex       | Usage                                                        |
| ------------------- | --------- | ------------------------------------------------------------ |
| **Page Background** | `#F4F5F7` | The main background color for the entire page (`<body>`).      |
| **Panel Background**| `#FFFFFF` | The background for primary content areas like the Article and Aside panels, and Dialogs. |
| **Primary Text**    | `#2D3748` | The default color for all body text, headings, and labels. Provides high contrast without being harsh black. |
| **Secondary Text**  | `#718096` | For less important text, such as descriptions and helper text. |
| **Border / Divider**| `#E2E8F0` | For all borders on panels, inputs, and dividers. Subtle and clean. |
| **Subtle Hover**    | `#F7FAFC` | A very light background color for list items on hover.         |

#### **Accent & Semantic Colors**

| Name                        | Hex       | Usage                                                              |
| --------------------------- | --------- | ------------------------------------------------------------------ |
| **Interaction (Primary)**   | `#3182CE` | For primary buttons, links, focused inputs, and selected states.   |
| **Destructive (Danger)**    | `#E53E3E` | For buttons and actions related to deletion.                       |
| **Link: Outgoing**          | `#3182CE` | Arrow color for outgoing links (matches the primary interaction color). |
| **Link: Incoming**          | `#38A169` | Arrow color for incoming links.                                    |
| **Link: Two-Way**           | `#805AD5` | Arrow color for two-way links.                                     |

## 2. Typography

Typography is consistent and legible, using a single font family to create a unified experience.

*   **Font Family:** `Trebuchet MS`, `-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `Roboto`, `Helvetica`, `Arial`, `sans-serif`
*   **Base Font Size:** `18px` (for all body copy and descriptions)
*   **Base Line Height:** `1.6`

#### **Typographic Scale**

| Element         | Font Size | Font Weight | Usage                               |
| --------------- | --------- | ----------- | ----------------------------------- |
| **Heading 1**   | `28px`    | `700` (Bold)  | Main dialog titles (`<H1>`).          |
| **Heading 2**   | `24px`    | `700` (Bold)  | Panel titles, Node Name in Focused View. |
| **Heading 3**   | `20px`    | `600` (Semi-Bold) | List item headings (e.g., in Aside). |
| **Body Text**   | `18px`    | `400` (Regular) | All primary content and descriptions. |
| **Button / Label** | `16px`    | `600` (Semi-Bold) | Text on all buttons and small labels. |

## 3. Layout & Spacing

Spacing is consistent and modest to maintain a clean, organized layout without feeling sparse.

*   **Base Spacing Unit:** `8px`
*   **Margins & Padding:** Use multiples of the base unit (`4px`, `8px`, `12px`, `16px`, `24px`).
*   **Borders:** `1px solid var(--color-border)` for all components.
*   **Rounding:** A minimal `border-radius` of `4px` should be used on buttons, inputs, and dialogs.

## 4. Component Styling

#### **Buttons**

*   **Primary:** Solid background (`--color-interaction`), white text.
*   **Secondary / Cancel:** Transparent background, text color matching `--color-interaction`, and a `1px` border of the same color. On hover, the background fills with a very light tint of the interaction color.
*   **Destructive:** Solid background (`--color-destructive`), white text.
*   **State:** On hover, buttons should lighten or darken slightly. A subtle, inset `box-shadow` is used for the `:active` state.

#### **Forms & Inputs**

*   **Inputs / Textareas:** White background, `1px` border (`--color-border`), `4px` radius.
*   **Focus State:** The border color should change to `--color-interaction`. A subtle, glowing `box-shadow` (e.g., `0 0 0 3px rgba(49, 130, 206, 0.2)`) should be used for a clear and accessible focus indicator, which is an exception to the "no shadows" rule as it is functional, not decorative.
*   **Datalist:** Standard browser styling is acceptable.

#### **Dialogs**

*   **Backdrop:** The backdrop should use a semi-transparent fog tint and a subtle blur.
    *   `background-color: rgba(244, 245, 247, 0.5)`
    *   `backdrop-filter: blur(4px)`
*   **Container:** The dialog itself will have a white background (`--color-panel-background`), a `1px` border, and a `4px` radius.

#### **Link Direction Indicators**

Indicators are textual and colored for semantic meaning, implemented with `::before` pseudo-elements.

*   **Outgoing:** `→` (color: `--color-link-outgoing`)
*   **Incoming:** `←` (color: `--color-link-incoming`)
*   **Two-Way:** `⇄` (color: `--color-link-two-way`)
*   **Swap:** `⇅` 

## 5. Interactivity & Motion

*   **Transitions:** All state changes (e.g., hover) should use a subtle and quick `transition`.
    *   `transition: all 150ms ease-in-out;`
*   **Animations:** No decorative animations should be used.

## 6. Iconography

The UI is predominantly text-based. Icons should be avoided on desktop views. If absolutely necessary for narrow mobile viewports, a lightweight, clean, and consistent line-icon set should be chosen. The link direction arrows (`→`, `←`, `⇄`, `⇅`) are considered typographic characters, not icons.
