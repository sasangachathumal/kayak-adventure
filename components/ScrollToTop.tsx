"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Scroll to the top with smooth animation after layout settles
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
