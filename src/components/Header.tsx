import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navBg = scrolled || menuOpen
    ? "rgba(255,255,255,0.95)"
    : "rgba(255,255,255,0.5)";

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center' }}
      >
        <div
          style={{
            marginTop: 16,
            width: 'min(1120px, calc(100% - 1.5rem))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 999,
            border: '1px solid rgba(0,0,0,0.07)',
            padding: isMobile ? '10px 16px' : '10px 20px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: navBg,
            boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.08)' : 'none',
            transition: 'background 0.5s, box-shadow 0.5s',
          }}
        >
          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', opacity: 1, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.7'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
          >
            <img src="/marketspark_logo1-removebg-preview.png" alt="360° Marketing Logo" style={{ height: isMobile ? 32 : 42, width: 'auto', objectFit: 'contain', transform: 'scale(3)', transformOrigin: 'left center' }} />
          </a>

          {!isMobile && (
            <>
              {/* Desktop Nav links */}
              <nav style={{ display: 'flex', alignItems: 'center', gap: 40, listStyle: 'none', margin: 0, padding: 0 }}>
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="nav-link"
                    style={{
                      fontSize: 11, fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      color: '#3f3f3f',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c5a059'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#3f3f3f'}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Desktop CTA */}
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 999,
                  background: '#000',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  padding: '10px 22px',
                  textDecoration: 'none',
                  transition: 'background 0.3s, color 0.3s, transform 0.2s',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#c5a059';
                  el.style.color = '#000';
                  el.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#000';
                  el.style.color = '#fff';
                  el.style.transform = 'scale(1)';
                }}
              >
                Start Your Brand Journey
              </a>
            </>
          )}

          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                color: '#000'
              }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 80,
              left: 16,
              right: 16,
              background: '#fff',
              borderRadius: 24,
              padding: '24px',
              zIndex: 40,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#0a0a0a',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {item.label}
                  <span style={{ color: '#c5a059', fontSize: 20 }}>→</span>
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 999,
                background: '#0a0a0a',
                color: '#fff',
                fontSize: 12,
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                padding: '16px',
                textDecoration: 'none',
                width: '100%',
                marginTop: '8px'
              }}
            >
              Start Your Brand Journey
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
