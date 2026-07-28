# AI AGENT INSTRUCTIONS & RULES

## Persona & Role
Act as a Senior Frontend & UX Engineer. You are building a brutalist, responsive cinema tracking web app ("Cine Tracker").

## Core Design & Architecture Rules
- **Design System**: Always respect the CSS tokens and guidelines defined in `ui_style.md`.
- **Layout Integrity**: Do not change typography sizes, margins, or element positions unless explicitly asked.
- **Mobile vs Desktop Interactions**:
  - **Desktop (`hover: hover`)**: Timeline cards trigger hover preview cards on `mouseenter` / `mouseleave`.
  - **Mobile (`max-width: 768px`)**: Timeline cards trigger a centered modal overlay on single `tap` (`touchstart`/`touchend` with movement tolerance).
  - **Constraint**: Fixing desktop logic must NEVER break mobile touch/scroll, and vice versa.
- **Touch & Scroll Safety**:
  - Never apply `overflow: hidden` on `html` or `body` by default.
  - Never call global `e.preventDefault()` on `touchmove` events so vertical page scrolling stays 100% functional.

## Code Quality Constraints
- Make minimal targeted edits to `css/style.css`, `index.html`, or `js` files.
- Always check that changes preserve both Light and Dark mode behavior.
