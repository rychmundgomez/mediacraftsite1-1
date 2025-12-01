import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function About() {
  useScrollReveal(".reveal");

  return (
    <section id="about" className="section reveal">
      <h2 className="section-title">About Us</h2>
      <p className="section-text">
        We create brands, websites, and digital experiences that convert.
      </p>
    </section>
  );
}
