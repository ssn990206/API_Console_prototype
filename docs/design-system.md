# YouCam API Console — Design System

Extracted from: https://yce.perfectcorp.com/api-console/en/
Date: 2026-06-09

---

## 1. Color Tokens

### Brand
| Token | Value | Usage |
|-------|-------|-------|
| `--color-brand` | `#3385ff` | Primary blue — buttons, links, active nav |
| `--color-brand-active` | `#2e78e9` | Hover/pressed state of primary |
| `--color-brand-bg-weak` | `rgba(51,133,255,0.05)` | Light blue tint backgrounds |

### Text
| Token | Value | Usage |
|-------|-------|-------|
| `--color-text-default` | `rgba(9,22,26,0.95)` | Body text, headings |
| `--color-text-secondary` | `rgba(17,24,26,0.65)` | Subtitles, secondary labels |
| `--color-text-weaker` | `rgba(17,24,26,0.45)` | Placeholder, disabled text |
| `--color-text-footer` | `#999999` | Footer/caption text |
| `--color-text-brand` | `#3385ff` | Hyperlinks, branded text |

### Background & Surface
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-page` | `#ffffff` | Page background |
| `--color-bg-sidebar` | `#ffffff` | Sidebar background |
| `--color-bg-card` | `#ffffff` | Card/panel background |
| `--color-bg-overlay` | `rgba(0,0,0,0.5)` | Modal backdrop |
| `--color-bg-fill-weak` | `rgba(17,24,26,0.02)` | Subtle hover states |
| `--color-bg-fill-weaker` | `rgba(17,24,26,0.04)` | Input background |

### Stroke / Border
| Token | Value | Usage |
|-------|-------|-------|
| `--color-border-default` | `rgba(17,24,26,0.1)` | Card borders, dividers |
| `--color-border-sidebar` | `#e5e7eb` | Sidebar right border |
| `--color-border-input` | `rgba(17,24,26,0.2)` | Input, textarea borders |

### Semantic
| Token | Value | Usage |
|-------|-------|-------|
| `--color-success` | `#0acc92` | "Activated" badge, success states |
| `--color-success-bg` | `rgba(10,204,146,0.05)` | Success badge background |
| `--color-error` | `#de0000` | Error text, destructive |
| `--color-error-bg` | `rgba(222,0,0,0.14)` | Error badge background |
| `--color-warning` | `#fec62e` | Warning states |

### Neutrals
| Token | Value | Usage |
|-------|-------|-------|
| `--color-neutral-100` | `rgba(17,24,26,0.10)` | Dividers |
| `--color-neutral-200` | `rgba(17,24,26,0.20)` | Border on inputs |
| `--color-neutral-600` | `#999999` | Secondary icons |
| `--color-neutral-900` | `#12181a` | Near-black text |

---

## 2. Typography

**Font Family:** `Roboto, ui-sans-serif, system-ui, sans-serif`

### Type Scale
| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-h1` | `40px` | `48px` | Page-level headings (desktop) |
| `--text-h2` | `32px` | `40px` | Section headings |
| `--text-h3` | `24px` | `32px` | Card headings |
| `--text-h4` | `20px` | `28px` | Sub-section headings |
| `--text-body-lg` | `18px` | `28px` | Large body |
| `--text-body` | `16px` | `24px` | Default body text |
| `--text-body-sm` | `14px` | `20px` | Table content, labels |
| `--text-caption` | `12px` | `16px` | Captions, helper text |

### Font Weights
| Token | Value |
|-------|-------|
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-bold` | `700` |

---

## 3. Spacing

Based on a 4px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` | Micro gap |
| `--space-2` | `8px` | Inner padding (tight) |
| `--space-3` | `12px` | Inner padding |
| `--space-4` | `16px` | Standard padding |
| `--space-5` | `20px` | Card padding |
| `--space-6` | `24px` | Section padding |
| `--space-8` | `32px` | Large section gap |
| `--space-10` | `40px` | Page section gap |

---

## 4. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | `2px` | Micro elements |
| `--radius-sm` | `8px` | Inputs, small cards |
| `--radius-md` | `16px` | Cards, modals |
| `--radius-lg` | `20px` | Large modals |
| `--radius-pill` | `9999px` | Badges, pill buttons |

---

## 5. Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Cards |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.12)` | Dropdowns, modals |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.16)` | Elevated dialogs |

---

## 6. Layout

### Top Navigation Bar
- Height: `56px`
- Background: `#000` (dark)
- Contains: Logo (YouCam API), nav links, avatar icon
- Nav links: white text, hover underline or color change

