import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import GlowOrb from "./GlowOrb.jsx";
import { IconSend, IconArrow, IconGithub, IconLinkedin, IconTwitter } from "../assets/icons.jsx";
import { fadeUp, stagger } from "../utils/animations.js";
import { SOCIAL_LINKS } from "../utils/constants.js";

const SOCIAL_ICONS = {
  github: <IconGithub />, linkedin: <IconLinkedin />, twitter: <IconTwitter />,
};

const FormField = ({ label, name, type = "text", placeholder, value, onChange, required }) => (
  <motion.div variants={fadeUp}>
    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</label>
    <input
      type={type} name={name} value={value} onChange={onChange}
      required={required} placeholder={placeholder}
      className="w-full px-4 py-3.5 rounded-xl
        bg-black/[0.04] dark:bg-white/[0.04]
        border border-black/10 dark:border-white/10
        text-gray-900 dark:text-white
        placeholder-gray-400 dark:placeholder-gray-600
        focus:outline-none focus:border-cyan-500/50
        focus:ring-1 focus:ring-cyan-500/20
        transition-all duration-200 text-sm"
    />
  </motion.div>
);

const Contact = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent]  = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 bg-white dark:bg-black overflow-hidden transition-colors duration-300"
    >
      <GlowOrb className="w-[400px] h-[400px] bg-[#eef2ff]/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-cyan-500 dark:text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Let's Connect
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
            Get In{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 mt-4 max-w-lg mx-auto">
            Have a project in mind or just want to say hi? My inbox is always open.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          <motion.div
            variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <FormField label="Your Name" name="name" placeholder="Juan Dela Cruz" value={form.name} onChange={handleChange} required />
              <FormField label="Email Address" name="email" type="email" placeholder="juandelacruz@example.com" value={form.email} onChange={handleChange} required />

              <motion.div variants={fadeUp}>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Message</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  required rows={5} placeholder="Tell me about your project..."
                  className="w-full px-4 py-3.5 rounded-xl
                    bg-black/[0.04] dark:bg-white/[0.04]
                    border border-black/10 dark:border-white/10
                    text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-600
                    focus:outline-none focus:border-cyan-500/50
                    focus:ring-1 focus:ring-cyan-500/20
                    transition-all duration-200 text-sm resize-none"
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <button
                  type="submit"
                  className="group w-full sm:w-auto flex items-center justify-center gap-2.5
                    px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 text-white
                    font-semibold rounded-xl hover:shadow-xl hover:shadow-cyan-500/20
                    hover:scale-[1.02] transition-all duration-300"
                >
                  {sent ? <>✓ Message Sent!</> : (
                    <>Send Message <span className="group-hover:translate-x-1 transition-transform duration-200"><IconSend /></span></>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { emoji: "📬", title: "Email", content: "johnlouie@example.com" },
              { emoji: "📍", title: "Location", content: "Caloocan City, Philippines" },
            ].map(({ emoji, title, content }) => (
              <motion.div key={title} variants={fadeUp}
                className="p-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07]"
              >
                <h3 className="text-gray-900 dark:text-white font-semibold mb-1">{emoji} {title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{content}</p>
              </motion.div>
            ))}

            <motion.div variants={fadeUp}
              className="p-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07]"
            >
              <h3 className="text-gray-900 dark:text-white font-semibold mb-3">🌐 Social Media</h3>
              <div className="space-y-3">
                {SOCIAL_LINKS.map(({ key, label, href }) => (
                  <a key={key} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-500 dark:text-gray-400
                      hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/[0.05]
                      group-hover:bg-cyan-500/10 flex items-center justify-center transition-colors duration-200">
                      {SOCIAL_ICONS[key]}
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                    <IconArrow />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;