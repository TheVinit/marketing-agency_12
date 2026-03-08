"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

const T = {
  bg: "#e8e4db",
  bgAlt: "#ded8cb",
  fg: "#0a0a0a",
  gold: "#c5a059",
  goldLight: "#D4AF33",
  goldDark: "#8a6b1f",
  muted: "#6b7280",
  mutedLight: "#9ca3af",
  white: "#ffffff",
};

type FormState = "idle" | "submitting" | "success";

function useInView(threshold = 0.1) {
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

/* ─── Label ─── */
function Label({ children, required }: { children: string; required?: boolean }) {
  return (
    <label style={{
      display: "block",
      fontFamily: "'Inter', sans-serif",
      fontSize: "0.6rem",
      letterSpacing: "0.24em",
      fontWeight: 700,
      color: T.fg,
      marginBottom: "0.55rem",
      textTransform: "uppercase",
    }}>
      {children}
      {required && <span style={{ color: T.gold, marginLeft: 3 }}>*</span>}
    </label>
  );
}

/* ─── Input ─── */
function Input({ name, type = "text", placeholder, required }: {
  name: string; type?: string; placeholder: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      name={name} type={type} placeholder={placeholder} required={required}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        display: "block", width: "100%", height: 50,
        background: focused ? T.white : T.bgAlt,
        border: `1.5px solid ${focused ? T.gold : "rgba(197,160,89,0.3)"}`,
        borderRadius: 12,
        padding: "0 1rem",
        fontFamily: "'Inter', sans-serif",
        fontSize: "1.02rem",
        color: T.fg,
        outline: "none",
        transition: "border-color 0.25s, background 0.25s",
      }}
    />
  );
}

/* ─── Textarea ─── */
function Textarea({ name, placeholder }: { name: string; placeholder: string; }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      name={name} placeholder={placeholder} rows={4}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        display: "block", width: "100%",
        background: focused ? T.white : T.bgAlt,
        border: `1.5px solid ${focused ? T.gold : "rgba(197,160,89,0.3)"}`,
        borderRadius: 12,
        padding: "0.85rem 1rem",
        fontFamily: "'Inter', sans-serif",
        fontSize: "1.02rem",
        color: T.fg,
        outline: "none",
        resize: "vertical",
        transition: "border-color 0.25s, background 0.25s",
        lineHeight: 1.65,
        minHeight: 100,
      }}
    />
  );
}

