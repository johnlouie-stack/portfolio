import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import profileImg from "../assets/profile.jpg";

import GlowOrb from "./GlowOrb.jsx";
import { fadeUp, stagger } from "../utils/animations.js";
import { ABOUT_STATS } from "../utils/constants.js";

const StatCard = ({ icon, title, value }) => (
  <div className="flex flex-col items-center p-5 rounded-2xl
    bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.07]
    hover:border-cyan-500/30 hover:bg-black/10 dark:hover:bg-white/[0.06]
    transition-all duration-300 group"
  >
    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
    <div className="text-xs text-gray-500 mt-0.5 text-center">{title}</div>
  </div>
);

const About = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 bg-white dark:bg-black overflow-hidden transition-colors duration-300"
    >
      <GlowOrb className="w-[400px] h-[400px] bg-violet-600 top-0 left-0 opacity-10" />
      <GlowOrb className="w-[260px] h-[260px] bg-[#eef2ff]/20 blur-3xl absolute top-[65%] right-[25%]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* Section header */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-cyan-500 dark:text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Get to Know Me
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>
        </motion.div>

        {/* Two-column body */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: image + text ── */}
          <motion.div
            variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {/* Profile image */}
            <motion.div variants={fadeUp} className="flex justify-center lg:justify-start">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 blur-md opacity-30" />
                {/* Image */}
                <img
                  src={profileImg}
                  alt="John Louie"
                  className="relative w-full h-full object-cover rounded-2xl
                    border-2 border-white/10 shadow-2xl"
                />
                {/* Available dot */}
                <div className="absolute -bottom-3 -right-3 flex items-center gap-2
                  px-3 py-1.5 rounded-full bg-white dark:bg-gray-900
                  border border-black/10 dark:border-white/10 shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                  </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Available</span>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.p variants={fadeUp} className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Hey! I'm{" "}
              <span className="text-gray-900 dark:text-white font-semibold">John Louie</span>, a passionate IT
              student with a deep love for building things on the web. I believe great
              software is a blend of engineering precision and thoughtful design.
            </motion.p>

            <motion.p variants={fadeUp} className="text-gray-600 dark:text-gray-400 leading-relaxed">
              My path into web development began with late-night experiments and endless curiosity. 
              Over time, it evolved into a commitment to creating scalable, user-centered products
              that balance aesthetics with functionality.
            </motion.p>

            <motion.p variants={fadeUp} className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When I'm not coding, I'm exploring the latest in tech,  and sharpening my problem-solving skills.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                <span className="text-sm">Open to internships &amp; freelance</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                <span className="text-sm">Quick learner &amp; team player</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: stats + card ── */}
          <motion.div
            variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {ABOUT_STATS.map((stat, i) => (
                <motion.div key={i} variants={fadeUp} custom={i}>
                  <StatCard {...stat} />
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              className="p-6 rounded-2xl border border-black/10 dark:border-white/10
                bg-gradient-to-br from-black/[0.03] dark:from-white/[0.05]
                to-black/[0.01] dark:to-white/[0.02] backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold mb-1">Currently Building</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Fleet Connect: A Multi Platform Fleet Management System built with React, Node.js, and PostgreSQL. It offers real-time tracking, Artificial Intelligence scheduling, and analytics to optimize fleet operations.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;