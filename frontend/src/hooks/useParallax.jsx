import { useCallback, useEffect, useRef } from "react";

export const useParallax = () => {
  const listenersRef = useRef([]);

  useEffect(() => {
    let mx = 0;
    let my = 0;
    let rafId = null;

    const onMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      const scroll = window.scrollY;
      listenersRef.current.forEach((cb) => cb(scroll, mx, my));
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const register = useCallback((cb) => {
    listenersRef.current.push(cb);
    return () => {
      listenersRef.current = listenersRef.current.filter((fn) => fn !== cb);
    };
  }, []);

  return register;
};
