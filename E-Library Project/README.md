# Placid Projects Limited — Digital E-Library Website

This project delivers a responsive three-page marketing site for the fictional Placid Projects Limited digital e-library. It was built as an HTML, CSS, and JavaScript assignment to demonstrate semantic markup, shared styling, and lightweight interactivity without a backend.

## Project Structure

- `index.html` — Home page with hero messaging, featured categories, trending books, metrics, and onboarding steps.
- `about.html` — Story, mission, values, team, and impact narrative for the organisation.
- `contact.html` — Contact form with validation, alternative contact channels, and FAQ preview.
- `styles.css` — Global theme variables, responsive layout, shared components, dark mode skin, and utility classes.
- `script.js` — Navigation toggle, theme persistence, category search filtering, and client-side form validation.

## Key Features

- **Semantic Layout**: Uses meaningful HTML5 elements (`header`, `main`, `section`, `nav`, `footer`, `article`) for accessibility and clarity.
- **Responsive Design**: Flexbox and CSS Grid handle layouts across desktop, tablet, and mobile breakpoints. Navigation collapses into a menu toggle on small screens.
- **Interactive Enhancements**:
  - Dark mode toggle persists the user's theme preference with `localStorage`.
  - Home page search input filters popular categories inline and announces the result count.
  - Contact form validates required fields and email format, shows contextual feedback, and blocks submission without a backend.
- **Consistent Branding**: Shared header, footer, and typography reinforce the platform identity across all pages.
- **Accessible Considerations**: Focus states, ARIA attributes, high-contrast palette, readable line lengths, and screen-reader only text aid usability.

## How to Run

1. Download or clone the project folder.
2. Open `index.html` in any modern browser (no build steps required).
3. Navigate between pages using the site menu; the shared CSS and JS load automatically.

## Optional Extensions Included

- Dark mode with persistence.
- Collapsible mobile navigation.
- Inline category filtering powered by the hero search.

Further enhancements could include hooking the search to a real dataset, adding book previews, or integrating analytics to surface live metrics.

