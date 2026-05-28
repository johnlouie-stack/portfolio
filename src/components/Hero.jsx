import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline';
import { useTheme } from "../context/ThemeContext";

import { IconArrow, IconChevronDown } from "../assets/icons.jsx";
import GlowOrb from "./GlowOrb.jsx";
import { fadeUp, fadeIn } from "../utils/animations.js";
import { scrollTo } from "../utils/scrollTo.js";

const Hero = () => {
  const { isDark, setIsDark } = useTheme();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden
        bg-white dark:bg-black transition-colors duration-300"
    >
      {/* 3D Spline scene — hidden on small screens, shown from lg */}
      <div className="hidden lg:block absolute inset-0">
        <Spline
          className="absolute top-0 bottom-0 left-[30%] h-full"
          scene="https://prod.spline.design/A0kFUyyf0dHtXO8I/scene.splinecode"
        />
      </div>

      {/* Spline on mobile — smaller and pushed to bottom so it doesn't cover text */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 h-[80%] opacity-60 overflow-hidden">
        <Spline
              className="w-full h-full scale-150 translate-y-[190px]"
              scene="https://prod.spline.design/A0kFUyyf0dHtXO8I/scene.splinecode"
        />
      </div>

      {/* Dot-grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow orbs */}
      
      <GlowOrb className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] bg-blue-500 top-1/3 left-1/2 -translate-x-1/2" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-8
        text-center pt-24 pb-48 lg:pt-0 lg:pb-0">

        {/* Available badge */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10
            backdrop-blur-sm text-sm text-cyan-500 dark:text-cyan-400 font-medium mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          Available for Work
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-black
            leading-[0.9] tracking-tighter text-gray-900 dark:text-white mb-5"
        >
          John{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500 bg-clip-text text-transparent">
            Louie
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-black/20 dark:to-white/20" />
          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-light
            text-gray-600 dark:text-gray-300 tracking-widest uppercase">
            Full Stack Developer
          </p>
          <div className="h-px flex-1 max-w-12 bg-gradient-to-l from-transparent to-black/20 dark:to-white/20" />
        </motion.div>

        {/* Intro */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400
            max-w-sm sm:max-w-xl lg:max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Passionate IT student crafting beautiful, performant web experiences.
          I turn ideas into elegant digital solutions — one line of code at a time.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={4}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={() => scrollTo("skills")}
            className="group w-full sm:w-auto flex items-center justify-center gap-2.5
              px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-violet-600 text-white
              font-semibold rounded-xl text-sm sm:text-base hover:shadow-xl
              hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300"
          >
            View Skills
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              <IconArrow />
            </span>
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="group w-full sm:w-auto flex items-center justify-center gap-2.5
              px-8 py-3.5 bg-black/5 dark:bg-white/5 border border-black/20
              dark:border-white/10 text-gray-900 dark:text-white font-semibold
              rounded-xl text-sm sm:text-base hover:bg-black/10 dark:hover:bg-white/10
              hover:scale-105 backdrop-blur-sm transition-all duration-300"
          >
            Contact Me
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              <IconArrow />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={fadeIn} initial="hidden" animate="visible"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          onClick={() => scrollTo("about")}
          aria-label="Scroll to About section"
          className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-600
            hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <IconChevronDown />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;