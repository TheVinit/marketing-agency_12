"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import reelImg1 from '../assets/WhatsApp Image 2026-03-07 at 3.05.19 PM (2).jpeg';
import reelImg2 from '../assets/WhatsApp Image 2026-03-07 at 3.05.19 PM (1).jpeg';
import reelImg3 from '../assets/WhatsApp Image 2026-03-07 at 3.05.19 PM.jpeg';

/* ─────────────── Design Tokens ─────────────── */
const T = {
  bg: "#e8e4db",
  bgAlt: "#ded8cb",
  fg: "#0a0a0a",
  gold: "#c5a059",
  goldLight: "#D4AF33",
  goldDark: "#8a6b1f",
  muted: "#6b7280",
  white: "#ffffff",
  black: "#000000",
  radius: "20px",
};

/* ─────────────── Service Data with Unsplash images ─────────────── */
type Service = {
  id: number; title: string; tag: string; icon: string;
  desc: string; detail: string; bullets: string[];
  img: string; imgAlt: string; color: string;
};

const allServices: Service[] = [
  {
    id: 1, title: "Product Shoots", tag: "VISUAL", icon: "✦",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
    imgAlt: "Product photography setup with professional lighting",
    color: "#2d1f0e",
    desc: "Cinematic product photography that transforms your offerings into desire.",
    detail: "Every product has a story — we tell it through light, texture, and composition. Our cinematic shoots don't just photograph products, they architect desire. From minimalist flat-lays to immersive lifestyle contexts, each frame is engineered to stop the scroll and convert browsers into buyers.",
    bullets: ["Studio & on-location shoots", "360° product views", "Lifestyle context photography", "Same-day editing & delivery", "E-commerce optimized formats"],
  },
  {
    id: 2, title: "Reels Creation", tag: "CONTENT", icon: "◈",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    imgAlt: "Person filming vertical video content on smartphone",
    color: "#0e1a2d",
    desc: "Scroll-stopping short-form content crafted with precision.",
    detail: "We don't make videos — we manufacture virality. Every reel is strategically crafted with hooks, pacing, and sound design that the algorithm rewards. From concept to caption, we handle the entire pipeline so your brand shows up in front of thousands daily.",
    bullets: ["Hook-first scripting", "Trend-reactive production", "Sound & music licensing", "Caption & hashtag strategy", "Multi-platform formatting"],
  },
  {
    id: 3, title: "Event Videography", tag: "FILM", icon: "◉",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    imgAlt: "Professional videographer filming at a corporate event",
    color: "#1a0e2d",
    desc: "Every milestone, immortalized. We capture the energy that defines you.",
    detail: "Brand launches, galas, product reveals, corporate milestones — every event is a story worth telling beautifully. Our multi-camera crews capture the atmosphere, the emotion, and the details that make your moments unforgettable and shareable for years to come.",
    bullets: ["Multi-camera setup", "Drone aerial coverage", "Same-day highlight reels", "Full event documentation", "Raw footage delivery"],
  },
  {
    id: 4, title: "Video Editing", tag: "POST", icon: "◫",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    imgAlt: "Video editing workstation with color grading software",
    color: "#0e2218",
    desc: "Raw footage refined into cinematic gold. Every cut intentional.",
    detail: "The magic happens in post. Our editors transform raw footage into polished, cinematic content with precision color grading, seamless cuts, immersive sound design, and motion graphics that elevate your brand's visual language to a premium tier.",
    bullets: ["Cinematic color grading", "Motion graphics & titles", "Sound design & mixing", "Multi-format export", "Unlimited revisions"],
  },
  {
    id: 5, title: "LinkedIn Management", tag: "SOCIAL", icon: "◬",
    img: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&q=80",
    imgAlt: "Professional working on LinkedIn strategy on laptop",
    color: "#0a1628",
    desc: "Position you as the thought leader your industry needs.",
    detail: "LinkedIn is where business decisions are made. We transform your profile into a lead-generating machine — crafting authority content, optimizing your presence, and building genuine connections that translate into real business opportunities and industry recognition.",
    bullets: ["Profile optimization & SEO", "Thought leadership content", "Weekly posting schedule", "Engagement & DM management", "Monthly analytics reports"],
  },
  {
    id: 6, title: "Copywriting", tag: "COPY", icon: "◭",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    imgAlt: "Writer crafting compelling copy at a clean workspace",
    color: "#1a1208",
    desc: "Words that seduce, convert, and compel. Voice articulated with precision.",
    detail: "Words are your most powerful sales tool. We craft copy that doesn't just describe — it seduces. From brand manifestos to product pages, email sequences to ad scripts, every word is chosen with surgical precision to move your audience from awareness to action.",
    bullets: ["Brand voice development", "Website & landing pages", "Email sequences", "Ad copy & scripts", "Social media captions"],
  },
  {
    id: 7, title: "Graphic Design", tag: "DESIGN", icon: "◮",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    imgAlt: "Creative graphic designer working on brand identity",
    color: "#1a0a1a",
    desc: "Visual identities that command attention. Every pixel purposeful.",
    detail: "Great design isn't decoration — it's communication. We build visual systems that make your brand instantly recognizable, deeply trustworthy, and undeniably premium. From logos to full brand identities, every design decision serves your business goals.",
    bullets: ["Brand identity & logo", "Social media templates", "Marketing collateral", "Packaging design", "Brand style guides"],
  },
  {
    id: 8, title: "Billboard Advertising", tag: "OOH", icon: "▣",
    img: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&q=80",
    imgAlt: "Large illuminated billboard in busy city intersection",
    color: "#1a1000",
    desc: "Own the skyline. Burn your brand into the city's consciousness.",
    detail: "Go beyond the screen. Our outdoor advertising campaigns strategically place your brand in high-traffic locations where your audience lives, works, and commutes. High-impact placements that build the kind of brand recognition that digital alone can't achieve.",
    bullets: ["Location strategy & scouting", "Creative design for OOH", "Vendor negotiation", "Campaign monitoring", "Performance reporting"],
  },
  {
    id: 9, title: "Brand Collaboration", tag: "COLLAB", icon: "▤",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    imgAlt: "Two professionals shaking hands in a collaborative meeting",
    color: "#0a1a10",
    desc: "Strategic partnerships that amplify reach and credibility.",
    detail: "The right collaboration can transform your brand's trajectory overnight. We identify, negotiate, and manage strategic partnerships between complementary brands — creating campaigns that tap into new audiences, boost credibility, and generate authentic buzz that money alone can't buy.",
    bullets: ["Partner identification & vetting", "Campaign concept development", "Contract negotiation support", "Co-marketing execution", "ROI tracking & reporting"],
  },
  {
    id: 10, title: "Business Card Design", tag: "PRINT", icon: "▥",
    img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80",
    imgAlt: "Premium luxury business cards with foil printing",
    color: "#1a1510",
    desc: "Your first impression, perfected. Tactile luxury pieces people keep.",
    detail: "In a digital world, a beautifully crafted physical card is unforgettable. We design business cards that are genuine objects of desire — premium finishes, thoughtful typography, and tactile materials that communicate your brand's quality before you've said a word.",
    bullets: ["Custom die-cut shapes", "Foil & emboss finishes", "Premium paper stocks", "Double-sided design", "Print-ready files + vendor"],
  },
  {
    id: 11, title: "SEO Content Strategy", tag: "DIGITAL", icon: "⌬",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    imgAlt: "Analytics dashboard with growth charts",
    color: "#0f1c24",
    desc: "Data-driven storytelling designed to own search engines.",
    detail: "We engineer content that doesn't just sound good but is structured to dominate search rankings. By pairing high-end copywriting with rigorous technical SEO, we ensure your brand captures intent at every stage of the customer journey.",
    bullets: ["Keyword & Competitor Analysis", "Technical SEO Audits", "Authority Blog Posts", "On-page Optimization", "Link-building Strategies"],
  },
  {
    id: 12, title: "Custom Merchandise", tag: "PHYSICAL", icon: "▨",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    imgAlt: "Row of premium branded apparel",
    color: "#211a14",
    desc: "Premium apparel and merchandise that turns customers into walking billboards.",
    detail: "Merchandise should be fashion, not just a logo slapped on a cheap t-shirt. We design and source premium, wearable brand extensions that your community will actually crave. From limited-drop streetwear to high-end corporate gifting, we handle the aesthetics and production.",
    bullets: ["Custom Apparel Design", "Premium Material Sourcing", "Packaging & Unboxing Experience", "Limited Edition 'Drops'", "Corporate Gifting Suites"],
  },
];

