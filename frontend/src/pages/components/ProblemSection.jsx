import { useEffect, useRef } from "react";

const ProblemSection = () => {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          ref.current?.classList.add("problem-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      style={{
        padding: "120px 40px",
        maxWidth: 800,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div className="badge" style={{ marginBottom: 32 }}>
        The Problem
      </div>
      <h2
        ref={ref}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 56,
          lineHeight: 1.05,
          marginBottom: 32,
          color: "#e8edf5",
        }}
      >
        <span className="problem-line">
          <span className="problem-line-inner">MOST FILIPINO BUSINESSES</span>
        </span>
        <span className="problem-line">
          <span className="problem-line-inner" style={{ color: "#f59e0b" }}>
            PRICE BY FEEL.
          </span>
        </span>
      </h2>
      <p
        style={{
          fontSize: 18,
          color: "rgba(232,237,245,0.6)",
          lineHeight: 1.8,
        }}
      >
        You open a spreadsheet. You add some numbers. You guess. Maybe you make
        a profit. Maybe you don't. You won't know until it's too late.
        <br />
        <br />
        <strong style={{ color: "#e8edf5" }}>CostIQ ends the guessing.</strong>
      </p>
    </section>
  );
};

export default ProblemSection;
