import { useEffect, useRef, useState } from "react";
const CountUp = ({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
}) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const ease = 1 - Math.pow(1 - step / steps, 3);
            setVal(Math.round(ease * target));
            if (step >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
};
export default CountUp;
