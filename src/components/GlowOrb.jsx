/**
 * GlowOrb — an absolutely-positioned blurred circle used as a decorative
 * ambient light effect behind sections.
 *
 * @param {string} className — Tailwind classes for size, color, and position
 */
const GlowOrb = ({ className }) => (
  <div
    aria-hidden="true"
    className={`absolute rounded-full pointer-events-none blur-3xl opacity-20 ${className}`}
  />
);

export default GlowOrb;
