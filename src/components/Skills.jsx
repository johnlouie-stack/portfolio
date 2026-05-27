import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

import { fadeUp, stagger } from "../utils/animations.js";
import { SKILLS_DATA } from "../utils/constants.js";
import { IconHtml, IconCss, IconJs, IconReact, IconTailwind, IconNode, IconGit } from "../assets/icons.jsx";

const ICON_MAP = {
  html: <IconHtml />, css: <IconCss />, js: <IconJs />,
  react: <IconReact />, tailwind: <IconTailwind />, node: <IconNode />, git: <IconGit />,
};

// Stronger colors for light mode, subtle for dark mode
const LIGHT_COLORS = {
  html:     "from-orange-100 to-red-100 border-orange-200 hover:border-orange-400",
  css:      "from-blue-100 to-blue-200 border-blue-200 hover:border-blue-400",
  js:       "from-yellow-100 to-yellow-200 border-yellow-200 hover:border-yellow-400",
  react:    "from-cyan-100 to-cyan-200 border-cyan-200 hover:border-cyan-400",
  tailwind: "from-teal-100 to-teal-200 border-teal-200 hover:border-teal-400",
  node:     "from-green-100 to-green-200 border-green-200 hover:border-green-400",
  git:      "from-orange-100 to-red-200 border-orange-200 hover:border-orange-400",
};

const SkillCard = ({ name, iconKey, color, border, glow, level, index }) => {
  const { isDark } = useTheme();

  const lightStyle = LIGHT_COLORS[iconKey];

  return (
    <motion.div
      variants={fadeUp} custom={index}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative p-6 rounded-2xl backdrop-blur-sm
        transition-all duration-300 cursor-default hover:shadow-lg
        ${isDark
          ? `bg-gradient-to-br ${color} border border-white/10 ${border} ${glow}`
          : `bg-gradient-to-br ${lightStyle} border`
        }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className={`group-hover:scale-110 transition-all duration-300
          ${isDark ? "text-white/80 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"}`}>
          {ICON_MAP[iconKey]}
        </div>

        <span className={`font-semibold text-sm text-center
          ${isDark ? "text-white" : "text-gray-800"}`}>
          {name}
        </span>

        <div className="w-full">
          <div className="flex justify-between items-center mb-1.5">
            <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Proficiency</span>
            <span className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>{level}%</span>
          </div>
          <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-black/10"}`}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="relative py-24 lg:py-32 bg-gray-50 dark:bg-black overflow-hidden transition-colors duration-300"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-cyan-500 dark:text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
            What I Know
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Skills
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            Technologies and tools I work with to build modern, scalable web applications.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {SKILLS_DATA.map((skill, i) => (
            <SkillCard key={skill.name} {...skill} index={i} />
          ))}

          <motion.div
            variants={fadeUp} custom={SKILLS_DATA.length}
            className="p-6 rounded-2xl border border-dashed border-black/10 dark:border-white/10
              flex flex-col items-center justify-center gap-2
              text-gray-400 dark:text-gray-600
              hover:border-black/20 dark:hover:border-white/20
              hover:text-gray-500 transition-all duration-300 cursor-default"
          >
            <span className="text-2xl">+</span>
            <span className="text-xs text-center">Always Learning More</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;