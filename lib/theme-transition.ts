// Theme switch transition.
//
// The new theme is revealed by a wipe that runs from the right edge, where the
// toggle sits, to the left. It reuses the site's own motion language: the same
// ease as the mask reveal on the hero, hard edges, and a thin accent line that
// leads the wipe. It takes about half a second and needs no generated assets.
// The View Transitions API snapshots the old and new theme; the CSS lives in
// globals.css under html[data-theme-wipe].

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> }
}

/**
 * Run `apply` (which must switch the theme synchronously) behind the wipe.
 * Falls back to a plain switch without View Transitions or with reduced motion.
 */
export async function withThemeTransition(apply: () => void) {
  const doc = document as ViewTransitionDocument
  const root = document.documentElement
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (!doc.startViewTransition || reduced) {
    apply()
    return
  }

  // The leading line is its own view-transition layer so it travels with the wipe.
  const edge = document.createElement("div")
  edge.className = "theme-wipe-edge"
  edge.setAttribute("aria-hidden", "true")
  document.body.appendChild(edge)

  root.setAttribute("data-theme-wipe", "")
  const transition = doc.startViewTransition(apply)

  try {
    await transition.finished
  } finally {
    root.removeAttribute("data-theme-wipe")
    edge.remove()
  }
}
