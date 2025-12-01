import React from "react";
import useTypewriter from "../hooks/useTypewriter";
import useParallax from "../hooks/useParallax";

export default function Hero() {
  const { text, blink } = useTypewriter(
    ["Web Experiences", "Brand Design", "Modern UI", "React Apps"],
    70
  );

  useParallax("#hero .hero-bg", 0.25);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content reveal">
        <h1>We Build <span className="accent">Stunning</span> Digital Products</h1>
        <h2 className="typewriter">
          {text}
          <span className={`cursor ${blink ? "blink" : ""}`}>|</span>
        </h2>
        <a href="#services" className="btn-primary">Explore Services</a>
      </div>
    </section>
  );
}