/* ─── Select ─── */
function Select({ name, options, placeholder }: {
  name: string; options: string[]; placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        name={name} defaultValue=""
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          display: "block", width: "100%", height: 50,
          background: focused ? T.white : T.bgAlt,
          border: `1.5px solid ${focused ? T.gold : "rgba(197,160,89,0.3)"}`,
          borderRadius: 12,
          padding: "0 2.5rem 0 1rem",
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.02rem",
          color: T.fg,
          outline: "none",
          appearance: "none",
          cursor: "pointer",
          transition: "border-color 0.25s, background 0.25s",
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => (
          <option key={o} value={o} style={{ color: T.fg, background: T.white }}>{o}</option>
        ))}
      </select>
      <div style={{ position: "absolute", top: "50%", right: "1rem", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke={T.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Service Chip ─── */
function ServiceChip({ label, on, toggle }: { label: string; on: boolean; toggle: () => void }) {
  return (
    <button
      type="button" onClick={toggle}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.63rem", letterSpacing: "0.05em",
        color: on ? T.white : T.fg,
        background: on ? T.goldDark : T.bgAlt,
        border: `1.5px solid ${on ? T.goldDark : "rgba(197,160,89,0.22)"}`,
        borderRadius: "100px",
        padding: "7px 14px",
        cursor: "pointer",
        fontWeight: on ? 700 : 400,
        transition: "all 0.22s ease",
        boxShadow: on ? `0 4px 14px rgba(138,107,31,0.3)` : "none",
      }}
    >
      {on && (
        <svg width="10" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {label}
    </button>
  );
}

/* ─── Radio Option ─── */
function RadioOption({ name, label, checked, onChange }: {
  name: string; label: string; checked: boolean; onChange: () => void;
}) {
  return (
    <label onClick={onChange} style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: "1.02rem",
      color: T.fg,
      fontWeight: checked ? 600 : 400,
      transition: "color 0.22s",
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
        border: `1.8px solid ${checked ? T.gold : "rgba(197,160,89,0.3)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "border-color 0.22s",
      }}>
        {checked && <div style={{ width: 9, height: 9, borderRadius: "50%", background: T.gold }} />}
      </div>
      {label}
      <input type="radio" name={name} value={label} checked={checked} onChange={onChange} style={{ display: "none" }} />
    </label>
  );
}

/* ─── Info Row ─── */
function InfoRow({ icon, label, value, link }: {
  icon: React.ReactNode; label: string; value: string; link?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: T.bgAlt,
        border: `1px solid rgba(197,160,89,0.2)`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>{icon}</div>
      <div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.53rem", letterSpacing: "0.26em", color: T.goldDark, fontWeight: 700, marginBottom: "0.15rem" }}>{label}</p>
        {link ? (
          <a href={link} style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 700, color: T.fg, textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.goldLight}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.fg}
          >{value}</a>
        ) : (
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 700, color: T.fg }}>{value}</p>
        )}
      </div>
    </div>
  );
}

/* ══ MAIN ══ */
export function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [contactMethod, setContactMethod] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const heroRef = useInView(0.1);
  const infoRef = useInView(0.08);
  const formRef = useInView(0.06);

  function toggleService(s: string) {
    setSelectedServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formState === "submitting") return;
    setFormState("submitting");

    const formData = new FormData(e.currentTarget);
    const enquiryData = {
      full_name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      business_name: formData.get("business") as string,
      business_scale: formData.get("businessScale") as string,
      monthly_budget: formData.get("budget") as string,
      project_details: formData.get("projectDetails") as string,
      preferred_contact_method: contactMethod,
      status: 'New'
    };

    try {
      // 1. Insert Enquiry
      const { data: enquiry, error: enquiryError } = await supabase
        .from('enquiries')
        .insert([enquiryData])
        .select()
        .single();

      if (enquiryError) throw enquiryError;

      // 2. Link Services
      if (selectedServices.length > 0) {
        // Fetch service IDs
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('id, service_name')
          .in('service_name', selectedServices);

        if (servicesError) throw servicesError;

        if (servicesData && servicesData.length > 0) {
          const links = servicesData.map(s => ({
            enquiry_id: enquiry.id,
            service_id: s.id
          }));

          const { error: linkError } = await supabase
            .from('enquiry_services')
            .insert(links);

          if (linkError) throw linkError;
        }
      }

      // Trigger Email Notification
      try {
        await supabase.functions.invoke('send-lead-email', {
          body: {
            lead: {
              ...enquiryData,
              services: selectedServices
            }
          }
        });
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr);
        // Do not block the user success message if email fail
      }

      setFormState("success");
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      alert('Something went wrong. Please try again.');
      setFormState("idle");
    }
  }

  return (
    <div id="contact" style={{ background: T.bg, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Montserrat:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        input::placeholder, textarea::placeholder {
          color: rgba(10,10,10,0.4);
          font-family: 'Montserrat', sans-serif;
        }
        @keyframes pulse  { 0%,100%{opacity:.25} 50%{opacity:.85} }
        @keyframes float  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(16px,-20px) scale(1.04)} }
        @keyframes spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pop-in { from{opacity:0;transform:scale(0.93) translateY(14px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>

      {/* ════════════════════════════════
          HERO — cream background
      ════════════════════════════════ */}
      <section ref={heroRef.ref} style={{
        position: "relative", zIndex: 1,
        background: T.bg,
        padding: "4rem 4vw 1rem",
        textAlign: "center",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-8%", left: "-4%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,160,89,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-5%", right: "-3%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,160,89,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{
          opacity: heroRef.inView ? 1 : 0,
          transform: heroRef.inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
          position: "relative",
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.44em", color: T.gold, fontWeight: 700, marginBottom: "1.2rem" }}>— GET IN TOUCH —</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,7vw,5.2rem)", fontWeight: 900, color: T.fg, lineHeight: 1.08, marginBottom: "1.3rem", letterSpacing: "-0.025em" }}>
            Ready to Become<br /><em style={{ color: T.gold, fontStyle: "normal" }}>Inevitable?</em>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.15rem", color: T.muted, maxWidth: "520px", margin: "0 auto", lineHeight: 1.85, fontStyle: "normal" }}>
            Tell us about your brand. We'll respond within one business day with a bespoke strategy — not a sales pitch.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center", marginTop: "2.2rem" }}>
            <div style={{ width: 50, height: 1, background: `linear-gradient(to right, transparent, ${T.gold})` }} />
            <span style={{ color: T.gold, fontSize: "0.75rem", animation: "pulse 2.5s ease-in-out infinite" }}>✦</span>
            <div style={{ width: 50, height: 1, background: `linear-gradient(to left, transparent, ${T.gold})` }} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CONTACT FORM 
      ════════════════════════════════ */}
      <section ref={formRef.ref} style={{
        position: "relative", zIndex: 1,
        background: T.bg,
        padding: "3rem 6vw 4rem",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(197,160,89,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{
          maxWidth: 700, margin: "0 auto",
          opacity: formRef.inView ? 1 : 0,
          transform: formRef.inView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          position: "relative",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, rgba(197,160,89,0.3))` }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", letterSpacing: "0.3em", color: T.goldDark, fontWeight: 700, whiteSpace: "nowrap" }}>YOUR ENQUIRY</p>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, rgba(197,160,89,0.3))` }} />
          </div>

          {formState === "success" ? (
            <div style={{
              background: T.white,
              border: `1.5px solid rgba(197,160,89,0.2)`,
              borderRadius: 28,
              padding: "4rem 2.5rem",
              textAlign: "center",
              animation: "pop-in 0.5s ease forwards",
            }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${T.goldDark}, ${T.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.75rem", boxShadow: `0 8px 32px rgba(197,160,89,0.3)` }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.32em", color: T.gold, fontWeight: 700, marginBottom: "0.7rem" }}>MESSAGE RECEIVED</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: T.fg, marginBottom: "0.9rem", letterSpacing: "-0.02em" }}>
                We'll Be in Touch <em style={{ color: T.gold, fontStyle: "normal" }}>Soon.</em>
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", color: T.muted, lineHeight: 1.8, fontStyle: "normal", maxWidth: "360px", margin: "0 auto 2.25rem" }}>
                Our team will review your brief and respond with a tailored strategy within one business day.
              </p>
              <button
                onClick={() => setFormState("idle")}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.22em", fontWeight: 700, color: T.fg, background: T.gold, border: "none", borderRadius: "100px", padding: "0.75rem 2rem", cursor: "pointer", transition: "all 0.25s" }}
              >SEND ANOTHER ENQUIRY</button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <div>
                  <Label required>Full Name</Label>
                  <Input name="name" placeholder="Your full name" required />
                </div>
                <div>
                  <Label required>Email Address</Label>
                  <Input name="email" type="email" placeholder="you@company.com" required />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <div>
                  <Label required>Phone / WhatsApp</Label>
                  <Input name="phone" type="tel" placeholder="+91 98765 43210" required />
                </div>
                <div>
                  <Label>Business Name</Label>
                  <Input name="business" placeholder="Your brand name" />
                </div>
              </div>

              <div>
                <Label>Services Required</Label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["Product Shoots", "Reels Creation", "Event Videography", "Video Editing", "LinkedIn Management", "Copywriting", "Graphic Design", "Billboard Advertising", "Brand Collaboration", "Business Card Design"].map(s => (
                    <ServiceChip key={s} label={s} on={selectedServices.includes(s)} toggle={() => toggleService(s)} />
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <div>
                  <Label>Business Scale</Label>
                  <Select name="businessScale" placeholder="Select scale..." options={["Personal Brand", "Small Business", "Startup", "Medium Business", "Large Brand"]} />
                </div>
                <div>
                  <Label>Monthly Budget</Label>
                  <Select name="budget" placeholder="Select budget..." options={["Under ₹25,000", "₹25,000 – ₹75,000", "₹75,000 – ₹2,00,000", "₹2,00,000+"]} />
                </div>
              </div>

              <div>
                <Label>Tell Us About Your Project</Label>
                <Textarea name="projectDetails" placeholder="Your industry, target audience, key challenges, and what success looks like..." />
              </div>

              <div style={{ borderTop: `1px solid rgba(197,160,89,0.3)`, paddingTop: "1.75rem" }}>
                <Label required>Preferred Contact Method</Label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "0.65rem" }}>
                  {["Phone Call", "WhatsApp", "Email"].map(m => (
                    <RadioOption key={m} name="contactMethod" label={m} checked={contactMethod === m} onChange={() => setContactMethod(m)} />
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: "0.5rem" }}>
                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    background: T.gold,
                    color: T.white,
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: formState === "submitting" ? 'not-allowed' : 'pointer',
                    boxShadow: '0 12px 32px rgba(197,160,89,0.3)',
                    transition: 'all 0.3s',
                    opacity: formState === "submitting" ? 0.7 : 1
                  }}
                  onMouseEnter={e => !(formState === "submitting") && (e.currentTarget.style.background = T.goldLight)}
                  onMouseLeave={e => !(formState === "submitting") && (e.currentTarget.style.background = T.gold)}
                >
                  {formState === "submitting" ? 'Sending Request...' : 'Send Enquiry ✦'}
                </button>

                <p style={{ textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", color: T.muted, fontStyle: "normal", marginTop: "1rem", fontWeight: 500 }}>
                  We respond within 1 business day. No spam, ever.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <div style={{ padding: "1.4rem 6vw", borderTop: `1px solid rgba(197,160,89,0.12)`, background: T.bgAlt, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", position: "relative", zIndex: 1 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.57rem", letterSpacing: "0.22em", color: T.goldDark, fontWeight: 700 }}>© 2025 MARKETSPARK STUDIO</span>
        <em style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", color: T.muted, fontStyle: "normal", fontWeight: 500 }}>Where Brands Become Inevitable.</em>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {[
            { href: "https://instagram.com", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.goldDark} strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill={T.goldDark} stroke="none" /></svg> },
            { href: "https://linkedin.com", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.goldDark} strokeWidth="1.8"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg> },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, border: `1px solid rgba(197,160,89,0.3)`, transition: "all 0.2s" }}
            >{s.icon}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
