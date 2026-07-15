---
name: appPreview Screenshot tool captures before staggered entry animations finish
description: The Screenshot tool's appPreview capture happens shortly after page load, well before framer-motion delays >1s resolve — don't mistake this for a broken app.
---

When a page has a premium loader (e.g. a ~1-1.5s `setTimeout` before hiding a splash screen) plus
hero content with staggered `transition={{ delay: ... }}` values stacking up to 2-2.5s, the
`Screenshot` tool's `appPreview` capture consistently lands within roughly the first second after
navigation — before those delays elapse. The screenshot will show the splash/loader (or a blurred,
not-yet-revealed hero) on every call, even waiting several seconds between calls, because each call
re-navigates fresh rather than reusing a browser session.

**Why:** discovered while building the Vaarix Media landing page — the loader appeared "stuck" in
every screenshot despite the code being correct. Adding a temporary `console.log` inside the
loader's `useEffect`/`setTimeout` proved the timer fired on schedule; the visual freeze was purely
a capture-timing artifact, confirmed by temporarily forcing `loading` to `false` and seeing the
*next* animation stage (hero fade-in) also appear mid-blur in the screenshot for the same reason.

**How to apply:** don't treat a screenshot that shows a splash/loader or a blurred/not-yet-revealed
hero as proof of a bug when the page has deliberate entry-animation delays past ~1s. Verify via
code review and/or a temporary console.log / temporarily short-circuiting the delay state instead
of repeated screenshots. If you need a screenshot of the settled state for presentation purposes,
temporarily reduce or bypass the relevant delays, capture, then revert.
