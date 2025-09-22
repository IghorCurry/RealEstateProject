## Silk Background Integration Plan for DeveloperPage

Purpose: Integrate a performant Silk background on `DeveloperPage` with isolated styles, minimal code changes, clear validation per step, and graceful fallback for users preferring reduced motion.

Constraints:

- Do not modify global files or other pages.
- All style changes live in `src/pages/DeveloperPage.css`.
- Ensure AppBar, Cards, Chips, and Project Highlights keep existing behavior.
- Add `prefers-reduced-motion` fallback and optimize rendering.

---

### Phase 1 — Discovery and Baseline Validation (Read-only)

What to do:

- Confirm route to `/developer` and the page file: `src/pages/DeveloperPage.tsx`.
- Review `Header.tsx` to ensure z-index and sticky behavior are compatible with a full-screen fixed canvas background.
- Review global CSS `src/index.css` to check body/background/overflow settings.

Acceptance criteria:

- Page path confirmed: `/developer` uses `DeveloperPage`.
- No global CSS rules that would block a fixed full-screen background or cause unwanted scrollbars.
- Header remains sticky and above background layers.

Validation checklist:

- Navigate to `/developer`; inspect layout in DevTools.
- Check `AppBar` computed styles (position, z-index, backdrop-filter) and ensure it stays above other layers.

Risk/Notes:

- None expected; background will be `pointer-events: none`.

---

### Phase 2 — Files and Structure (No visual change yet)

What to do:

- Create `src/components/backgrounds/Silk.tsx` based on provided shader code with minor optimizations (Canvas `dpr`, `gl`, `frameloop`, visibility pause, reduced-motion adjustments).
- Create `src/pages/DeveloperPage.css` with isolated classes for background and glass UI.

Acceptance criteria:

- New files compile with no TypeScript or linter errors.
- No imports wired into the page yet (to avoid runtime changes at this step).

Validation checklist:

- Type-check project build.
- Linter runs clean for new files.

Risk/Notes:

- Keep props minimal and defaults aligned to the provided example values.

---

### Phase 3 — Page Integration (Layering only)

What to do:

- Import `./DeveloperPage.css` into `DeveloperPage.tsx`.
- Lazy-load `Silk` with `React.lazy` and wrap it in `React.Suspense` with `fallback={null}`.
- Wrap page content into `div.developer-page`, add `div.developer-bg` (with `<Silk/>`), and `div.developer-content` to keep content above background.

Acceptance criteria:

- DeveloperPage renders without visual regressions.
- Silk background displays behind content, does not block interactions (pointer-events disabled), and respects sticky header.

Validation checklist:

- Verify header links and buttons are clickable.
- Confirm no horizontal scrollbar appears.
- Test navigation flow in/out of `/developer` to confirm Silk mounts/unmounts without errors.

Risk/Notes:

- If any overlay captures clicks, ensure `.developer-bg { pointer-events: none; }` is applied.

---

### Phase 4 — Styling the Surface Elements (Glass and Accent)

What to do:

- Add classes to existing elements without changing semantics:
  - Add `className="developer-card"` to the two main `Card` components.
  - Add `className="developer-chip"` to skill chips.
  - Add `className="developer-title"`/`developer-text` to key typographic elements.
  - Add `className="developer-card developer-card-accent"` to the Project Highlights card.
  - Add `className="developer-avatar-ring"` to `Avatar`.

Acceptance criteria:

- Cards show subtle glassmorphism above Silk; text remains readable.
- Project Highlights card matches Silk palette.
- Chips are visible and accessible atop Silk.

Validation checklist:

- Contrast check for text on cards and chips.
- Hover states remain visible and not over-aggressive.
- Ensure responsive behavior (Grid wraps properly, no overflow).

Risk/Notes:

- If MUI `sx` clashes, CSS includes slightly higher specificity for accent card via `!important` only where safe.

---

### Phase 5 — Motion Preferences and Performance

What to do:

- Ensure `prefers-reduced-motion` hides the background via CSS.
- In `Silk.tsx`, lower `dpr`, turn off antialiasing, use `frameloop="demand"`, and reduce speed/noise for reduced motion users.
- Pause animation when the page is not visible.

Acceptance criteria:

- Users with reduced motion do not see animated background; no performance degradation.
- No console errors when visibility changes or route changes.

Validation checklist:

