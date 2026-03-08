"use client";

import type * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "./SplitText";

function MarketingOrb({ scrollFactor }: { scrollFactor: number }) {
  const group = useRef<THREE.Group | null>(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;
    const { x, y } = state.mouse;
    const intensity = 1 + scrollFactor * 2;
    group.current.rotation.y += 0.3 * delta * intensity;
    group.current.rotation.x = 0.2 + scrollFactor * 0.8 + y * 0.15;
    group.current.rotation.z += x * 0.05;

    // Base scale is dynamic dependent on the screen viewport
    const baseScale = Math.min(viewport.width / 4, viewport.height / 4, 1.3);
    const s = baseScale + scrollFactor * 2.5;

    group.current.scale.set(s, s, s);

    // Perfectly centers the sphere so it rests under the text.
    group.current.position.y = -scrollFactor * 3;
    group.current.position.x = scrollFactor * 1;
  });

  // Re-aligned labels mapping directly to Target Image 2 layout
  const labels = [
    { text: "Growth", pos: [-2.6, -0.4, 0] as [number, number, number] },      // Middle Left
    { text: "Strategy", pos: [2.6, 0.5, 0] as [number, number, number] },     // Middle Right
    { text: "Content", pos: [0, -2.5, 1] as [number, number, number] },       // Bottom Center
    { text: "Performance", pos: [0, 2.5, -1] as [number, number, number] },   // Top Center
  ];

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={2}>
        <mesh>
          <sphereGeometry args={[1.8, 64, 64]} />
          <meshStandardMaterial
            metalness={0.95}
            roughness={0.05}
            color="#1a1a1a"
            envMapIntensity={2}
          />
        </mesh>

        {/* Orbital Rings */}
        <mesh rotation={[0, 0, Math.PI / 8]}>
          <torusGeometry args={[2.4, 0.02, 32, 256]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, -Math.PI / 6]}>
          <torusGeometry args={[2.2, 0.015, 32, 256]} />
          <meshBasicMaterial color="#c5a059" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 1.5, Math.PI / 4, 0]}>
          <torusGeometry args={[2.0, 0.01, 32, 256]} />
          <meshBasicMaterial color="#8a6b1f" transparent opacity={0.3} />
        </mesh>

        {/* Floating Strategy Labels */}
        {labels.map((label, i) => (
          <Html
            key={i}
            position={label.pos}
            center
            distanceFactor={6}
            className="pointer-events-none select-none"
          >
            <div className="rounded-full border border-[rgba(197,160,89,0.2)] bg-[rgba(255,255,255,0.4)] px-3 py-1 backdrop-blur-md">
              <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] text-[#c5a059]">
                {label.text}
              </p>
            </div>
          </Html>
        ))}
      </Float>

      {/* Lights */}
      <pointLight position={[5, 5, 5]} intensity={160} color="#d4af37" />
      <pointLight position={[-5, -5, -5]} intensity={80} color="#ffffff" />
      <ambientLight intensity={1.2} />
    </group>
  );
}

export function Hero() {
  const [scrollFactor, setScrollFactor] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = 1000;
      const y = window.scrollY;
      setScrollFactor(Math.max(0, Math.min(1, y / max)));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[120vh] overflow-x-hidden"
    >
      {/* ── Fullscreen 3D Background Container ── */}
      <div className="fixed inset-0 z-0 h-screen w-full flex items-center justify-center pointer-events-none">
        {/* Base Gradient Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,#ddd8ce_0%,#e6e1d8_30%,#ede8e0_60%,#f0ece4_100%)]" />

        {/* The 3D Canvas bounds are isolated directly in the center of the screen */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            className="h-full w-full pointer-events-auto"
          >
            <MarketingOrb scrollFactor={scrollFactor} />
          </Canvas>
        </div>

        {/* Top/Bottom Fade Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f3ef]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(253,252,248,0.4)_100%)]" />
      </div>

      {/* ── Content Overlay Layer ── */}
      {/* This guarantees the Title will sit dead-center over the 3D Sphere on any screen size */}
      <div className="relative z-10 mx-auto flex flex-col items-center w-full">
        {/* 'h-screen' wrapper perfectly centers the Eyebrow and Title */}
        <div className="flex h-screen w-[min(1120px,100%-1.5rem)] flex-col items-center justify-center text-center pointer-events-none">

          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-8 mt-4 flex items-center gap-3 pointer-events-auto"
          >
            <span className="h-[1px] w-8 bg-[rgba(197,160,89,0.5)]" />
            <p className="m-0 text-[10px] font-black uppercase tracking-[0.32em] text-[#c5a059]">
              Premium 360° Marketing Studio
            </p>
            <span className="h-[1px] w-8 bg-[rgba(197,160,89,0.5)]" />
          </motion.div>

          {/* Huge SplitText Title Centered perfectly on screen */}
          <div className="relative flex justify-center w-full px-2 sm:px-12 z-20 pointer-events-auto">
            <SplitText
              text="Marketing That Makes Brands Inevitable"
              className="font-heading text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.02] font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] text-center max-w-[1000px] flex items-center justify-center flex-wrap mx-auto mix-blend-normal"
            />
            {/* Subtle Behind-Text Black ambient drop-shadow matching reference */}
            <div className="absolute inset-0 -z-10 blur-[90px] opacity-40 bg-black scale-[1.15] pointer-events-none" />
          </div>
        </div>

        {/* ── Lower Scrolling Content Layer ── */}
        {/* Secondary content naturally flows underneath the centered block but pulled up properly to reduce the gap and stay visible gracefully */}
        <div className="relative z-10 mx-auto w-[min(900px,100%-1.5rem)] flex flex-col items-center justify-start text-center pb-24 -mt-[25vh] sm:-mt-[28vh]">

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-10 max-w-2xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[2] text-white font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mix-blend-normal z-30 px-4 text-center mx-auto"
          >
            We don't just run ads. We architect demand through cinematic content,
            high-performance digital strategy, and unforgettable physical experiences.
            Welcome to the new era of brand building.

          </motion.p>
          <br />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 z-30"
          >
            <a
              href="#contact"
              className="flex h-[56px] w-[240px] items-center justify-center rounded-full bg-black text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all hover:bg-[#c5a059] hover:text-black hover:scale-[1.04]"
            >
              Start Your Imperium
            </a>
            <br />
            <a
              href="#portfolio"
              className="flex h-[56px] w-[240px] items-center justify-center rounded-full bg-[#d4d4d4] text-[11px] font-black uppercase tracking-[0.2em] text-black shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-all hover:bg-white hover:scale-[1.04]"
            >
              View Gallery
            </a>
            <br />
          </motion.div>
          <br />
          <div className="flex items-center justify-center gap-8 flex-wrap">

            {[
              { name: 'Accenture', src: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg' },
              { name: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
              { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
              { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' }
            ].map((company) => (

              <div key={company.name} className="flex flex-col items-center gap-2">

                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 hover:shadow-lg transition">

                  <img
                    src={company.src}
                    alt={company.name}
                    className="h-6 object-contain grayscale hover:grayscale-0 transition"
                  />

                </div>


              </div>

            ))}

          </div>
          <br />
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8a8a8a] mt-6 text-center">
            Trusted by <span className="text-[#111] font-black">50+ Global Brands</span>
          </p>
        </div>
      </div>

      {/* spacer to blend comfortably into the next section */}
      <div className="h-[15vh]" />
    </section>
  );
}
