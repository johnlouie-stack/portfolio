import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { IconMenu, IconX, IconCode } from "../assets/icons.jsx";
import { NAV_LINKS } from "../utils/constants.js";
import { useScrollSpy } from "../hooks/useScrollSpy.js";
import { scrollTo } from "../utils/scrollTo.js";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(NAV_LINKS);
  const { isDark, setIsDark } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleNav = (id) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-black/60 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-2xl shadow-black/10 dark:shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ── */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-2 group"
            aria-label="Go to home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600
              flex items-center justify-center shadow-lg shadow-cyan-500/25
              group-hover:shadow-cyan-500/50 transition-shadow duration-300">
              <IconCode />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
              John<span className="text-cyan-400">.</span>dev
            </span>
          </button>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleNav(link)}
                className={`relative px-4 py-2 text-sm font-medium capitalize rounded-lg
                  transition-colors duration-200 ${
                  active === link
                    ? "text-cyan-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {active === link && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{link}</span>
              </button>
            ))}

            {/* ── Theme Toggle ── */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="ml-2 px-3 py-2 rounded-lg text-sm font-medium
                bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10
                text-gray-700 dark:text-gray-300 hover:scale-105 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => handleNav("contact")}
              className="ml-2 px-5 py-2 text-sm font-semibold bg-gradient-to-r
                from-cyan-500 to-violet-600 text-white rounded-lg hover:shadow-lg
                hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
            >
              Hire Me
            </button>
          </div>

          {/* ── Mobile: Theme Toggle + Hamburger ── */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400
                hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900
                dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;