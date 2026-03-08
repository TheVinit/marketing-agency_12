"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Discovery Call",
    description: "We map where your brand is today, your growth goals, and your runway for experimentation.",
  },
  {
    title: "Strategy Creation",
    description: "Channel mix, creative angles, and media plan built into a single 360° campaign blueprint.",
  },
  {
    title: "Campaign Execution",
    description: "Production, placement, and optimization handled end-to-end with weekly performance rituals.",
  },
  {
    title: "Growth & Optimization",
    description: "We compound what works, sunset what does not, and build always-on growth systems.",
  },
];

export function ProcessSection() {
  return (
    <section aria-label="Process" style={{ padding: '6rem 0', background: '#f5f3ef' }}>
      <div style={{ margin: '0 auto', width: 'min(1120px, calc(100% - 3rem))' }}>
        <div style={{ maxWidth: 600, marginBottom: '3.5rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#c5a059', marginBottom: 14 }}
          >
            Process
          </motion.p>
          <h2 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 700, color: '#0a0a0a', lineHeight: 1.15, margin: '0 0 1rem' }}>
            How We Architect Growth
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.65, color: '#52525b', margin: 0 }}>
            A 4-step system designed for speed, scale, and radical transparency.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
              style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: 20,
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                padding: '1.75rem',
                transition: 'box-shadow 0.3s, border-color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(197,160,89,0.3)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.06)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(197,160,89,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 900, color: '#8a6b1f',
                marginBottom: '1.25rem',
                fontFamily: 'Playfair Display, serif',
              }}>
                0{index + 1}
              </div>
              <h3 className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a0a0a', margin: '0 0 0.5rem' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#52525b', margin: 0 }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