const digitalServices = allServices.slice(0, 8); // Now 8 digital services
const physicalServices = allServices.slice(8);   // Now 4 physical services


const viralReels = [
  { id: 1, url: "https://www.instagram.com/reel/DPRAoNKDGxv/?igsh=MnA5eWthdDV3dW5p", label: "Reel 01", caption: "Brand Story", episode: "EP – 6", series: "learning\nto earning", rotate: "-5deg", bgColors: ["#e8ddd0", "#d4c5b0"], textDark: true, accentColor: "#7c5cbf", image: reelImg1 },
  { id: 2, url: "https://www.instagram.com/reel/DSpc3Grj0cQ/?igsh=MXI4MTk5ejA1MnJvZA==", label: "Reel 02", caption: "Product Launch", episode: "EP – 14", series: "learning\nto earning", rotate: "0deg", bgColors: ["#2c3e50", "#1a252f"], textDark: false, accentColor: "#c5a059", image: reelImg2 },
  { id: 3, url: "https://www.instagram.com/reel/DUYJLx3EqKI/?igsh=bnFtMGdzZ3hvdmV3", label: "Reel 03", caption: "Event Coverage", episode: "EP – 21", series: "behind\nthe brand", rotate: "5deg", bgColors: ["#d9cfc0", "#c4b89f"], textDark: true, accentColor: "#c5a059", image: reelImg3 },
];

