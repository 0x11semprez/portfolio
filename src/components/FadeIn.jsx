import { useRef } from "react";
import { useInView } from "./Diagrams";

export default function FadeIn({ children, delay = 0, as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  const on = useInView(ref);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transition: `opacity 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}

export function FadeInGroup({ children, stagger = 0.08, base = 0, className = "" }) {
  const ref = useRef(null);
  const on = useInView(ref);
  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) =>
            child ? (
              <div
                key={child.key ?? i}
                style={{
                  opacity: on ? 1 : 0,
                  transition: `opacity 0.5s ease ${base + i * stagger}s`,
                }}
              >
                {child}
              </div>
            ) : null,
          )
        : children}
    </div>
  );
}
