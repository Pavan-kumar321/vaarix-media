import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
const links = [["Services", "services"], ["Work", "work"], ["Results", "results"]];
export function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return <header className="site-header">
    <nav className="container mx-auto flex min-h-20 items-center justify-between gap-3 px-5 md:px-12" aria-label="Main navigation">
      <a href="#top" onClick={() => setOpen(false)} className="shrink-0 font-serif text-2xl font-bold tracking-tight sm:text-3xl">Vaarix Media.</a>
      <div className="hidden items-center gap-7 text-sm font-medium lg:flex">{links.map(([label,id]) => <a key={id} href={`#${id}`} className="hover:text-primary">{label}</a>)}</div>
      <div className="flex items-center gap-2">
        <a href="#contact" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 text-xs font-semibold text-white sm:px-6 sm:text-sm">Book a call</a>
        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-border lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
    </nav>
    {open && <div id="mobile-navigation" className="container mx-auto grid gap-1 border-t border-border bg-background px-5 py-3 lg:hidden">{links.map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-medium hover:bg-secondary">{label}</a>)}</div>}
  </header>;
}
