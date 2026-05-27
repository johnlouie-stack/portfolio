/**
 * Smooth-scrolls the window to the element with the given id,
 * offsetting for the fixed navbar height.
 * @param {string} id — the DOM element id to scroll to
 */
export function scrollTo(id) {
  const element = document.getElementById(id);
  if (!element) return;

  const offset =0; /*increase or decrease this number*/
  const top = element.offsetTop - offset;

  window.scrollTo({ top, behavior: "smooth" });
}