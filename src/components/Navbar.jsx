import {
  Leaf,
  Menu,
  X,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const languages = [
    "English",
    "हिन्दी",
    "বাংলা",
    "தமிழ்",
    "తెలుగు",
    "मराठी",
    "ગુજરાતી",
  ];

  const links = [
    { name: t.home, path: "/" },
    { name: t.ngoBoard, path: "/ngo" },
    { name: t.retailer, path: "/retailer" },
    { name: t.map, path: "/map" },
    { name: t.analytics, path: "/analytics" },
  ];

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setLanguageOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-alt">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand">
            <Leaf className="h-6 w-6 text-white" />
          </div>

          <span className="font-heading text-xl font-bold text-brand">
            ZeroScraps
          </span>
        </NavLink>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-body text-sm font-medium transition ${
                  isActive
                    ? "text-accent"
                    : "text-text hover:text-brand"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 font-body text-sm font-medium text-text transition hover:bg-surface-alt"
            >
              <Globe size={18} />

              <span>{language}</span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  languageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Language dropdown */}
            {languageOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border border-border bg-surface p-2 shadow-lg">

                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left font-body text-sm transition hover:bg-surface-alt ${
                      language === lang
                        ? "font-semibold text-accent"
                        : "text-text"
                    }`}
                  >
                    <span>{lang}</span>

                    {language === lang && (
                      <span>✓</span>
                    )}
                  </button>
                ))}

              </div>
            )}
          </div>

          {/* Sign in */}
          <button className="rounded-xl bg-accent px-5 py-2.5 font-body text-sm font-semibold text-white transition hover:opacity-90">
            {t.signIn}
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl p-2 text-text md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={25} />
            ) : (
              <Menu size={25} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-border bg-surface-alt px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5">

            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `font-body text-base font-medium ${
                    isActive
                      ? "text-accent"
                      : "text-text-muted"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;