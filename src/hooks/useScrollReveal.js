import { useEffect } from "react";

export default function useScrollReveal(selector) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.25 }
    );

    els.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);
}
