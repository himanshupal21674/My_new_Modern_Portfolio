# Portfolio

A premium, animated personal portfolio for a Frontend Developer — built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

All personal content lives in a single file: `src/data/data.js`. Update that file and every section of the site will follow.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion
- Lucide icons

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal (typically `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Customize your content

Edit `src/data/data.js`:

- `personalInfo` — name, title, contact, socials, resume path, bio, photo
- `heroContent` — greeting, roles (typing effect), CTAs, floating tech icons
- `skills` / `skillCategories` — grouped skill bars
- `experiences` — timeline entries
- `projects` — showcase cards, filters, and modal details
- `education`, `certifications`, `achievements`, `testimonials`
- `navLinks`, `sections`, `stats`, `contactForm`, `footerContent`

Empty arrays are skipped automatically (for example, no projects means the Projects section is not rendered).

## Resume download

Place a PDF at:

```text
public/resume.pdf
```

The path is controlled by `personalInfo.resume` in `data.js`.

## Theming

A dark/light toggle lives in the navbar. The preference is stored in `localStorage` under `theme`. Default follows the system, with dark as the fallback.

## Project structure

```text
src/
├── components/
├── sections/
├── data/
│   └── data.js
├── hooks/
├── utils/
├── assets/
├── layouts/
├── pages/
└── App.jsx
```
