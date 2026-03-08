import React from "react";
import { motion } from "framer-motion";

// ── Portfolio images
import imgFintech from "../assets/WhatsApp Image 2026-03-07 at 3.05.19 PM (1).jpeg";
import imgFashion from "../assets/clothing.jpg";
import imgSaas from "../assets/food.jpeg";
import imgLifestyle from "../assets/yarnkari.jpg";
import imgSerum from "../assets/serum02.jpeg";
import imgEvent from "../assets/event_stage.png";

// ── Data
const testimonials = [
  {
    quote: "From concept to execution, their work was seamless. Highly recommended for any brand looking to grow their business.",
    author: "Lisa Ray",
    title: " MANAGER",
    company: "LIFESTYLE CO.",
  },
  {
    quote: "The cinematic product launch shoot exceeded our expectations. They captured our vision perfectly and delivered a stunning campaign.",
    author: "Alice Jeffrey",
    title: "FOUNDER",
    company: "MINIMALIST SERUMS",
  },
  {
    quote: "MarketSpark helped our fintech startup establish a strong identity and reach the right audience. Their strategies truly work!",
    author: "John Doe",
    title: "CEO",
    company: "FINTECH STARTUP",
  },
  {
    quote: "The team's creativity and dedication transformed our social media presence. Engagement rates doubled in just 3 months.",
    author: "Jane Smith",
    title: "CMO",
    company: "D2C FASHION BRAND",
  },
];

const portfolioRow1 = [
  {
    img: imgFintech,
    category: "DIGITAL",
    name: "Fintech Startup",
    work: "App Strategy & Brand Identity",
    tags: ["BRAND IDENTITY", "DIGITAL MARKETING"],
  },
  {
    img: imgFashion,
    category: "OFFLINE",
    name: "D2C Fashion",
    work: "E-commerce Launch Campaign",
    tags: ["CONTENT CREATION", "SOCIAL MEDIA"],
  },
  {
    img: imgSaas,
    category: "DIGITAL",
    name: "SaaS Platform",
    work: "B2B Lead Generation Funnel",
    tags: ["DIGITAL MARKETING", "SEO"],
  },
];

const portfolioRow2 = [
  {
    img: imgLifestyle,
    category: "CONTENT",
    name: "Lifestyle Brand",
    work: "Cinematic Product Launch",
    tags: ["VIDEO PRODUCTION", "PHYSICAL MARKETING"],
  },
  {
    img: imgSerum,
    category: "CREATIVE",
    name: "Minimalist Serums",
    work: "Product Packaging & Ads",
    tags: ["BRAND IDENTITY", "SOCIAL MEDIA"],
  },
  {
    img: imgEvent,
    category: "OFFLINE",
    name: "Event Promotion",
    work: "Event Marketing & Production",
    tags: ["PHYSICAL MARKETING", "OFFLINE"],
  },
];

