import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Services() {
  useScrollReveal(".reveal");

  return (
    <section id="services" className="section reveal">
      <h2 className="section-title">Services</h2>

      <div className="grid-3">
        <div className="card">
          <h3>UI/UX Design</h3>
          <p>Modern, clean, aesthetic interfaces.</p>
        </div>

        <div className="card">
          <h3>Web Development</h3>
          <p>Fast, responsive and scalable websites.</p>
        </div>

        <div className="card">
          <h3>Brand Identity</h3>
          <p>Logo design, color systems, typography.</p>
        </div>
      </div>
    </section>
  );
}
