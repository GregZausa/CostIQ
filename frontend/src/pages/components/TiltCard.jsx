import { useRef } from "react";

const TiltCard = ({ children, style, className }) => {
  const ref = useRef(null);
  const inner = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(8px)`;
    if (inner.current) {
      inner.current.style.backgroundPosition = `${50 + x * 20}% ${50 + y * 20}%`;
    }
  };
  const onLeave = () => {
    ref.current.style.transform = `perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)`;
    ref.current.style.transition = "transform 0.6s cubic-bezier(0.23,1,0.32,1)";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 600);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div ref={inner}>{children}</div>
    </div>
  );
};

export default TiltCard;