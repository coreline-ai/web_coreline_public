# Coreline Design System Guide

This document serves as the canonical reference for the **Coreline** design language. It is designed to allow developers and designers to replicate the project's distinct "Neo-Brutalist" and "High-Contrast" aesthetic without guessing.

---

## 1. Design Philosophy
**"Bold, Direct, Premium."**

The Coreline design system is built on **Neo-Brutalism**. It rejects subtle shadows and gradients in favor of:
*   **High Contrast**: Pure Black (`#000000`) and White (`#FFFFFF`).
*   **Hard Edges & Borders**: Thick, distinct 2px borders.
*   **Hard Shadows**: Solid, offset shadows (no blur).
*   **Micro-Interactions**: Tactile feel using translation and shadow changes.

---

## 2. Global Tokens

### 2.1 Colors
The palette is intentionally limited to maximize impact.

| Token Name | Hex Value | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Black** | `#000000` | `bg-black`, `text-black` | Main backgrounds, text, borders. |
| **Primary White** | `#FFFFFF` | `bg-white`, `text-white` | Card backgrounds, text in dark mode. |
| **Accent Yellow** | `#FFD600` | `bg-[#FFD600]` | Branding, primary actions, highlights. |
| **Error Red** | `#EF4444` | `bg-red-500` | Error states, notification badges. |

### 2.2 Typography
We use a dual-font stack for modern, geometric clarity.

*   **English/Numbers**: `Plus Jakarta Sans`
    *   Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold).
*   **Korean**: `Noto Sans KR`
    *   Weights: 300-900.

**CSS Variable Usage:**
```css
font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;
```

---

## 3. UI Utilities & Effects

### 3.1 Neo-Shadows (Hard Shadows)
Shadows must be **solid** (no blur) and pure black.

| Class Name | CSS Spec | Usage |
| :--- | :--- | :--- |
| `.neo-shadow` | `6px 6px 0px 0px #000` | Standard cards, containers. |
| `.neo-shadow-sm` | `3px 3px 0px 0px #000` | Smaller elements, dropdowns. |
| `.neo-shadow-lg` | `10px 10px 0px 0px #000` | Hero sections, modals. |

### 3.2 Interactions (Tactile Feel)
Elements should feel physical. When clicked or hovered, the "elevation" changes by moving the element and reducing the shadow.

**Standard Button Hover:**
```css
.neo-shadow-hover:hover {
  box-shadow: 2px 2px 0px 0px #000; /* Shadow gets smaller */
  transform: translate(4px, 4px);   /* Element moves "down" */
}
```

**Active State:**
*   **Scale**: `active:scale-95` on standard buttons for a "pressed" effect.

### 3.3 Background Textures
Use dot grids to add technical texture to empty spaces.
```css
.bg-grid {
  background-size: 40px 40px;
  background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
}
```

---

## 4. Component Patterns

### 4.1 Buttons
Buttons define the primary action style.

**Primary Interaction Button:**
*   **Border**: `border-2 border-black`
*   **Background**: `bg-white` (Default) or `bg-black` (Inverse).
*   **Shadow**: `shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`.
*   **Hover**: `hover:translate-x-[1px] hover:translate-y-[1px]` (Subtle movement).

**Example (Tailwind):**
```tsx
<button className="rounded-lg border-2 border-black bg-white px-4 py-2 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:scale-95 active:shadow-none">
  Click Me
</button>
```

### 4.2 Cards / Containers
Containers separate content using heavy borders.

*   **Corner Radius**: `rounded-2xl` or `rounded-lg`.
*   **Border**: `border-4` or `border-2`.
*   **Background**: `bg-white` (Light Mode), `bg-black` (Dark Mode).

### 4.3 Header / Navigation
*   **Sticky**: `fixed top-0`.
*   **Bottom Border**: `border-b-2 border-black`.
*   **Glassmorphism (Dark Mode)**: `dark:bg-black/80 dark:backdrop-blur-md`.

---

## 5. Dark Mode Strategy
The site supports a robust dark mode.

*   **Inversion**: White backgrounds become Black. Black text becomes White.
*   **Borders**: Black borders become translucent White (`border-white/20`).
*   **Accent**: The Yellow (`#FFD600`) remains vibrant and is often used for active states or decorations (`dark:decoration-[#FFD600]`).

**Mapping Table:**
| Light Mode | Dark Mode |
| :--- | :--- |
| `bg-white` | `dark:bg-black` or `dark:bg-transparent` |
| `text-black` | `dark:text-white` |
| `border-black` | `dark:border-white/20` |
| `hover:bg-gray-50` | `dark:hover:bg-white/5` |

---

## 6. Iconography
Use **Material Symbols Outlined**.
*   Size: Typically `20px` to `24px`.
*   Stroke: Scaled to match the font weight (Bold/Black).

---

## 7. Implementation Checklist
When creating a new page or component:
1.  [ ] Apply `border-2 border-black` to structural containers.
2.  [ ] Use `.neo-shadow` classes for depth.
3.  [ ] Ensure hover states include `translate` + shadow reduction.
4.  [ ] Check Dark Mode optimization (especially border visibility).
5.  [ ] Use `Plus Jakarta Sans` for English headings.
