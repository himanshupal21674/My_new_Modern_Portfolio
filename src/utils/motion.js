// Shared motion tokens — keep every animation on the same rhythm.

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  expo: [0.16, 1, 0.3, 1],
}

export const duration = {
  fast: 0.18,
  base: 0.32,
  slow: 0.6,
}

export const spring = {
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 0.6 },
  snappy: { type: "spring", stiffness: 320, damping: 26, mass: 0.5 },
  bar: { stiffness: 140, damping: 28, restDelta: 0.001 },
  morph: { type: "spring", stiffness: 260, damping: 32, mass: 0.9 },
}

// Parent → children stagger
export const stagger = (each = 0.05, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } },
})
