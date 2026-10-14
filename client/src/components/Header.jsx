import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV } from "../lib/content";
import { Logo } from "./Logo";
const linkBase = "rounded-full px-3.5 py-2 font-medium transition-colors";
export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (<header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
    <div className="wrap flex min-h-[4.25rem] items-center gap-6">
    <Link to="/" aria-label="Ethixweb home">
      <Logo />
    </Link>

    <nav aria-label="Main" className="ml-auto hidden gap-1 md:flex">
      {NAV.map((n) => (<NavLink key={n.to} to={n.to} end className={({ isActive }) => `${linkBase} ${isActive ? "font-semibold text-brand" : "text-ink-soft hover:bg-wash hover:text-ink"}`}>
        {n.label}
      </NavLink>))}
    </nav>
    <Link to="/contact" className="btn btn-primary btn-sm hidden md:inline-flex">
      Get a free consultation
    </Link>

    <button type="button" className="ml-auto grid size-11 place-items-center rounded-xl border border-line bg-white text-ink md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)}>
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path d={open ? "M5 5l12 12M17 5L5 17" : "M3 6h16M3 11h16M3 16h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
    </div>

    <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="grid gap-1 border-t border-line bg-white px-5 pt-3 pb-5 md:hidden!">
    {NAV.map((n) => (<NavLink key={n.to} to={n.to} end className={({ isActive }) => `border-b border-line py-3.5 font-medium ${isActive ? "text-brand" : "text-ink"}`}>
      {n.label}
      </NavLink>))}
    <Link to="/contact" className="btn btn-primary mt-3">
      Get a free consultation
    </Link>
    </nav>
  </header>);
}
