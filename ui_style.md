# UI Style Guide: Cine Tracker (Gumroad Inspired)

This document outlines the Design Tokens, Component States, and Interactivity rules for the **Cine Tracker** project. The aesthetic is heavily inspired by **Gumroad**: neo-brutalist, high-contrast, playful yet highly functional, and extremely accessible.

## 🎨 Design Philosophy & Aesthetics

The design uses a **Neo-brutalist** approach:
- **High Contrast:** Pure black and white foundations with striking accent colors.
- **Bold Geometry:** Thick borders and hard shadows that create strong affordances.
- **Micro-interactions:** Elements should feel tactile. Pressing a button should physically push it into its shadow.
- **Information Density:** Clear, bold typography to separate content areas without relying on subtle gray background shades.

---

## 🧬 Design Tokens (CSS Variables)

### 1. Color Palette (Light Mode Default)
We avoid subtle grays. Colors are stark, vibrant, and accessible.

```css
:root {
  /* Core Foundation */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F4F4F0; /* Slight off-white for depth */
  --color-text-main: #000000;
  --color-border: #000000;
  
  /* Vibrant Accents */
  --color-accent-pink: #FF90E8;
  --color-accent-yellow: #FFF083;
  --color-accent-teal: #23A094;
  --color-accent-red: #F24E1E;

  /* State Colors */
  --color-success: #23A094;
  --color-error: #F24E1E;
}
```

### 2. Typography
A strong sans-serif font ensures readability and fits the brutalist vibe.

```css
:root {
  --font-family-base: 'Inter', system-ui, sans-serif;
  --font-family-mono: 'Courier New', monospace; /* For tags or meta-info */
  
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2.5rem;
  
  --font-weight-regular: 400;
  --font-weight-bold: 700;
  --font-weight-black: 900;
}
```

### 3. Borders & Shadows
This is the core of the Gumroad aesthetic: hard, unapologetic borders and unblurred shadows.

```css
:root {
  /* Thick borders are key */
  --border-width-base: 2px;
  --border-width-thick: 4px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-round: 9999px;

  /* Hard shadows - No blur! */
  --shadow-hard-sm: 2px 2px 0px var(--color-border);
  --shadow-hard-md: 4px 4px 0px var(--color-border);
  --shadow-hard-lg: 8px 8px 0px var(--color-border);
}
```

---

## 🧩 Core Components (Atomic Level)

### Buttons
Buttons must feel highly tactile and unmissable.

- **Base State:** 
  - Background: `var(--color-accent-pink)` (or other accents).
  - Border: `2px solid var(--color-border)`.
  - Border Radius: `var(--radius-md)`.
  - Box Shadow: `var(--shadow-hard-md)`.
  - Font Weight: `var(--font-weight-bold)`.

- **Hover State:**
  - Action: Translate slightly up and left (e.g., `transform: translate(-1px, -1px)`).
  - Shadow: Increase to `var(--shadow-hard-lg)`.
  - Transition: `150ms cubic-bezier(0.4, 0, 0.2, 1)`.

- **Active (Pressed) State:**
  - Action: The button pushes *into* the shadow.
  - Transform: `translate(4px, 4px)`.
  - Box Shadow: `0px 0px 0px var(--color-border)` (Shadow disappears to simulate a physical button press).

### Cards (Movie Items)
- **Container:** White background, thick black border.
- **Shadow:** Hard shadow (`var(--shadow-hard-md)`).
- **Hover:** Slight tilt or increase in shadow to indicate it's clickable.
- **Content:** Bold title, stark divider line between image and content.

---

## ⚙️ Accessibility & Usability

1. **Contrast Compliance (WCAG 2.1+):** 
   - Black text on bright accents (Yellow, Pink, Teal) passes WCAG AAA standards easily.
   - Solid black outlines ensure interactive elements are visible to visually impaired users and stand out in high-contrast modes.
2. **Keyboard Navigation:** 
   - Focus rings must be unmissable. Use a thick `3px dashed #000` or a contrasting bright color for the `:focus-visible` state.
3. **Cognitive Load:**
   - The UI uses color functionally. E.g., Pink for primary actions, Yellow for secondary, and Teal for confirmations.
