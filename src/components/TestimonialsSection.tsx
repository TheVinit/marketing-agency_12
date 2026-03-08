"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Imperium didn't just give us a campaign; they gave us a category-defining identity. Our Series B was oversubscribed within weeks of the launch.",
    name: "Ishaan Malhotra",
    role: "CEO, Nexa Systems",
  },
  {
    quote: "The cinematic quality of their production is unmatched. They turned our brand story into a cultural moment that resonated globally.",
    name: "Mira Kapoor",
    role: "Global Creative Lead",
  },
  {
    quote: "Their 360° approach is surgical. From OOH takeovers to digital funnels, every touchpoint felt cohesive and high-conversion.",
    name: "Arjun Singh",
    role: "Founder, Zenith D2C",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ padding: '6rem 0', background: '#f5f3ef', overflow: 'hidden' }}>
      <div style={{ margin: '0 auto', width: 'min(1120px, calc(100% - 3rem))' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#8a6b1f', marginBottom: 14 }}
          >
            Testimonials
          </motion.p>
          <h2 className="font-heading" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900, color: '#0a0a0a', lineHeight: 1.1, margin: 0 }}>
            Client Success Stories
          </h2>
        </div>

        <motion.div
          drag="x"
          dragConstraints={{ left: -700, right: 0 }}
          style={{ display: 'flex', gap: '1.5rem', cursor: 'grab' }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                minWidth: 340,
                flex: 1,
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 24,
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#c5a059', fontSize: 14 }}>★</span>
                ))}
              </div>
              {/* Quote */}
              <p className="font-heading" style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#0a0a0a', fontStyle: 'italic', margin: 0 }}>
                "{t.quote}"
              </p>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.25rem' }}>
                <div style={{
                  width: 46, height: 46, borderRadius: '50%',
                  background: 'rgba(197,160,89,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.1rem', fontWeight: 700, color: '#c5a059',
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0a0a0a', margin: '0 0 2px' }}>{t.name}</p>
                  <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8a6b1f', margin: 0 }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
