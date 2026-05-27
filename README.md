# John Louie — Developer Portfolio

A modern, fully responsive developer portfolio built with **React + Vite + Tailwind CSS**.

---

## ✨ Features

- **Dark modern UI** with glassmorphism effects
- **Framer Motion** animations (fade-up, stagger, scroll-triggered, hover glow)
- **Fully responsive** — Mobile · Tablet · Laptop · Desktop · Ultra-wide
- Mobile-first design with Tailwind responsive breakpoints
- Hamburger menu with animated slide-in drawer
- Smooth scrolling + active-section scroll spy
- Zero horizontal overflow

---

## 📁 Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── src/
    ├── main.jsx            ← React entry point
    ├── App.jsx             ← Root component (layout + menu state)
    ├── index.css           ← Tailwind directives + global styles
    │
    ├── assets/
    │   └── icons.jsx       ← All inline SVG icon components
    │
    ├── hooks/
    │   └── useScrollSpy.js ← Tracks active nav section on scroll
    │
    ├── utils/
    │   ├── animations.js   ← Shared Framer Motion variants
    │   ├── constants.js    ← NAV_LINKS, SKILLS_DATA, SOCIAL_LINKS …
    │   └── scrollTo.js     ← Smooth-scroll helper
    │
    └── components/
        ├── GlowOrb.jsx     ← Reusable ambient glow orb
        ├── Navbar.jsx      ← Fixed top nav with glass blur + pill indicator
        ├── MobileMenu.jsx  ← Slide-in drawer for small screens
        ├── Hero.jsx        ← Full-screen landing section
        ├── About.jsx       ← Two-column intro + stats
        ├── Skills.jsx      ← Skill card grid with progress bars
        ├── Contact.jsx     ← Contact form + info sidebar
        └── Footer.jsx      ← Minimal footer with social links
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

---

## 🛠 Tech Stack

| Tool           | Version  | Purpose                          |
|----------------|----------|----------------------------------|
| React          | 18       | UI library                       |
| Vite           | 5        | Build tool & dev server          |
| Tailwind CSS   | 3        | Utility-first styling            |
| Framer Motion  | 11       | Animations & transitions         |
| PostCSS        | 8        | CSS processing (autoprefixer)    |

---

## 🎨 Customisation

| What to change         | Where                              |
|------------------------|------------------------------------|
| Name / intro text      | `src/components/Hero.jsx`          |
| About copy             | `src/components/About.jsx`         |
| Skills list & levels   | `src/utils/constants.js`           |
| Social / nav links     | `src/utils/constants.js`           |
| Contact email          | `src/components/Contact.jsx`       |
| Colour palette         | `tailwind.config.js` → `colors`    |
| Fonts                  | `src/index.css` + `tailwind.config.js` |

---

## 📄 License

MIT — free to use and modify for personal or commercial projects.
