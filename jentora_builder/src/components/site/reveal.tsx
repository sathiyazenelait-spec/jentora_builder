import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({ children, className = '', style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        el.classList.add('visible');
        observer.unobserve(el);
      }
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${className}`} style={style}>{children}</div>;
}