### Left Sidebar
- Width: `180px` (expanded), `0px` (collapsed)
- Background: `#fff`
- Right border: `1px solid #e5e7eb`
- Collapse toggle button (chevron icon) at right edge
- Nav items: icon + label, active item has left blue border + blue text
- User section at bottom: avatar circle + name + email

### Content Area
- Left margin: `180px` (sidebar width)
- Padding: `32px 40px`
- Max width: unconstrained
- Top padding accounts for top nav: `56px`

---

## 7. Component Inventory

### 7.1 Button — Primary (Filled)
- Background: `#3385ff`
- Text: `#fff`, `font-weight: 500`
- Border radius: `9999px` (pill)
- Padding: `10px 24px`
- Hover: `#2e78e9`
- Has `+` icon variant (Generate new API Key)

### 7.2 Button — Outline
- Border: `1.5px solid #3385ff`
- Text: `#3385ff`
- Background: `transparent`
- Border radius: `9999px` (pill)
- Padding: `10px 24px`
- Hover: light blue bg tint
- Example: "Learn More"

### 7.3 Button — Secondary / Ghost
- Border: `1px solid rgba(17,24,26,0.2)`
- Text: `rgba(9,22,26,0.95)`
- Background: `transparent`
- Border radius: `8px`
- Padding: `6px 14px`
- Small size used in table Operations column
- Example: "Edit"

### 7.4 Icon Button
- Size: `32px × 32px`
- Background: transparent
- Border: none
- Icon color: `rgba(17,24,26,0.65)`
- Hover: light fill
- Examples: Copy icon, Trash/delete icon

### 7.5 Badge — Status
- Border radius: `9999px` (pill)
- Padding: `3px 10px`
- Font size: `12px`, `font-weight: 500`
- **Activated**: text `#0acc92`, bg `rgba(10,204,146,0.05)`, border `rgba(10,204,146,0.3)`

### 7.6 Chip / Tag
- Border radius: `9999px` (pill)
- Padding: `2px 10px`
- Font size: `12px`
- Border: `1px solid rgba(17,24,26,0.2)`
- Background: `transparent`
- Text: `rgba(9,22,26,0.95)`
- Examples: "Success pipelines", "Failed pipelines"

### 7.7 Data Table
- Header row: `font-size: 14px`, `font-weight: 500`, `color: #999`, border-bottom
- Data rows: `font-size: 14px`, `color: rgba(9,22,26,0.95)`, hover bg `rgba(17,24,26,0.02)`
- Row padding: `14px 16px`
- Column separator: none (only row dividers)
- Full-width, no outer border

### 7.8 Input — Text
- Height: `40px`
- Border: `1px solid rgba(17,24,26,0.2)`
- Border radius: `8px`
- Padding: `8px 12px`
- Font size: `14px`
- Focus: border `#3385ff`, subtle box-shadow
- Placeholder: `#999`

### 7.9 Input — Date Picker
- Same base as text input
- Calendar icon on right side
- Format: `yyyy/mm/dd`

### 7.10 Textarea
- Border: `1px solid rgba(17,24,26,0.2)`
- Border radius: `8px`
- Padding: `10px 12px`
- Resize: vertical
- Placeholder text in `#999`

### 7.11 Checkbox
- Size: `16px × 16px`
- Unchecked: border `1px solid rgba(17,24,26,0.3)`, radius `3px`
- Checked: bg `#3385ff`, white checkmark
- Inline label to the right

### 7.12 Select / Dropdown

Two variants share the same trigger and panel styling; only the interior differs.