/* ─────────────── Hook ─────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ─────────────── Modal ─────────────── */
function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,10,10,0.65)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
        animation: "modal-bg-in 0.3s ease forwards",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.white,
          borderRadius: "28px",
          width: "100%", maxWidth: "800px",
          maxHeight: "95vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 40px 100px rgba(10,10,10,0.3), 0 0 0 1px rgba(197,160,89,0.2)",
          animation: "modal-in 0.4s cubic-bezier(0.34,1.3,0.64,1) forwards",
        }}
      >
        {/* Image header */}
        <div style={{ position: "relative", height: "160px", overflow: "hidden", flexShrink: 0 }}>
          {!imgLoaded && (
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg, ${service.color}cc, ${service.color})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: "3rem", color: T.gold, opacity: 0.4 }}>{service.icon}</span>
            </div>
          )}
          <img
            src={service.img} alt={service.imgAlt}
            onLoad={() => setImgLoaded(true)}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.55) 100%)`,
          }} />
          {/* Tag + title over image */}
          <div style={{ position: "absolute", bottom: "1.5rem", left: "2rem", right: "5rem" }}>
            <span style={{
              display: "inline-block",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.58rem", letterSpacing: "0.28em", fontWeight: 700,
              color: T.goldLight,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              borderRadius: "100px", padding: "3px 12px",
              border: `1px solid rgba(212,175,51,0.4)`,
              marginBottom: "0.5rem",
            }}>{service.tag}</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.4rem,2.5vw,1.8rem)",
              fontWeight: 900, color: T.white,
              letterSpacing: "-0.02em", lineHeight: 1.1,
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}>{service.title}</h2>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "1rem", right: "1rem",
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: T.white, fontSize: "1.1rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = T.gold;
              (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.4)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >✕</button>
        </div>

        {/* Content */}
        <div style={{ padding: "1.25rem 2rem 1.75rem", overflowY: "auto" }}>
          {/* Gold divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.8rem" }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${T.gold}, transparent)` }} />
            <span style={{ color: T.gold, fontSize: "0.6rem" }}>{service.icon}</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, ${T.gold}, transparent)` }} />
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem", color: "#2a2a2a",
            lineHeight: 1.6, fontStyle: "italic",
            marginBottom: "1rem",
          }}>{service.detail}</p>

          {/* What's included */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.55rem", letterSpacing: "0.3em",
            color: T.gold, fontWeight: 700, marginBottom: "0.6rem",
          }}>WHAT'S INCLUDED</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: "0.5rem" }}>
            {service.bullets.map((b, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                background: T.bg, borderRadius: "12px",
                padding: "0.5rem 0.8rem",
                border: `1px solid rgba(197,160,89,0.18)`,
              }}>
                <span style={{ color: T.gold, fontSize: "0.7rem", flexShrink: 0 }}>✦</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem", color: T.fg,
                  letterSpacing: "0.03em",
                }}>{b}</span>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div style={{ marginTop: "1.2rem", display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            <a href="#contact" onClick={onClose} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem", letterSpacing: "0.2em", fontWeight: 700,
              color: T.white, background: T.gold,
              border: "none", borderRadius: "100px",
              padding: "0.65rem 1.5rem", cursor: "pointer",
              boxShadow: `0 4px 20px rgba(197,160,89,0.35)`,
              transition: "transform 0.2s, box-shadow 0.2s",
              textDecoration: "none",
              display: "inline-block",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px rgba(197,160,89,0.45)`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(197,160,89,0.35)`;
              }}
            >START YOUR BRAND JOURNEY ↗</a>
            <button
              onClick={onClose}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem", letterSpacing: "0.2em", fontWeight: 700,
                color: T.muted, background: "transparent",
                border: `1.5px solid rgba(107,114,128,0.3)`,
                borderRadius: "100px",
                padding: "0.65rem 1.5rem", cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = T.gold;
                (e.currentTarget as HTMLElement).style.color = T.gold;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(107,114,128,0.3)";
                (e.currentTarget as HTMLElement).style.color = T.muted;
              }}
            >CLOSE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Service Card (with image) ─────────────── */
function ServiceCard({ service, index, onOpen }: { service: Service; index: number; onOpen: (s: Service) => void }) {
  const [hov, setHov] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onOpen(service)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s, box-shadow 0.35s, border-color 0.35s`,
        background: T.white,
        border: `1.5px solid ${hov ? T.gold : "rgba(197,160,89,0.18)"}`,
        borderRadius: T.radius,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hov
          ? `0 24px 60px rgba(197,160,89,0.2), 0 2px 8px rgba(10,10,10,0.08)`
          : `0 2px 16px rgba(10,10,10,0.07)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image area */}
      <div style={{
        position: "relative", height: "200px", overflow: "hidden", flexShrink: 0,
        background: `linear-gradient(135deg, ${service.color}bb, ${service.color})`,
      }}>
        {!imgLoaded && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: "2.5rem", color: T.gold, opacity: 0.35 }}>{service.icon}</span>
          </div>
        )}
        <img
          src={service.img}
          alt={service.imgAlt}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            opacity: imgLoaded ? 1 : 0,
            transform: hov ? "scale(1.07)" : "scale(1)",
            transition: "opacity 0.5s ease, transform 0.6s ease",
          }}
        />
        {/* Gradient over image */}
        <div style={{
          position: "absolute", inset: 0,
          background: hov
            ? "linear-gradient(to bottom, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.5) 100%)"
            : "linear-gradient(to bottom, rgba(10,10,10,0.08) 0%, rgba(10,10,10,0.38) 100%)",
          transition: "background 0.4s",
        }} />

        {/* Tag pill over image */}
        <div style={{ position: "absolute", top: "0.85rem", left: "0.85rem" }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.55rem", letterSpacing: "0.25em", fontWeight: 700,
            color: T.goldLight,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
            borderRadius: "100px", padding: "3px 10px",
            border: `1px solid rgba(212,175,51,0.35)`,
          }}>{service.tag}</span>
        </div>

        {/* "View details" pill – shows on hover */}
        <div style={{
          position: "absolute", bottom: hov ? "0.85rem" : "0.2rem", right: "0.85rem",
          opacity: hov ? 1 : 0,
          transition: "opacity 0.3s, bottom 0.3s",
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.52rem", letterSpacing: "0.15em",
            color: T.white,
            background: T.gold,
            borderRadius: "100px", padding: "4px 12px",
            display: "flex", alignItems: "center", gap: "4px",
          }}>VIEW DETAILS ↗</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1.4rem 1.5rem 1.6rem", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Icon + title row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", marginBottom: "0.6rem" }}>
          <span style={{
            fontSize: "1.1rem", color: hov ? T.goldDark : T.gold,
            transform: hov ? "rotate(15deg) scale(1.1)" : "none",
            transition: "transform 0.35s, color 0.35s",
            display: "inline-block", lineHeight: 1, flexShrink: 0,
            marginTop: "2px",
          }}>{service.icon}</span>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.15rem", fontWeight: 800,
            color: T.fg, lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}>{service.title}</h3>
        </div>

        {/* Desc */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.97rem", color: T.muted,
          lineHeight: 1.72, fontStyle: "italic",
          flex: 1,
        }}>{service.desc}</p>

        {/* Bottom link */}
        <div style={{
          marginTop: "1.1rem",
          display: "flex", alignItems: "center", gap: "0.4rem",
          borderTop: `1px solid rgba(197,160,89,0.15)`,
          paddingTop: "1rem",
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.58rem", letterSpacing: "0.18em",
            color: hov ? T.goldDark : T.gold,
            fontWeight: 700,
            transition: "color 0.3s",
          }}>LEARN MORE</span>
          <span style={{
            color: hov ? T.goldDark : T.gold,
            fontSize: "0.75rem",
            transform: hov ? "translateX(4px)" : "none",
            transition: "transform 0.3s, color 0.3s",
          }}>→</span>
        </div>
      </div>

      {/* Gold bottom accent */}
      <div style={{
        height: "2px",
        background: `linear-gradient(90deg, transparent, ${T.gold}, ${T.goldLight}, ${T.gold}, transparent)`,
        opacity: hov ? 1 : 0,
        transition: "opacity 0.35s",
      }} />
    </div>
  );
}

/* ─────────────── Reel Card ─────────────── */
function ReelCard({ reel, index }: { reel: typeof viralReels[0]; index: number }) {
  const [hov, setHov] = useState(false);
  const { ref, inView } = useInView();
  const isDark = !reel.textDark;
  const txtColor = reel.textDark ? T.fg : T.white;

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? `rotate(${reel.rotate}) translateY(0)` : `rotate(${reel.rotate}) translateY(40px)`,
      transition: `opacity 0.75s ease ${index * 0.14}s, transform 0.75s ease ${index * 0.14}s`,
      flex: "0 0 auto", width: "clamp(190px,21vw,230px)",
    }}>
      <a
        href={reel.url} target="_blank" rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "block", textDecoration: "none",
          transform: hov ? "rotate(0deg) translateY(-12px) scale(1.04)" : "none",
          transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s",
          borderRadius: "24px",
          boxShadow: hov
            ? `0 32px 64px rgba(10,10,10,0.2), 0 0 0 2px ${T.gold}`
            : `0 8px 28px rgba(10,10,10,0.13), 0 0 0 1px rgba(197,160,89,0.18)`,
        }}
      >
        <div style={{
          position: "relative",
          background: `linear-gradient(160deg, ${reel.bgColors[0]} 0%, ${reel.bgColors[1]} 100%)`,
          borderRadius: "24px", overflow: "hidden",
          aspectRatio: "9/16", width: "100%",
        }}>
          {reel.image && (
            <img src={reel.image} alt="Reel thumbnail" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
          <div style={{ position: "absolute", inset: 0, background: reel.image ? `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)` : `radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)`, pointerEvents: "none" }} />


          {/* Top overlay */}
          <div style={{ position: "absolute", top: "1rem", left: "1rem", right: "1rem" }}>
            <div style={{
              display: "inline-block",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em",
              color: T.goldLight,
              background: "rgba(0,0,0,0.65)",
              borderRadius: "100px", padding: "3px 10px",
              backdropFilter: "blur(4px)", marginBottom: "0.4rem",
            }}>{reel.episode} of series</div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(0.95rem,2.5vw,1.2rem)",
              fontWeight: 900, fontStyle: "italic",
              color: T.white, lineHeight: 1.15, whiteSpace: "pre-line",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}>{reel.series}</div>
          </div>

          {/* Play button */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: `translate(-50%,-50%) scale(${hov ? 1.12 : 1})`,
            transition: "transform 0.35s ease",
            width: 50, height: 50, borderRadius: "50%",
            background: isDark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.45)",
            backdropFilter: "blur(8px)",
            border: `1.5px solid ${isDark ? "rgba(212,175,51,0.5)" : "rgba(197,160,89,0.6)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill={isDark ? T.goldLight : T.goldDark} style={{ marginLeft: 3 }}>
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>

          {/* Bottom caption */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "3rem 1rem 0.9rem",
            background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
          }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.56rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)", marginBottom: "0.15rem" }}>{reel.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.88rem", fontWeight: 700, color: T.white }}>{reel.caption}</div>
            <div style={{ position: "absolute", bottom: "0.8rem", right: "0.85rem", opacity: hov ? 0.9 : 0.4, transition: "opacity 0.3s" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.white} strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.3" fill={T.white} stroke="none" />
              </svg>
            </div>
          </div>

          <div style={{ position: "absolute", inset: 0, background: "rgba(197,160,89,0.07)", opacity: hov ? 1 : 0, transition: "opacity 0.35s", pointerEvents: "none", borderRadius: "24px" }} />
          <div style={{ position: "absolute", bottom: hov ? "4.5rem" : "3.5rem", left: "50%", transform: "translateX(-50%)", opacity: hov ? 1 : 0, transition: "opacity 0.3s, bottom 0.3s", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", border: `1px solid rgba(197,160,89,0.45)`, borderRadius: "100px", padding: "5px 14px", whiteSpace: "nowrap", pointerEvents: "none" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.52rem", letterSpacing: "0.18em", color: T.goldLight }}>VIEW ON INSTAGRAM ↗</span>
          </div>
        </div>
      </a>
    </div>
  );
}