// ── Animation helpers — amount:0 + once:true prevents Lenis from resetting them
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export function PortfolioSection() {
  return (
    <section id="portfolio" style={{ overflow: "hidden", position: "relative", zIndex: 2, isolation: "isolate" }}>
      <style>{`
        /* ════════════════════════════════
           SHARED HEADER STYLE
        ════════════════════════════════ */
        .pf-section-header {
          text-align: center;
          margin-bottom: 2.2rem;
        }
        .pf-header-line-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 12px;
        }
        .pf-header-line {
          width: 52px;
          height: 2px;
          background: linear-gradient(90deg, #c5a059, #e8c97a);
          border-radius: 2px;
          flex-shrink: 0;
        }
        .pf-header-sub {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          font-family: var(--font-sans);
        }
        .pf-header-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          line-height: 1.1;
          margin: 0;
          color: var(--fg);
        }

        /* ════════════════════════════════
           PART 1 — TESTIMONIALS
        ════════════════════════════════ */
        .testimonials-outer {
          background: rgb(0 0 0 / 0.06);
          padding: 4rem 0 4.5rem;
        }
        .testimonials-inner {
          width: min(1280px, calc(100% - 3rem));
          margin: 0 auto;
        }
        .testimonials-title {
          color: #ffffff;
        }
        .testimonials-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 1100px) {
          .testimonials-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .testimonials-row { grid-template-columns: 1fr; }
        }

        /* Glassmorphism card */
        .t2-card {
          background: #f0ece4;
          border: 1px solid rgba(197,160,89,0.25);
          border-radius: 18px;
          padding: 1.6rem 1.5rem 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8);
          backdrop-filter: blur(14px);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.35s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.3s ease;
        }
        .t2-card:hover {
          transform: scale(1.033);
          box-shadow: 0 14px 48px rgba(197,160,89,0.16), 0 4px 16px rgba(0,0,0,0.05);
          border-color: rgba(197,160,89,0.6);
        }
        .t2-stars {
          display: flex;
          gap: 3px;
        }
        .t2-quote {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          line-height: 1.72;
          color: var(--muted);
          font-style: italic;
          flex: 1;
        }
        .t2-author-row {
          display: flex;
          align-items: center;
          gap: 12px;
          border-top: 1px solid rgba(0,0,0,0.08);
          padding-top: 1rem;
        }
        .t2-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(197,160,89,0.6);
          background: rgba(197,160,89,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 1rem;
          font-weight: 700;
          color: #c5a059;
          flex-shrink: 0;
        }
        .t2-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--fg);
          margin: 0 0 3px;
          line-height: 1.2;
        }
        .t2-role {
          font-size: 9.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--gold);
          margin: 0;
          line-height: 1.5;
        }
        .t2-company {
          font-size: 9.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(0,0,0,0.45);
          margin: 0;
        }

        /* ════════════════════════════════
           PART 2 — PORTFOLIO GRID
        ════════════════════════════════ */
        .portfolio-outer {
          background: rgba(0, 0, 0, 0.05);
          padding: 4rem 0 5rem;
        }
        .portfolio-title {
          color: #ffffff;
        }
        .portfolio-inner {
          width: min(1280px, calc(100% - 3rem));
          margin: 0 auto;
        }
        .portfolio-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .portfolio-grid-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 900px) {
          .portfolio-grid-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .portfolio-grid-row { grid-template-columns: 1fr; }
        }

        /* Portfolio card */
        .pf2-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 4/3;
          border: 1px solid rgba(197,160,89,0.2);
          cursor: pointer;
          background: #111;
        }

        .pf2-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.2, 1, 0.3, 1);
        }
        .pf2-card:hover .pf2-img {
          transform: scale(1.08);
        }

        /* Gradient overlay */
        .pf2-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.18) 40%,
            rgba(0,0,0,0.82) 100%
          );
          pointer-events: none;
        }

        /* Info at bottom */
        .pf2-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.1rem 1.2rem 1.2rem;
        }

        /* Category tag + expanding line */
        .pf2-tag-wrap {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 7px;
          overflow: hidden;
        }
        .pf2-cat-tag {
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c5a059;
          background: rgba(197,160,89,0.12);
          border: 1px solid rgba(197,160,89,0.35);
          border-radius: 4px;
          padding: 3px 8px;
          flex-shrink: 0;
          margin-right: 10px;
        }
        .pf2-tag-line {
          height: 1px;
          background: linear-gradient(90deg, rgba(197,160,89,0.7), transparent);
          flex: 0;
          width: 0;
          transition: width 0.45s cubic-bezier(0.22,1,0.36,1),
                      flex 0.45s cubic-bezier(0.22,1,0.36,1);
          border-radius: 2px;
        }
        .pf2-card:hover .pf2-tag-line {
          width: 60px;
          flex: 1;
        }

        .pf2-name {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 4px;
          line-height: 1.25;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }
        .pf2-work {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.65);
          margin: 0 0 8px;
          line-height: 1.4;
        }
        .pf2-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .pf2-service-tag {
          font-size: 8.5px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 4px;
          padding: 3px 8px;
          backdrop-filter: blur(4px);
        }
      `}</style>

      {/* ══════════════════════════════════════
          PART 1 — COMPANY PORTFOLIO
      ══════════════════════════════════════ */}
      <div className="portfolio-outer" style={{ position: "relative", zIndex: 2 }}>
        <div className="portfolio-inner">
          {/* Header */}
          <motion.div className="pf-section-header" {...fadeUp(0)}>
            <div className="pf-header-line-wrap">
              <span className="pf-header-line" />
              <span className="pf-header-sub">Companies We Worked With</span>
            </div>
            <h2 className="pf-header-title portfolio-title">
              Companies we've{" "}
              <em style={{ color: "#c5a059", fontStyle: "italic" }}>ignited.</em>
            </h2>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="portfolio-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {/* Row 1 */}
            <div className="portfolio-grid-row">
              {portfolioRow1.map((card, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 32 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <PortfolioCard card={card} />
                </motion.div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="portfolio-grid-row">
              {portfolioRow2.map((card, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 32 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <PortfolioCard card={card} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PART 2 — TESTIMONIALS
      ══════════════════════════════════════ */}
      <div className="testimonials-outer" style={{ position: "relative", zIndex: 2 }}>
        <div className="testimonials-inner">
          {/* Header */}
          <motion.div className="pf-section-header" {...fadeUp(0)}>
            <div className="pf-header-line-wrap">
              <span className="pf-header-line" />
              <span className="pf-header-sub">Our Clients</span>
            </div>
            <h2 className="pf-header-title testimonials-title">
              What Client Says<em style={{ color: "#c5a059", fontStyle: "italic" }}>.</em>
            </h2>
          </motion.div>

          {/* Cards row */}
          <motion.div
            className="testimonials-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <div className="t2-card">
                  {/* Stars */}
                  <div className="t2-stars">
                    {[...Array(5)].map((_, s) => (
                      <span key={s} style={{ color: "#c5a059", fontSize: 15 }}>★</span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="t2-quote">"{t.quote}"</p>

                  {/* Author */}
                  <div className="t2-author-row">
                    <div className="t2-avatar">{t.author[0]}</div>
                    <div>
                      <p className="t2-name">{t.author}</p>
                      <p className="t2-role">
                        <span style={{ color: "#c5a059" }}>{t.title}</span>
                        {" · "}
                        <span style={{ color: "rgba(13, 13, 13, 0.45)" }}>{t.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Sub-component
function PortfolioCard({ card }: {
  card: { img: string; category: string; name: string; work: string; tags: string[] };
}) {
  return (
    <div className="pf2-card">
      <img className="pf2-img" src={card.img} alt={card.name} />
      <div className="pf2-overlay" />
      <div className="pf2-info">
        <div className="pf2-tag-wrap">
          <span className="pf2-cat-tag">{card.category}</span>
          <span className="pf2-tag-line" />
        </div>
        <h3 className="pf2-name">{card.name}</h3>
        <p className="pf2-work">{card.work}</p>
        <div className="pf2-tags">
          {card.tags.map((tag, i) => (
            <span key={i} className="pf2-service-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}