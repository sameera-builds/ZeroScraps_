import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "NGO Board", path: "/ngo" },
    { name: "Retailer", path: "/retailer" },
    { name: "Map", path: "/map" },
    { name: "Analytics", path: "/analytics" },
  ];

  return (
    <header className="border-b border-border bg-surface-alt">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand">
            <Leaf className="h-6 w-6 text-white" />
          </div>

          <span className="font-heading text-xl font-bold text-brand">
            ZeroScraps
          </span>
        </NavLink>

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

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-xl bg-accent px-5 py-2.5 font-body text-sm font-semibold text-white transition hover:opacity-90"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-xl p-2 text-text md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

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
                    isActive ? "text-accent" : "text-text-muted"
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