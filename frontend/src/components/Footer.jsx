import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

const nav = [
  { heading: "Product", links: [{ label: "Dashboard", to: "/dashboard" }, { label: "Analytics", to: "/analytics" }, { label: "Features", to: "/features" }] },
  { heading: "Resources", links: [{ label: "How It Works", to: "/features" }, { label: "GitHub", href: "https://github.com/abbasdx" }, { label: "Changelog", href: "https://github.com/abbasdx" }] },
  { heading: "Connect", links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/abbas-ansari" }, { label: "X / Twitter", href: "https://x.com/_abbasansari" }, { label: "Portfolio", href: "https://abbasansari.me" }] }
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/[0.04] bg-[#030712] py-10 md:py-16">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        
        {/* ✨ PERFECT RESPONSIVE GRID ✨ */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12">
          
          {/* Brand spans full width on Mobile & Tablet, 1 column on Desktop */}
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:col-span-1">
            <Link to="/" onClick={scrollToTop} className="w-max text-xl font-bold tracking-tight text-white transition-colors hover:text-indigo-400">
              TaskTracker
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">Stay organized. Get things done. A simple way to manage tasks and stay productive every day.</p>
            <div className="mt-2 flex gap-4">
              <a href="https://github.com/abbasdx" target="_blank" rel="noreferrer" className="text-slate-500 transition-colors hover:text-white"><Github size={20} strokeWidth={1.5} /></a>
              <a href="https://www.linkedin.com/in/abbas-ansari" target="_blank" rel="noreferrer" className="text-slate-500 transition-colors hover:text-[#0A66C2]"><Linkedin size={20} strokeWidth={1.5} /></a>
              <a href="https://x.com/_abbasansari" target="_blank" rel="noreferrer" className="text-slate-500 transition-colors hover:text-white"><Twitter size={20} strokeWidth={1.5} /></a>
            </div>
          </div>

          {nav.map((col) => (
            <div key={col.heading} className="col-span-1">
              <h6 className="mb-5 text-xs font-semibold uppercase tracking-wider text-slate-100">{col.heading}</h6>
              <ul className="flex flex-col gap-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link to={l.to} onClick={scrollToTop} className="text-sm text-slate-400 transition-colors hover:text-white">{l.label}</Link>
                    ) : (
                      <a href={l.href} target="_blank" rel="noreferrer" className="text-sm text-slate-400 transition-colors hover:text-white">{l.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 sm:mt-16 sm:flex-row">
          <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} TaskTracker Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-xs text-slate-500">Built with <span className="text-sm text-indigo-500">♥</span> by Abbas</p>
        </div>
      </div>
    </footer>
  );
}