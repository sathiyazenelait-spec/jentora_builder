import React, { useState, useRef, useCallback } from 'react';

interface Pointer3DCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  maxMove?: number;
  glare?: boolean;
}

export function Pointer3DCard({
  children,
  className = '',
  maxTilt = 10,
  maxMove = 12,
  glare = true,
  style,
  onMouseMove,
  onMouseLeave,
  ...rest
}: Pointer3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    active: false,
    rx: 0,
    ry: 0,
    tx: 0,
    ty: 0,
    spotX: 50,
    spotY: 50,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to +0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to +0.5

      // 3D Tilt: rotates towards cursor
      const rx = py * -maxTilt;
      const ry = px * maxTilt;

      // Slight 3D Slide / Move in direction of cursor
      const tx = px * maxMove;
      const ty = py * maxMove - 4; // slight upward bias on hover

      const spotX = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const spotY = Math.round(((e.clientY - rect.top) / rect.height) * 100);

      if (cardRef.current) {
        const transformVal = `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 20px) scale3d(1.028, 1.028, 1.028)`;
        cardRef.current.style.setProperty('transform', transformVal, 'important');
      }

      setState({
        active: true,
        rx,
        ry,
        tx,
        ty,
        spotX,
        spotY,
      });

      if (onMouseMove) onMouseMove(e);
    },
    [maxTilt, maxMove, onMouseMove]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (cardRef.current) {
        cardRef.current.style.setProperty(
          'transform',
          'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px) scale3d(1, 1, 1)',
          'important'
        );
      }
      setState({
        active: false,
        rx: 0,
        ry: 0,
        tx: 0,
        ty: 0,
        spotX: 50,
        spotY: 50,
      });
      if (onMouseLeave) onMouseLeave(e);
    },
    [onMouseLeave]
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-3d-point-slide ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1200px',
        willChange: 'transform, box-shadow',
        transform: state.active
          ? `perspective(1200px) rotateX(${state.rx.toFixed(2)}deg) rotateY(${state.ry.toFixed(2)}deg) translate3d(${state.tx.toFixed(2)}px, ${state.ty.toFixed(2)}px, 18px) scale3d(1.025, 1.025, 1.025)`
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px) scale3d(1, 1, 1)',
        transition: state.active
          ? 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease, background 0.3s ease'
          : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.65s ease, border-color 0.4s ease, background 0.4s ease',
        ...style,
      }}
      {...rest}
    >
      {glare && (
        <div
          className="pointer-glare-overlay"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            background: state.active
              ? `radial-gradient(circle 280px at ${state.spotX}% ${state.spotY}%, rgba(212, 175, 55, 0.2), transparent 70%)`
              : 'transparent',
            opacity: state.active ? 1 : 0,
            transition: 'opacity 0.35s ease',
            zIndex: 2,
          }}
        />
      )}
      <div
        className="card-3d-inner-content"
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {children}
      </div>
    </div>
  );
}
