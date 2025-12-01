import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">YourBrand</div>
      <nav>
        <a href="#hero">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact" className="btn-primary">Contact</a>
      </nav>
    </header>
  );
}
