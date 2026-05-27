// ─── Shared Constants ─────────────────────────────────────────────────────────

export const NAV_LINKS = ["home", "about", "skills", "contact"];

export const SOCIAL_LINKS = [
  { label: "GitHub",      href: "https://github.com/",   key: "github"   },
  { label: "LinkedIn",    href: "https://linkedin.com/",  key: "linkedin" },
  { label: "Twitter / X", href: "https://x.com/",        key: "twitter"  },
];

export const SKILLS_DATA = [
  {
    name: "HTML5",
    iconKey: "html",
    color: "from-orange-500/20 to-red-600/20",
    border: "hover:border-orange-500/40",
    glow:   "hover:shadow-orange-500/10",
    level: 90,
  },
  {
    name: "CSS3",
    iconKey: "css",
    color: "from-blue-500/20 to-blue-700/20",
    border: "hover:border-blue-500/40",
    glow:   "hover:shadow-blue-500/10",
    level: 85,
  },
  {
    name: "JavaScript",
    iconKey: "js",
    color: "from-yellow-400/20 to-yellow-600/20",
    border: "hover:border-yellow-400/40",
    glow:   "hover:shadow-yellow-400/10",
    level: 80,
  },
  {
    name: "React",
    iconKey: "react",
    color: "from-cyan-400/20 to-cyan-600/20",
    border: "hover:border-cyan-400/40",
    glow:   "hover:shadow-cyan-400/10",
    level: 78,
  },
  {
    name: "Tailwind CSS",
    iconKey: "tailwind",
    color: "from-teal-400/20 to-teal-600/20",
    border: "hover:border-teal-400/40",
    glow:   "hover:shadow-teal-400/10",
    level: 85,
  },
  {
    name: "Node.js",
    iconKey: "node",
    color: "from-green-500/20 to-green-700/20",
    border: "hover:border-green-500/40",
    glow:   "hover:shadow-green-500/10",
    level: 70,
  },
  {
    name: "Git",
    iconKey: "git",
    color: "from-orange-600/20 to-red-700/20",
    border: "hover:border-orange-600/40",
    glow:   "hover:shadow-orange-600/10",
    level: 75,
  },
];

export const ABOUT_STATS = [
  { icon: "🎓", title: "IT Student",      value: "3rd Yr" },
  { icon: "💻", title: "Projects Built",  value: "10+"    },
  { icon: "☕", title: "Cups of Coffee",  value: "∞"      },
  { icon: "📍", title: "Based in", value: "Philippines" },
];