- Toggle OS/browser reduced-motion settings and confirm behavior.
- Throttle CPU in DevTools; verify acceptable frame time and no jank.
- Check memory usage before/after navigating away to ensure cleanup.

Risk/Notes:

- Avoid over-optimizing; keep implementation simple and focused.

---

### Phase 6 — Functional Regression Pass

What to do:

- Verify all interactive elements on `DeveloperPage` still work (buttons, links, chips hover states).
- Verify `Header` continues to look correct and interactive on all breakpoints.

Acceptance criteria:

- No broken interactions or layout shifts caused by the background.
- Mobile layout maintains readability and tap targets.

Validation checklist:

- Keyboard navigation and focus rings visible on buttons and chips.
- Test on narrow widths and high DPR devices.

Risk/Notes:

- If blur is heavy on mobile, CSS already reduces it in a media query.

---

### Phase 7 — Final Review and Rollback

What to do:

- Reconfirm that no global styles or other pages were modified.
- Confirm only three files changed/added: `Silk.tsx`, `DeveloperPage.css`, `DeveloperPage.tsx`.
- Prepare minimal rollback: remove classes & wrapper divs and delete the two new files.

Acceptance criteria:

- All constraints satisfied. CI passes.

Validation checklist:

- Static code analysis, type-check, and lints are clean.
- Visual QA in both light/dark themes.

Risk/Notes:

- None significant; all changes are localized and reversible.

---

## Plan Evaluation (Simplicity, Best Practices, Risks)

Simplicity:

- Minimal touch points: one page updated, two new files added.
- No global or theme-level changes; CSS isolated via class names.

Best Practices:

- Lazy-load heavy background code; avoid bloat for other routes.
- Respect `prefers-reduced-motion`; degrade gracefully.
- Use `pointer-events: none` and z-index layering to preserve interactions.
- Keep CSS specific to the page; avoid global side effects.

Risks and Mitigations:

- Performance on low-end devices: mitigated via reduced DPR and `frameloop` control.
- Visual clashes with MUI `sx`: mitigated by page-specific classes and limited `!important` only for accent card.

Success Criteria:

- DeveloperPage looks cohesive with Silk background.
- Zero regressions in functionality and accessibility.
- Clean builds and no console errors.

---

### Header/Footer Styling on Developer Page Only

Approach: Route-scoped class on `body` + scoped CSS in `DeveloperPage.css`.

Steps:

1. In `DeveloperPage.tsx`, add/remove `route-developer` class on `body` via `useEffect` (cleanup on unmount).
2. In `DeveloperPage.css`, add styles under `.route-developer` that target MUI AppBar and footer only for this route.

Acceptance criteria:

- Header and Footer appear as glass/transparent with light text over Silk only on `/developer`.
- No visual changes to Header/Footer on other pages.

Validation checklist:

- Navigate between routes (home → developer → properties) and verify header/footer styles switch correctly.
- Ensure buttons, icons, and links remain readable and accessible on `/developer`.
- Mobile view: no excessive blur; interactions unaffected.

Notes:

- This avoids touching global theme and component code; fully localized to the page.

---

## Phase 1 — Results (Discovery and Baseline Validation)

Checked items:

- Route config: `/developer` maps to `DeveloperPage` via `src/config/routes.tsx` (lazy-loaded). OK.
- Page source: `src/pages/DeveloperPage.tsx` uses MUI `Container`, `Card`, `Grid`, `Fade`; no absolute/fixed positioning that would conflict with a fixed background layer. OK.
- Header: `src/components/common/Header.tsx` uses `AppBar` with `position="sticky"`, translucent background and `backdrop-filter`. Default MUI z-index for `AppBar` ensures it stays above page content; a background at `z-index:0` will not interfere. OK.
- Global CSS: `src/index.css` sets `body{ overflow-x:hidden; overflow-y:visible; min-height:100vh }` and global background on `:root`. A fixed full-viewport background with `pointer-events:none` will coexist without causing scroll or interaction issues. OK.

Notes:

- Keep the background container `position:fixed; inset:0; z-index:0; pointer-events:none` and place page content in a wrapper with `position:relative; z-index:1`.
- `Project Highlights` uses a gradient via `sx`; override visually with a page-specific class (accent) without touching global theme.
- Ensure `public/placeholder-house.svg` exists; otherwise disable the pseudo-element or replace the asset.

Conclusion:

- No blocking conflicts detected. Proceed to Phase 2 (Files and Structure).