/* ─────────────── Section Label ─────────────── */
function SectionLabel({ number, label, align = "left" }: { number: string; label: string; align?: "left" | "right" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
      {align === "right" && <div style={{ width: 48, height: 1, background: `linear-gradient(to left, ${T.gold}, transparent)`, opacity: 0.6 }} />}
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", letterSpacing: "0.3em", color: T.gold, fontWeight: 700 }}>{number} / {label}</span>
      {align === "left" && <div style={{ width: 48, height: 1, background: `linear-gradient(to right, ${T.gold}, transparent)`, opacity: 0.6 }} />}
    </div>
  );
}

/* ─────────────── MAIN ─────────────── */
export function ServicesSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const heroRef = useInView(0.1);
  const digitalRef = useInView(0.08);
  const physicalRef = useInView(0.08);
  const viralsRef = useInView(0.06);

  const openModal = useCallback((s: Service) => setActiveService(s), []);
  const closeModal = useCallback(() => setActiveService(null), []);

  return (
    <div id="services" style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #f5f3ef 0%, #e2dac7 100%)", overflowX: "hidden", position: "relative" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Courier+Prime:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#edeae4; }
        ::-webkit-scrollbar-thumb { background:#c5a059; border-radius:2px; }
        @keyframes float-orb { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,-22px)} }
        @keyframes marquee   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse     { 0%,100%{opacity:.35} 50%{opacity:.85} }
        @keyframes modal-bg-in { from{opacity:0} to{opacity:1} }
        @keyframes modal-in    { from{opacity:0; transform:scale(0.92) translateY(20px)} to{opacity:1; transform:scale(1) translateY(0)} }
      `}</style>

      {/* Orbs */}
      <div style={{ position: "absolute", top: "8%", left: "-6%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,160,89,0.09) 0%, transparent 70%)", animation: "float-orb 14s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "60%", right: "-4%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,160,89,0.07) 0%, transparent 70%)", animation: "float-orb 18s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }} />

      {/* ── HERO ── */}
      <section ref={heroRef.ref} style={{ position: "relative", zIndex: 1, padding: "5rem 6vw 2rem", textAlign: "center" }}>
        {/* Spinning ring */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 560, height: 560, marginLeft: -280, marginTop: -280,
          border: `1px solid rgba(197,160,89,0.1)`, borderRadius: "50%",
          animation: "spin-slow 70s linear infinite", pointerEvents: "none",
        }}>
          <div style={{ position: "absolute", top: "6%", left: "50%", width: 5, height: 5, borderRadius: "50%", background: T.gold, opacity: 0.5, marginLeft: -2.5 }} />
        </div>

        <div style={{ opacity: heroRef.inView ? 1 : 0, transform: heroRef.inView ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.9s ease, transform 0.9s ease", position: "relative" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.38em", color: T.gold, fontWeight: 700, marginBottom: "1.5rem" }}>— OUR OFFERINGS —</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 900, color: T.fg, lineHeight: 1.08, marginBottom: "1.5rem", letterSpacing: "-0.025em" }}>
            Every Service.<br /><em style={{ color: T.gold, fontStyle: "italic" }}>Engineered</em> to Elevate.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.15rem", color: T.muted, maxWidth: "520px", margin: "0 auto 2.5rem", lineHeight: 1.8, fontStyle: "italic" }}>
            From pixels to billboards — a full-spectrum studio built to make your brand impossible to ignore.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center" }}>
            <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${T.gold})` }} />
            <span style={{ color: T.gold, fontSize: "0.8rem", animation: "pulse 2.5s ease-in-out infinite" }}>✦</span>
            <div style={{ width: 60, height: 1, background: `linear-gradient(to left, transparent, ${T.gold})` }} />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ overflow: "hidden", padding: "0.5rem 0", borderTop: `1px solid rgba(197,160,89,0.15)`, borderBottom: `1px solid rgba(197,160,89,0.15)`, background: T.bgAlt, marginBottom: "2rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", animation: "marquee 24s linear infinite", width: "max-content" }}>
          {[0, 1].map(gi => (
            <div key={gi} style={{ display: "flex", gap: "3rem", alignItems: "center", paddingRight: "3rem" }}>
              {["DIGITAL", "✦", "PHYSICAL", "✦", "CONTENT", "✦", "BRAND", "✦", "LUXURY", "✦", "GROWTH", "✦", "IMPACT", "✦"].map((t, j) => (
                <span key={j} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", letterSpacing: "0.3em", color: t === "✦" ? T.gold : T.muted, whiteSpace: "nowrap", opacity: t === "✦" ? 0.8 : 0.5 }}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── DIGITAL ── */}
      <section ref={digitalRef.ref} style={{ position: "relative", zIndex: 1, padding: "0 6vw 3rem" }}>
        <div style={{ opacity: digitalRef.inView ? 1 : 0, transform: digitalRef.inView ? "translateX(0)" : "translateX(-24px)", transition: "opacity 0.7s ease, transform 0.7s ease", marginBottom: "1.5rem" }}>
          <SectionLabel number="01" label="DIGITAL" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 800, color: T.fg, marginTop: "0.5rem", letterSpacing: "-0.02em" }}>Digital Services</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: T.muted, fontStyle: "italic", marginTop: "0.4rem" }}>Click any card to explore the full service →</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: "1.5rem" }}>
          {digitalServices.map((s, i) => <ServiceCard key={s.id} service={s} index={i} onOpen={openModal} />)}
        </div>
      </section>

      {/* ── PHYSICAL ── */}
      <section ref={physicalRef.ref} style={{ position: "relative", zIndex: 1, padding: "1.5rem 6vw 3rem", background: T.bgAlt, borderTop: `1px solid rgba(197,160,89,0.12)`, borderBottom: `1px solid rgba(197,160,89,0.12)` }}>
        <div style={{ opacity: physicalRef.inView ? 1 : 0, transform: physicalRef.inView ? "translateX(0)" : "translateX(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", marginBottom: "1.5rem", textAlign: "right" }}>
          <SectionLabel number="02" label="PHYSICAL" align="right" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 800, color: T.fg, marginTop: "0.5rem", letterSpacing: "-0.02em" }}>Physical Presence</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: T.muted, fontStyle: "italic", marginTop: "0.4rem" }}>Click any card to explore the full service →</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: "1.5rem" }}>
          {physicalServices.map((s, i) => <ServiceCard key={s.id} service={s} index={i} onOpen={openModal} />)}
        </div>
      </section>

      {/* ── VIRALS ── */}
      <section ref={viralsRef.ref} style={{ position: "relative", zIndex: 1, padding: "4rem 6vw 5rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Playfair Display', serif", fontSize: "clamp(8rem,22vw,22rem)", fontWeight: 900, color: "rgba(197,160,89,0.05)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em", lineHeight: 1 }}>VIRAL</div>

        <div style={{ opacity: viralsRef.inView ? 1 : 0, transform: viralsRef.inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease", textAlign: "center", marginBottom: "2.5rem", position: "relative" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.38em", color: T.gold, fontWeight: 700, marginBottom: "0.9rem" }}>— PROOF OF WORK —</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 900, color: T.fg, marginBottom: "1rem", letterSpacing: "-0.025em" }}>
            View Our <em style={{ color: T.gold, fontStyle: "italic" }}>Virals</em>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: T.muted, fontStyle: "italic", maxWidth: "400px", margin: "0 auto", lineHeight: 1.8 }}>
            Results speak louder than promises. Watch what we've built for brands that dared to be extraordinary.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(1rem,3vw,2rem)", flexWrap: "wrap", padding: "2rem 0 3.5rem", position: "relative" }}>
          {viralReels.map((reel, i) => <ReelCard key={reel.id} reel={reel} index={i} />)}
        </div>

        <div style={{ textAlign: "center", opacity: viralsRef.inView ? 1 : 0, transition: "opacity 1s ease 0.7s" }}>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", letterSpacing: "0.25em", color: T.fg, textDecoration: "none", border: `1.5px solid rgba(197,160,89,0.4)`, borderRadius: "100px", padding: "0.85rem 2rem", background: T.white, boxShadow: `0 2px 16px rgba(197,160,89,0.12)`, transition: "all 0.3s ease", fontWeight: 700 }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.gold; el.style.color = T.white; el.style.borderColor = T.gold; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.white; el.style.color = T.fg; el.style.borderColor = "rgba(197,160,89,0.4)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></svg>
            SEE ALL WORK ON INSTAGRAM ↗
          </a>
        </div>
      </section>

      {/* ── MODAL ── */}
      {activeService && <ServiceModal service={activeService} onClose={closeModal} />}
    </div>
  );
}
