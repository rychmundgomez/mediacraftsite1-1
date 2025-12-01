import { useEffect } from "react";

export default function useParallax(selector, factor = 0.4) {
  useEffect(() => {
    const element = document.querySelector(selector);
    if (!element) return;

    const handler = () => {
      const offset = window.scrollY * factor;
      element.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [selector]);
}
