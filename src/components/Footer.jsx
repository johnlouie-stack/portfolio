import { IconCode, IconGithub, IconLinkedin, IconTwitter } from "../assets/icons.jsx";
import { NAV_LINKS, SOCIAL_LINKS } from "../utils/constants.js";
import { scrollTo } from "../utils/scrollTo.js";

const SOCIAL_ICONS = {
  github: <IconGithub />, linkedin: <IconLinkedin />, twitter: <IconTwitter />,
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-50 dark:bg-black border-t border-black/[0.06] dark:border-white/[0.06] py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
              <IconCode />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-sm">
              John<span className="text-cyan-400">.</span>dev
            </span>
          </div>

          <p className="text-gray-500 dark:text-gray-600 text-sm text-center">
            © {year} John Louie. 
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ key, href, label }) => (
              <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-600
                  hover:text-cyan-500 dark:hover:text-cyan-400
                  hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
              >
                {SOCIAL_ICONS[key]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link)}
              className="text-xs text-gray-500 dark:text-gray-600
                hover:text-gray-700 dark:hover:text-gray-400 capitalize transition-colors duration-200"
            >
              {link}
            </button>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;