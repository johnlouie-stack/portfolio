import { motion, AnimatePresence } from "framer-motion";

import { IconGithub, IconFacebook, IconInstagram } from "../assets/icons.jsx";
import { NAV_LINKS, SOCIAL_LINKS } from "../utils/constants.js";
import { scrollTo } from "../utils/scrollTo.js";
import { slideInRight } from "../utils/animations.js";

const SOCIAL_ICONS = {
  github:   <IconGithub />,
  facebook: <IconFacebook />,
  instagram: <IconInstagram />,
};

/**
 * MobileMenu — full-screen slide-in drawer for small screens.
 * Renders nav links with staggered animations and social icons at the bottom.
 */
const MobileMenu = ({ open, onClose }) => {
  const handleNav = (id) => {
    scrollTo(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="fixed inset-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-gray-950/95
            border-l border-white/10 flex flex-col pt-24 px-6 pb-8">

            {/* Nav links */}
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  variants={slideInRight}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  onClick={() => handleNav(link)}
                  className="flex items-center gap-3 px-4 py-3.5 text-left text-gray-300
                    hover:text-cyan-400 hover:bg-white/5 rounded-xl capitalize font-medium
                    transition-all duration-200 text-lg"
                >
                  <IconArrow />
                  {link}
                </motion.button>
              ))}
            </nav>

            {/* Hire Me CTA */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <button
                onClick={() => handleNav("contact")}
                className="w-full py-3.5 font-semibold bg-gradient-to-r from-cyan-500
                  to-violet-600 text-white rounded-xl hover:shadow-lg
                  hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Hire Me
              </button>
            </div>

            {/* Social links */}
            <div className="mt-auto flex gap-4 justify-center">
              {SOCIAL_LINKS.map(({ key, href, label }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-lg bg-white/5 text-gray-400 hover:text-cyan-400
                    hover:bg-white/10 transition-all duration-200"
                >
                  {SOCIAL_ICONS[key]}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
