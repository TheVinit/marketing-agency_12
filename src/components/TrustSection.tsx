"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = { label: string; value: number; suffix?: string; };

const stats: Stat[] = [
  { label: "Revenue Generated", value: 250, suffix: "M+" },
  { label: "Global Partners", value: 85, suffix: "+" },
  { label: "Viral Reach", value: 500, suffix: "M+" },
];

function useCountUp(target: number, active: boolean, duration = 2.5) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame: number;
    const start = performance.now();
    const animate = (time: number) => {
      // Use easeOutQuint for smoother deceleration
      const p = Math.min(1, (time - start) / (duration * 1000));
      const progress = 1 - Math.pow(1 - p, 5);
      setValue(Math.floor(target * progress));
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);
  return value;
}

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useCountUp(stat.value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.26, 0.9, 0.33, 1] }}
      style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: 20,
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        padding: '1.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#6b7280', margin: 0 }}>
        {stat.label}
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#0a0a0a' }}>{value}</span>
        {stat.suffix && (
          <span style={{ fontSize: '1.4rem', color: '#c5a059', fontWeight: 700 }}>{stat.suffix}</span>
        )}
      </div>
      <p style={{ fontSize: '0.75rem', lineHeight: 1.5, color: '#6b7280', margin: 0 }}>
        Crafted strategies across performance, brand, and experiential campaigns.
      </p>
    </motion.div>
  );
}

export function TrustSection() {
  return (
    <section aria-label="Social proof" style={{ padding: '6rem 0', background: 'rgba(255, 255, 255, 0.4)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: -100, top: '50%', transform: 'translateY(-50%)', width: 380, height: 380, borderRadius: '50%', background: 'rgba(197,160,89,0.06)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ margin: '0 auto', width: 'min(1200px, calc(100% - 3rem))', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'flex-end' }}>
          <div style={{ maxWidth: 520 }}>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: '#8a6b1f', marginBottom: 16 }}
            >
              Proof Of Execution
            </motion.p>
            <h2 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, color: '#0a0a0a', lineHeight: 1.1, margin: '0 0 1rem' }}>
              Measurable Impact Over Empty Promises.
            </h2>
            <p style={{ maxWidth: 420, fontSize: '1.05rem', lineHeight: 1.7, color: '#52525b', margin: 0 }}>
              We've architected growth for unicorn startups and category leaders.
              Our systems turn attention into equity.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} delay={0.1 + index * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
