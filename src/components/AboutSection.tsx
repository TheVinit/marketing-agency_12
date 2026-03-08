"use client";

import { useState, useEffect, useRef } from "react";

const T = {
  bg: "#e8e4db",
  bgAlt: "#ded8cb",
  fg: "#0a0a0a",
  gold: "#c5a059",
  goldLight: "#D4AF33",
  goldDark: "#8a6b1f",
  muted: "#6b7280",
  white: "#ffffff",
  darkBg: "#0f1012",
  darkCard: "#16171a",
};

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const team = [
  {
    name: "Rutuja Khadse",
    role: "Founder & Brand Strategist",
    bio: "Architect of brand narratives. Turns business ambitions into market dominance.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    name: "Aryan Verma",
    role: "Creative Director",
    bio: "Translates briefs into cinematic visual stories that refuse to be forgotten.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Neha Patil",
    role: "Head of Digital Content",
    bio: "Engineers content that earns attention organically and converts deliberately.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Sahil Mehta",
    role: "Performance Marketing Lead",
    bio: "Optimizes every rupee spent into maximum brand acceleration and ROI.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
];

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const [hov, setHov] = useState(false);
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        background: T.white,
        border: `1.5px solid ${hov ? T.gold : "rgba(197,160,89,0.18)"}`,
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: hov
          ? "0 24px 60px rgba(197,160,89,0.18)"
          : "0 2px 16px rgba(10,10,10,0.06)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      {/* Photo */}
      <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
        <img
          src={member.photo}
          alt={member.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
            display: "block",
          }}
        />
        {/* Subtle overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: hov
            ? "linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.45))"
            : "linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.3))",
          transition: "background 0.4s",
        }} />
        {/* Role pill over image */}
        <div style={{
          position: "absolute", bottom: "0.9rem", left: "1rem",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          border: `1px solid rgba(197,160,89,0.4)`,
          borderRadius: "100px",
          padding: "4px 12px",
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.55rem", letterSpacing: "0.18em",
            color: T.goldLight, fontWeight: 700,
          }}>{member.role.toUpperCase()}</span>
        </div>
      </div>

      {/* Text */}
      <div style={{ padding: "1.4rem 1.5rem 1.6rem" }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.15rem", fontWeight: 800,
          color: T.fg, marginBottom: "0.45rem",
          letterSpacing: "-0.01em",
        }}>{member.name}</h3>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.97rem", color: T.muted,
          lineHeight: 1.7, fontStyle: "italic",
        }}>{member.bio}</p>
      </div>

      {/* Gold bottom line on hover */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, ${T.goldDark}, ${T.goldLight}, ${T.goldDark})`,
        opacity: hov ? 1 : 0,
        transition: "opacity 0.35s",
      }} />
    </div>
  );
}

export function AboutSection() {
  const heroRef = useInView(0.1);
  const mvRef = useInView(0.1);
  const teamRef = useInView(0.1);

  return (
    <div id="about" style={{ background: T.bg, fontFamily: "sans-serif", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Courier+Prime:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:.9} }
        @keyframes float { 0%,100%{transform:translate(0,0)} 50%{transform:translate(14px,-18px)} }
      `}</style>

      {/* Ambient orbs */}
      <div style={{ position: "absolute", top: "5%", left: "-6%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,160,89,0.08) 0%, transparent 70%)", animation: "float 14s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "8%", right: "-4%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,160,89,0.06) 0%, transparent 70%)", animation: "float 18s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }} />



      {/* ── MISSION & VISION ── */}
      <section ref={mvRef.ref} style={{ position: "relative", zIndex: 1, padding: "3rem 6vw 6rem", background: "linear-gradient(to bottom, #ded8cb 0%, #0f1012 100%)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 900, color: T.white,
              marginBottom: "1rem"
            }}>
              Our Core <em style={{ color: T.gold, fontStyle: "italic" }}>Philosophy</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontStyle: "italic" }}>
              The principles that drive every strategy we architect.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "2rem" }}>
            {[
              {
                num: "01", label: "OUR MISSION",
                icon: "◈",
                title: "Democratize World-Class Marketing",
                body: "Every ambitious brand — regardless of size — deserves access to the strategic firepower that transforms markets. We close that gap through 360° execution across digital and physical channels, giving bold brands the unfair advantage they've earned.",
                delay: 0,
              },
              {
                num: "02", label: "OUR VISION",
                icon: "◉",
                title: "The Sharpest Marketing Studio in the Region",
                body: "By 2030, we will be the defining marketing intelligence partner for brands across South Asia and beyond. Not the biggest — the sharpest. Where AI-driven strategy meets cinematic execution, every client partnership ends with a brand that has outgrown its market.",
                delay: 0.12,
              },
            ].map((item, i) => {
              const { ref, inView } = useInView();
              return (
                <div
                  key={i} ref={ref}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                    transition: `opacity 0.65s ease ${item.delay}s, transform 0.65s ease ${item.delay}s, box-shadow 0.3s`,
                    background: T.darkCard,
                    border: `1.5px solid rgba(197,160,89,0.3)`,
                    borderRadius: "28px",
                    padding: "3rem 2.5rem",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(197,160,89,0.05)",
                    position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 30px 60px rgba(0,0,0,0.7), inset 0 0 40px rgba(197,160,89,0.1)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(197,160,89,0.05)"}
                >
                  {/* Top gold bar */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${T.goldDark}, ${T.goldLight}, ${T.goldDark})` }} />

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: "14px",
                      background: `linear-gradient(135deg, rgba(197,160,89,0.2), rgba(197,160,89,0.05))`,
                      border: "1px solid rgba(197,160,89,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.4rem", color: T.goldLight,
                    }}>{item.icon}</div>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", color: T.gold, fontWeight: 700 }}>{item.num} / {item.label}</p>
                    </div>
                  </div>

                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.5rem, 2.5vw, 1.95rem)",
                    fontWeight: 900, color: T.white,
                    marginBottom: "1.2rem", letterSpacing: "-0.015em", lineHeight: 1.2,
                  }}>{item.title}</h3>

                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.1rem", color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.85, fontStyle: "italic",
                  }}>{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section ref={teamRef.ref} style={{
        position: "relative", zIndex: 1,
        padding: "6rem 6vw 7rem",
        background: T.darkBg,
        borderTop: `1px solid rgba(197,160,89,0.13)`,
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          {/* Section header */}
          <div style={{
            opacity: teamRef.inView ? 1 : 0,
            transform: teamRef.inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            textAlign: "center", marginBottom: "3.5rem",
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", letterSpacing: "0.38em", color: T.gold, fontWeight: 700, marginBottom: "0.65rem" }}> THE TEAM</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900,
              color: T.white, letterSpacing: "-0.02em",
            }}>
              Strategists. Creatives.<br />
              <em style={{ color: T.gold, fontStyle: "italic" }}>Obsessives.</em>
            </h2>
          </div>

          {/* Team grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: "1.75rem" }}>
            {team.map((m, i) => <TeamCard key={i} member={m} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div style={{
        padding: "1.4rem 6vw",
        borderTop: `1px solid rgba(197,160,89,0.15)`,
        background: "#0a0b0d",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem",
        position: "relative", zIndex: 1,
      }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.57rem", letterSpacing: "0.22em", color: T.gold, opacity: 0.65, fontWeight: 700 }}>MARKETSPARK STUDIO</span>
        <em style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", color: T.gold, opacity: 0.7 }}>Where Brands Become Inevitable.</em>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.57rem", letterSpacing: "0.22em", color: T.gold, opacity: 0.65, fontWeight: 700 }}>PREMIUM 360° STUDIO</span>
      </div>
    </div>
  );
}
