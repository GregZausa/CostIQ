import { useEffect, useRef, useState } from "react";
import landingStyles from "./../styles/landingStyles";

import LossTicker from "./components/LossTicker";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ProblemSection from "./components/ProblemSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import PricingSection from "./components/PricingSection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import RevealSection from "./components/RevealSection";
import { useParallax } from "../hooks/useParallax";

const LandingPage = () => {
  const register = useParallax();
  const [heroVisible, setHeroVisible] = useState(false);

  const gridRef = useRef(null);
  const glowRef = useRef(null);
  const glowRef2 = useRef(null);
  const metric1Ref = useRef(null);
  const metric2Ref = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const ctaSectionGlowRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);

    const unreg = register((scroll, mx, my) => {
      if (gridRef.current) {
        gridRef.current.style.transform = `translateY(${scroll * 0.25}px) translateX(${mx * 12}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translateX(calc(-50% + ${mx * 60}px)) translateY(${my * 40 - scroll * 0.15}px)`;
      }
      if (glowRef2.current) {
        glowRef2.current.style.transform = `translateX(${mx * -30}px) translateY(${my * -20}px)`;
      }
      if (metric1Ref.current) {
        metric1Ref.current.style.transform = `translateY(${-scroll * 0.18}px)`;
      }
      if (metric2Ref.current) {
        metric2Ref.current.style.transform = `translateY(${-scroll * 0.28}px)`;
      }
      if (heroTitleRef.current) {
        heroTitleRef.current.style.transform = `translateY(${scroll * 0.08}px)`;
      }
      if (heroSubRef.current) {
        heroSubRef.current.style.transform = `translateY(${scroll * 0.05}px)`;
      }
      if (ctaSectionGlowRef.current) {
        const docH = document.body.scrollHeight - window.innerHeight;
        const pct = Math.max(0, (scroll - docH * 0.7) / (docH * 0.3));
        const size = 400 + pct * 500;
        const opacity = 0.06 + pct * 0.12;
        ctaSectionGlowRef.current.style.width = `${size}px`;
        ctaSectionGlowRef.current.style.height = `${size}px`;
        ctaSectionGlowRef.current.style.opacity = opacity;
      }
    });

    return unreg;
  }, [register]);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#080c14",
        color: "#e8edf5",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <style>{landingStyles}</style>

      <div className="noise" />
      <LossTicker />
      <Nav />

      <Hero
        heroVisible={heroVisible}
        gridRef={gridRef}
        glowRef={glowRef}
        glowRef2={glowRef2}
        metric1Ref={metric1Ref}
        metric2Ref={metric2Ref}
        heroTitleRef={heroTitleRef}
        heroSubRef={heroSubRef}
      />

      <Stats />

      <RevealSection delay={0}>
        <ProblemSection />
      </RevealSection>

      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />

      <FinalCTA ctaSectionGlowRef={ctaSectionGlowRef} />
      <Footer />
    </div>
  );
};

export default LandingPage;
