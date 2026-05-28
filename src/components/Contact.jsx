import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

import GlowOrb from "./GlowOrb.jsx";
import { IconSend, IconArrow, IconGithub, IconFacebook, IconInstagram } from "../assets/icons.jsx";
import { fadeUp, stagger } from "../utils/animations.js";
import { SOCIAL_LINKS } from "../utils/constants.js";

const SERVICE_ID  = "service_8ghlovl";
const TEMPLATE_ID = "template_73h5xmd";
const PUBLIC_KEY  = "R6XJ_MQWv07FpazaG";

const RATE_LIMIT_MS   = 60_000; // 1 minute between submissions
const MAX_MESSAGE_LEN = 2000;
const MIN_MESSAGE_LEN = 10;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SOCIAL_ICONS = {
  github: <IconGithub />, facebook: <IconFacebook />, instagram: <IconInstagram />,
};

// ── MX record check via Cloudflare DNS-over-HTTPS ──────────────────────────
// Confirms the email's domain actually has mail servers — catches fake domains
// like "sanfkasdas.com" that pass regex but can't receive email.
async function domainHasMxRecord(email) {
  const domain = email.split("@")[1];
  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`,
      { headers: { Accept: "application/dns-json" } }
    );
    if (!res.ok) return true; // network hiccup → don't block the user
    const data = await res.json();
    // Status 0 = NOERROR, and at least one Answer record means MX exists
    return data.Status === 0 && Array.isArray(data.Answer) && data.Answer.length > 0;
  } catch {
    return true; // fetch failed (offline, CORS, etc.) → fail open
  }
}

function isRateLimited() {
  try {
    const last = localStorage.getItem("lastMessageSent");
    return last && Date.now() - Number(last) < RATE_LIMIT_MS;
  } catch {
    return false; // localStorage unavailable (private browsing, etc.)
  }
}

function setRateLimitTimestamp() {
  try {
    localStorage.setItem("lastMessageSent", String(Date.now()));
  } catch {
    // silently fail
  }
}

// ── FormField ───────────────────────────────────────────────────────────────
const FormField = ({ label, name, type = "text", placeholder, value, onChange, required, error }) => (
  <motion.div variants={fadeUp}>
    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
      {label}
    </label>
    <input
      type={type} name={name} value={value} onChange={onChange}
      required={required} placeholder={placeholder}
      aria-invalid={!!error}
      className={`w-full px-4 py-3.5 rounded-xl
        bg-black/[0.04] dark:bg-white/[0.04]
        border transition-all duration-200 text-sm
        text-gray-900 dark:text-white
        placeholder-gray-400 dark:placeholder-gray-600
        focus:outline-none focus:ring-1
        ${error
          ? "border-red-400/60 focus:border-red-400/60 focus:ring-red-400/20"
          : "border-black/10 dark:border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20"
        }`}
    />
    {error && (
      <p className="mt-1.5 text-xs text-red-400">{error}</p>
    )}
  </motion.div>
);

// ── Contact ─────────────────────────────────────────────────────────────────
const Contact = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm]           = useState({ name: "", email: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus]       = useState("idle"); // "idle" | "sending" | "sent" | "error"
  const [errorMsg, setErrorMsg]   = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear individual field error on change
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = {
      name:    form.name.trim(),
      email:   form.email.trim(),
      message: form.message.trim(),
    };

    // ── Field-level validation ───────────────────────────────────
    const newFieldErrors = {};
    if (!trimmed.name)    newFieldErrors.name    = "Name is required.";
    if (!trimmed.email)   newFieldErrors.email   = "Email is required.";
    else if (!EMAIL_REGEX.test(trimmed.email)) newFieldErrors.email = "Enter a valid email address.";
    if (!trimmed.message) newFieldErrors.message = "Message is required.";
    else if (trimmed.message.length < MIN_MESSAGE_LEN)
      newFieldErrors.message = `Message must be at least ${MIN_MESSAGE_LEN} characters.`;
    else if (trimmed.message.length > MAX_MESSAGE_LEN)
      newFieldErrors.message = `Message must be under ${MAX_MESSAGE_LEN} characters.`;

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return; // stop — errors shown inline
    }

    // ── MX record check — verify domain can actually receive email ────
    // Catches fake domains like "sanfkasdas.com" that pass regex but don't exist.
    setStatus("sending"); // show spinner while DNS resolves
    const mxValid = await domainHasMxRecord(trimmed.email);
    if (!mxValid) {
      setFieldErrors({ email: "This email domain doesn't exist or can't receive mail." });
      setStatus("idle");
      return;
    }

    // ── Rate limit ───────────────────────────────────────────────
    if (isRateLimited()) {
      setErrorMsg("Please wait a minute before sending another message.");
      setStatus("error");
      setTimeout(() => { setStatus("idle"); setErrorMsg(""); }, 4000);
      return;
    }

    // ── Send ─────────────────────────────────────────────────────
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { name: trimmed.name, email: trimmed.email, message: trimmed.message },
        { publicKey: PUBLIC_KEY }
      );

      setRateLimitTimestamp();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setFieldErrors({});
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("[EmailJS] Error:", err);
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
      setTimeout(() => { setStatus("idle"); setErrorMsg(""); }, 4000);
    }
  };

  const messageCharsLeft = MAX_MESSAGE_LEN - form.message.length;

  const buttonLabel = {
    idle:    <><span>Send Message</span><span className="group-hover:translate-x-1 transition-transform duration-200"><IconSend /></span></>,
    sending: <span>Sending…</span>,
    sent:    <>✓ Message Sent!</>,
    error:   <>❌ {errorMsg || "Failed. Try again."}</>,
  };

  const buttonColors = {
    idle:    "from-cyan-500 to-violet-600 hover:shadow-cyan-500/20",
    sending: "from-cyan-500/60 to-violet-600/60 cursor-not-allowed",
    sent:    "from-green-500 to-emerald-600 hover:shadow-green-500/20",
    error:   "from-red-500 to-rose-600 hover:shadow-red-500/20",
  };

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 bg-white dark:bg-black overflow-hidden transition-colors duration-300"
    >
      <GlowOrb className="w-[400px] h-[400px] bg-[#eef2ff]/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* ── Heading ── */}
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

          {/* ── Form ── */}
          <motion.div
            variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              <FormField
                label="Your Name" name="name" placeholder="Juan Dela Cruz"
                value={form.name} onChange={handleChange} required
                error={fieldErrors.name}
              />
              <FormField
                label="Email Address" name="email" type="email"
                placeholder="juandelacruz@example.com"
                value={form.email} onChange={handleChange} required
                error={fieldErrors.email}
              />

              <motion.div variants={fadeUp}>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                    Message
                  </label>
                  <span className={`text-xs tabular-nums transition-colors ${
                    messageCharsLeft < 100 ? "text-red-400" : "text-gray-400 dark:text-gray-600"
                  }`}>
                    {messageCharsLeft} / {MAX_MESSAGE_LEN}
                  </span>
                </div>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  required rows={5} placeholder="Tell me about your project..."
                  aria-invalid={!!fieldErrors.message}
                  maxLength={MAX_MESSAGE_LEN}
                  className={`w-full px-4 py-3.5 rounded-xl
                    bg-black/[0.04] dark:bg-white/[0.04]
                    border transition-all duration-200 text-sm resize-none
                    text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-600
                    focus:outline-none focus:ring-1
                    ${fieldErrors.message
                      ? "border-red-400/60 focus:border-red-400/60 focus:ring-red-400/20"
                      : "border-black/10 dark:border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                    }`}
                />
                {fieldErrors.message && (
                  <p className="mt-1.5 text-xs text-red-400">{fieldErrors.message}</p>
                )}
              </motion.div>

              <motion.div variants={fadeUp}>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`group w-full sm:w-auto flex items-center justify-center gap-2.5
                    px-8 py-4 bg-gradient-to-r ${buttonColors[status]} text-white
                    font-semibold rounded-xl hover:shadow-xl
                    hover:scale-[1.02] transition-all duration-300`}
                >
                  {buttonLabel[status]}
                </button>
              </motion.div>

            </form>
          </motion.div>

          {/* ── Side info ── */}
          <motion.div
            variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { emoji: "📬", title: "Email",    content: "johnlouie@example.com" },
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