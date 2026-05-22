import { useEffect, useRef } from "react";

export const useReveal = (delay = 0, threshold = 0.12) => {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            if (ref.current) ref.current.classList.add("visible");
          }, delay);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay, threshold]);

  return ref;
};
