# Design System Strategy: Job Search Copilot (Inspired by LifeOS)

## 1. Overview & Creative North Star

**Creative North Star: The Intelligent Career Concierge**
The design system for this platform is not merely a job board or tracker; it is a "Digital Sanctuary." Job hunting is often chaotic and anxiety-inducing. We are moving away from the rigid, cold utility of typical SaaS platforms (like messy spreadsheets) toward an editorial, high-end experience that feels curated, calm, and alive.

To break the "template" look, we leverage **intentional asymmetry** and **chromatic depth**. This system utilizes an ultra-rounded visual language (16px+) to remove sharp "anxiety points" in the UI, replacing them with soft, approachable forms. Overlapping "floating" elements creates a layout that feels less like a CRM and more like a premium career journal.

---

## 2. Colors

The palette is anchored in a sophisticated "Cool Slate" neutral foundation, allowing AI-driven pastel accents to provide functional categorization without visual fatigue.

### Color Tokens (Material Design Convention)
- **Background:** `#f7f9fb` (A crisp, airy base)
- **Primary:** `#4a4bd7` (The "Action" anchor, used for matching and generation)
- **Secondary (Mint):** `#006d4a` (Growth/Status - Used for Offers and Successful Applications)
- **Tertiary (Rose):** `#a53173` (Personal/High Priority - Used for Nudges and Action Items)
- **Surface Hierarchy:** `surface_container_lowest` (`#ffffff`) through `surface_dim` (`#d4dbdf`).

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established through:
1.  **Background Shifts:** Placing a `surface_container_lowest` card on a `surface` background.
2.  **Tonal Transitions:** Using the subtle difference between `surface_container_low` and `surface_container_high` to group lists in the Kanban board or feed.

### The "Glass & Gradient" Rule
To elevate AI actions (e.g., "Tailor Application" or "AI Match Score"), use glassmorphism. Apply a `surface` color with 60% opacity and a `backdrop-blur` of 20px. For primary action buttons, utilize a subtle linear gradient from `primary` to `primary_container` at a 135-degree angle to add "soul" and dimension.

---

## 3. Typography

The typography strategy pairs the geometric authority of **Manrope** for high-level editorial moments with the high-legibility of **Inter** for data-heavy interactions (like Reading Job Descriptions).

- **Display (Manrope):** Large, bold, and expressive. Used for dashboard greetings and AI-generated insight summaries.
- **Headline/Title (Manrope):** Clean and modern. Used for Job Role Titles, Card titles, and section headers to establish a premium feel.
- **Body/Label (Inter):** Reduced tracking and optimized line heights. Ensures dense sidebars, job descriptions, and CV bullet points remain breathable and highly readable.

---

## 4. Elevation & Depth

We eschew traditional drop shadows in favor of **Tonal Layering** and **Ambient Diffusion**.

- **The Layering Principle:** Depth is achieved by "stacking" tiers. The global Sidebars/Navbars should be `surface_container_lowest`, while the main workspace is `surface`. This creates a natural "lift" without visual clutter.
- **Ambient Shadows:** When a job card or Document Studio pane requires a floating state (e.g., on hover or drag), use an extra-diffused shadow.
    - *Formula:* `0px 20px 40px rgba(44, 52, 55, 0.06)`.
    - The shadow is tinted with the `on_surface` color to mimic natural light.
- **The Ghost Border:** If accessibility requires a Kanban container boundary, use the `outline_variant` at **15% opacity**. It should be felt, not seen.
- **Glassmorphism:** Use semi-transparent layers for sticky headers or floating nudges so content bleeds through naturally underneath.

---

## 5. Components & Layout Mappings

Based on the Hackathon Plan architecture:

### Global Navigation
- **Sidebar & Top Bar:** `surface_container_lowest` matching the "No-Line" rule. Top Bar handles search and nudges. Use sleek, rounded `2rem` inputs for the search bar.

### Dashboard (The Command Center)
- **Stat Cards:** Use pastel containers (`primary_fixed`, `secondary_fixed`) with low opacities to represent different metrics (Scraped Jobs vs Interviews).
- **"Action Items" Feed:** High-priority nudges styled with Tertiary (Rose) color accents, utilizing Ambient Shadows.
- **Buttons**:
    - **Primary:** Rounded `9999px`. High-saturation `primary` background with `on_primary` text.
    - **Secondary:** Transparent background with a `Ghost Border` (outline-variant at 20%).

### Job Matches (The Feed)
- **Job Cards:**
  - **Styling:** `1.5rem` to `2rem` corner radius, using expansive white space (`1.5rem` minimum spacing).
  - **AI Match Score:** Treat this as a crucial "Tag Pill", beautifully rounded, using a gradient fill to signify its 'magic'.

### The Studio (Document Review)
- **Split-screen Interface:**
  - **Left Pane (JD):** Standard `surface_container_low`. Clear Inter typography. Highlighted keywords using subtle `primary_container` or `secondary_container` text bounds.
  - **Right Pane (AI Cover Letter):** Uses higher elevation (`surface_container_lowest`) with `Ghost Borders` to indicate editability and importance.
  - **Live AI Generation:** Add a smooth progress micro-animation that doesn't rely on harsh spinners, maybe a subtle glowing pulse across the text lines.

### Application Tracker (Kanban Board)
- **Columns:** No harsh lines. Background color is slightly `surface_dim`, while cards sit on `surface_container_lowest`. No divider lines. Separate header and content using 1.5rem of vertical white space.
- **Drag & Drop:** On drag, cards lift using the Ambient Shadow formula (0px 20px 40px, tinted). Tags on these cards follow the `0.5rem` rounded pill style.

---

## 6. Do's and Don'ts

### Do:
- **Use "White Space as a Divider":** Trust the spacing scale to group Kanban lanes or job cards.
- **Embrace Asymmetry:** Let the Studio split pane breathe. The JD might be slightly narrower than the generated cover letter to emphasize the product output.
- **Use Sophisticated Corner Smoothing:** Use "iOS-style" continuous corner curves for all `1rem+` radii.

### Don't:
- **Don't use pure black (#000000):** Use `on_surface` (`#2c3437`) for text to maintain a soft, premium feel. This is essential for long job descriptions!
- **Don't use 1px borders:** They break the "Digital Sanctuary" illusion and feel like legacy job tracking software.
- **Don't crowd the Kanban board:** Keep the cards spacious and minimal. Only show vital information until clicked.
- **Don't use generic drop shadows:** Avoid the "fuzzy grey cloud" look. Use the tinted Ambient Shadows specified in Section 4.
