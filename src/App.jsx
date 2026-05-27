import { useState, useEffect } from "react";

import Navbar     from "./components/Navbar.jsx";
import MobileMenu from "./components/MobileMenu.jsx";
import Hero       from "./components/Hero.jsx";
import About      from "./components/About.jsx";
import Skills     from "./components/Skills.jsx";
import Contact    from "./components/Contact.jsx";
import Footer     from "./components/Footer.jsx";

/**
 * App — root component.
 *  - Owns the mobile-menu open/close state
 *  - Locks body scroll while the drawer is open
 *  - Renders the full page layout
 */
const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  /* Prevent background scrolling when mobile drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
