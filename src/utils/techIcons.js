// Pinned version: cached long-term by the CDN and the browser (unlike @latest).
const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@2.17.0/icons"

const ICON_MAP = {
  react: `${CDN}/react/react-original.svg`,
  javascript: `${CDN}/javascript/javascript-original.svg`,
  typescript: `${CDN}/typescript/typescript-original.svg`,
  html5: `${CDN}/html5/html5-original.svg`,
  html: `${CDN}/html5/html5-original.svg`,
  css3: `${CDN}/css3/css3-original.svg`,
  css: `${CDN}/css3/css3-original.svg`,
  tailwind: `${CDN}/tailwindcss/tailwindcss-original.svg`,
  tailwindcss: `${CDN}/tailwindcss/tailwindcss-original.svg`,
  nextjs: `${CDN}/nextjs/nextjs-original.svg`,
  vite: `${CDN}/vitejs/vitejs-original.svg`,
  redux: `${CDN}/redux/redux-original.svg`,
  nodejs: `${CDN}/nodejs/nodejs-original.svg`,
  node: `${CDN}/nodejs/nodejs-original.svg`,
  express: `${CDN}/express/express-original.svg`,
  graphql: `${CDN}/graphql/graphql-plain.svg`,
  mongodb: `${CDN}/mongodb/mongodb-original.svg`,
  postgresql: `${CDN}/postgresql/postgresql-original.svg`,
  firebase: `${CDN}/firebase/firebase-original.svg`,
  git: `${CDN}/git/git-original.svg`,
  figma: `${CDN}/figma/figma-original.svg`,
  docker: `${CDN}/docker/docker-original.svg`,
  aws: `${CDN}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  nginx: `${CDN}/nginx/nginx-original.svg`,
  jest: `${CDN}/jest/jest-plain.svg`,
  webpack: `${CDN}/webpack/webpack-original.svg`,
  vercel: `${CDN}/vercel/vercel-original.svg`,
  github: `${CDN}/github/github-original.svg`,
  storybook: `${CDN}/storybook/storybook-original.svg`,
  socketio: `${CDN}/socketio/socketio-original.svg`,
  stripe: `${CDN}/stripe/stripe-original.svg`,
  mapbox: `${CDN}/googlemaps/googlemaps-original.svg`,
  framermotion: `${CDN}/framermotion/framermotion-original.svg`,
  zustand: `${CDN}/zustand/zustand-original.svg`,
  githubactions: `${CDN}/githubactions/githubactions-original.svg`,
}

const ALIASES = {
  "tailwind css": "tailwindcss",
  "next.js": "nextjs",
  "node.js": "nodejs",
  "rest apis": "nodejs",
  "ci/cd": "githubactions",
  "framer motion": "framermotion",
  "socket.io": "socketio",
}

export function getTechIcon(name = "") {
  const key = name.toLowerCase().trim()
  const aliased = ALIASES[key] || key.replace(/[^a-z0-9]/g, "")
  return ICON_MAP[aliased] || ICON_MAP[key] || null
}

export function normalizeTechKey(name = "") {
  return name.toLowerCase().trim()
}

// Brand colours drive the per-skill hover glow and level ring.
const BRAND_COLORS = {
  react: "#61dafb",
  javascript: "#f7df1e",
  typescript: "#3178c6",
  nextjs: "#a1a1aa",
  html5: "#e34f26",
  css3: "#1572b6",
  tailwindcss: "#38bdf8",
  framermotion: "#e879f9",
  redux: "#764abc",
  nodejs: "#5fa04e",
  express: "#a1a1aa",
  graphql: "#e10098",
  mongodb: "#47a248",
  postgresql: "#4169e1",
  firebase: "#ffca28",
  git: "#f05032",
  figma: "#a259ff",
  vite: "#646cff",
  jest: "#c21325",
  webpack: "#8dd6f9",
  docker: "#2496ed",
  githubactions: "#2088ff",
  aws: "#ff9900",
  vercel: "#a1a1aa",
  nginx: "#009639",
}

const COLOR_ALIASES = { "rest apis": "nodejs", html: "html5", css: "css3", tailwind: "tailwindcss", node: "nodejs", vitejs: "vite" }

export function getTechColor(name = "") {
  const key = name.toLowerCase().trim()
  const aliased = ALIASES[key] || COLOR_ALIASES[key] || key.replace(/[^a-z0-9]/g, "")
  return BRAND_COLORS[COLOR_ALIASES[aliased] || aliased] || "#6d74f6"
}
