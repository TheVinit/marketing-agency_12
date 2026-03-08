
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer style={{ position: 'relative', overflow: 'hidden', background: '#000', paddingTop: '6rem', paddingBottom: '3rem', color: '#fff', zIndex: 2, isolation: 'isolate' }}>
      {/* Background Glows */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 500, height: 500, transform: 'translate(25%, 25%)', borderRadius: '50%', background: 'rgba(197,160,89,0.08)', filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: 300, height: 300, transform: 'translate(-50%, -50%)', borderRadius: '50%', background: 'rgba(197,160,89,0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ margin: '0 auto', width: 'min(1200px, calc(100% - 3rem))', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <a href="/" className="font-heading" style={{
              fontSize: '1.3rem', fontWeight: 900, letterSpacing: '0.22em',
              textTransform: 'uppercase', textDecoration: 'none', color: '#fff',
            }}>
              IMPERIUM <span className="gold-gradient">STUDIO</span>
            </a>
            <p style={{ maxWidth: 260, fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              An elite marketing collective architecting demand through
              cinematic craft and high-performance strategy.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {["Li", "Ig", "Tw", "Be"].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 42, height: 42, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none', transition: 'border-color 0.3s, background 0.3s, color 0.3s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = '#c5a059';
                    el.style.background = '#c5a059';
                    el.style.color = '#000';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(255,255,255,0.1)';
                    el.style.background = 'transparent';
                    el.style.color = 'rgba(255,255,255,0.6)';
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#8a6b1f', margin: 0 }}>
              Navigation
            </h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[["#hero", "The Studio"], ["#services", "Our Arsenal"], ["#portfolio", "Gallery"], ["#about", "Philosophy"], ["#contact", "Contact"]].map(([href, label]) => (
                <a key={label} href={href} style={{ fontSize: '0.875rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#8a6b1f', margin: 0 }}>
              Expertise
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {["Cinematic Films", "Growth Engineering", "Physical Domination", "Founder Authority", "Web Ecosystems"].map(item => (
                <li key={item} style={{ fontSize: '0.875rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s', cursor: 'default' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Inquiries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 28, padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#8a6b1f', margin: 0 }}>
              Inquiries
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              Interested in category dominance? Reach out directly.
            </p>
            <a href="mailto:hello@imperium.studio" style={{
              fontSize: '1.05rem', fontWeight: 900, color: '#fff',
              textDecoration: 'underline', textUnderlineOffset: 6,
              textDecorationColor: 'rgba(197,160,89,0.4)',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c5a059'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
            >
              hello@360marketing.com
            </a>
            <div>
              <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#6b6b6b', margin: '0 0 4px' }}>Operating Globally</p>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Mumbai • Bangalore • Remote</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          marginTop: '5rem', paddingTop: '2.5rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', gap: '1rem',
          fontSize: 10, fontWeight: 900,
          textTransform: 'uppercase', letterSpacing: '0.3em', color: '#4b4b4b',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} Imperium Studio</p>
            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.1)' }} />
            <p style={{ margin: 0 }}>All Rights Reserved</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <a href="#" style={{ color: '#4b4b4b', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4b4b4b'}
            >Privacy</a>
            <a href="#" style={{ color: '#4b4b4b', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4b4b4b'}
            >Terms</a>
            <span className="gold-gradient">Built for visionaries</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
