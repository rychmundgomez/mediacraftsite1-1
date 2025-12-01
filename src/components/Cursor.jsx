import React, { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.querySelector(".cursor-dot");

    if (!cursor || "ontouchstart" in window) return; // disable on mobile

    const move = e => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="cursor-dot"></div>;
}