#### Single-select (`.custom-select`)
- Trigger height: `36px`, `padding: 0 32px 0 12px`
- Border: `1px solid rgba(17,24,26,0.2)`, focus/open: `var(--color-brand)`
- Border radius: `8px`
- Chevron icon right-aligned; rotates 180° when open
- Dropdown panel: white bg, `border-radius: 8px`, `box-shadow: var(--shadow-md)`, `z-index: 500`
- Active option: brand-blue text + medium weight; no checkbox
- HTML:
  ```html
  <div class="custom-select" data-select>
    <button class="custom-select__trigger" type="button">
      <span class="custom-select__value">Day</span>
      <svg class="custom-select__chevron" width="14" height="14" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
    <div class="custom-select__dropdown">
      <div class="custom-select__option selected" data-value="day">Day</div>
      <div class="custom-select__option" data-value="week">Week</div>
      <div class="custom-select__option" data-value="month">Month</div>
    </div>
  </div>
  ```

#### Multi-select (`.custom-select.custom-select--multi`)
- Trigger wraps selected chips; no fixed height — grows with content (min `36px`)
- Selected items shown as tag chips: `background: #f5f9ff`, brand-blue text + × remove button
- Dropdown has "Select All" option separated by a bottom border, followed by individual checkboxes
- Checkbox: `16×16px` square, `border-radius: 3px`; checked state fills brand blue with a white checkmark
- "Select All" syncs with individual options: auto-checks if all selected, auto-unchecks if any deselected
- Tags are removed by clicking × without opening the dropdown
- HTML:
  ```html
  <div class="custom-select custom-select--multi" data-select data-multi>
    <div class="custom-select__trigger" role="button" tabindex="0">
      <div class="custom-select__tags" data-tags></div>
      <span class="custom-select__placeholder">All API Keys</span>
      <svg class="custom-select__chevron" width="14" height="14" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>
    <div class="custom-select__dropdown">
      <div class="custom-select__option custom-select__option--all" data-select-all>
        <span class="custom-select__checkbox"></span>Select All
      </div>
      <div class="custom-select__option" data-value="sk-1">
        <span class="custom-select__checkbox"></span>sk-KgGrOmdrpsoSfyndgwXD…
      </div>
    </div>
  </div>
  ```

#### Behaviour (both variants)
- Clicking trigger toggles open; clicking outside closes
- Only one `.custom-select` can be open at a time
- Escape key closes any open dropdown
- JS dispatches a `change` CustomEvent on the `.custom-select` element:
  - Single: `detail: { value, label }`
  - Multi: `detail: [{ value, label }, …]`

### 7.13 Tabs
- Underline style
- Active tab: `#3385ff` text + `2px` bottom border in brand blue
- Inactive tab: `rgba(17,24,26,0.65)` text
- Tab row: bottom border `1px solid rgba(17,24,26,0.1)`

### 7.14 Modal / Dialog
- Overlay: `rgba(0,0,0,0.5)` full screen
- Dialog box: white, `border-radius: 16px`, `padding: 32px`, `max-width: 420px`
- Shadow: `0 8px 32px rgba(0,0,0,0.16)`
- Header: title `font-size: 20px`, `font-weight: 500` + X close button top-right
- Footer: action button(s) right-aligned
- Content: form fields stacked with `16px` gap

### 7.15 Card / Info Box
- Background: `#fff`
- Border: `1px solid rgba(17,24,26,0.1)`
- Border radius: `16px`
- Padding: `24px`
- Shadow: `0 1px 3px rgba(0,0,0,0.08)`

### 7.16 Sidebar Nav Item
- Padding: `10px 16px`
- Icon: `20px`, color matches text
- Active: left border `3px solid #3385ff`, text `#3385ff`, bg subtle
- Inactive: text `rgba(9,22,26,0.65)`, no border

### 7.17 Top Nav Link
- Dark bar background
- Text: white, `font-size: 14px`
- Hover: slight opacity change or underline

---

## 8. Icons

- Style: outline/line icons (not filled)
- Size: typically `20px` in sidebar, `16px` in table operations
- Library appears to be a custom icon set or Lucide-style

---

## 9. Motion

| Property | Value |
|----------|-------|
| Default transition | `0.15s ease` |
| Accordion | `0.3s cubic-bezier(0.87,0,0.13,1)` |

---

## 10. Breakpoints

The console is primarily a desktop application. No mobile breakpoints observed in the scanned pages.
