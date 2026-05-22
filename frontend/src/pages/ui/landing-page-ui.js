import { useCallback, useEffect, useRef } from "react";

export const useParallax = () => {
  const scrollY = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const rafId = useRef(null);
  const listeners = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    const onMouse = (e) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    const tick = () => {
      listeners.current.forEach((fn) =>
        fn(scrollY.current, mouseX.current, mouseY.current),
      );
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const register = useCallback((fn) => {
    listeners.current.push(fn);
    return () => {
      listeners.current = listeners.current.filter((l) => l !== fn);
    };
  }, []);

  return register;
};


