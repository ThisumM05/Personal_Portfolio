import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

import { SectionHeader } from "./SectionHeader";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const CARD_WIDTH = 240;
const CARD_GAP = 24;
const AUTO_SPEED = 0.3; // degrees per frame

function CylinderCarousel({ items }) {
  const count = items.length;
  const angleStep = 360 / count;
  // radius so cards don't overlap
  const radius = Math.round(
    (CARD_WIDTH + CARD_GAP) / (2 * Math.tan(Math.PI / count)),
  );

  const rotationRef = useRef(0);
  const rafRef = useRef(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const lastX = useRef(0);
  const downX = useRef(0);
  const velocityRef = useRef(0);
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  // animation loop
  const tick = useCallback(() => {
    if (!isDragging.current) {
      if (Math.abs(velocityRef.current) > 0.05) {
        // decelerate fling
        velocityRef.current *= 0.92;
        rotationRef.current += velocityRef.current;
      } else {
        velocityRef.current = 0;
        rotationRef.current += AUTO_SPEED;
      }
      setRotation(rotationRef.current);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  // pointer events for drag
  const onPointerDown = (e) => {
    isDragging.current = true;
    hasDragged.current = false;
    lastX.current = e.clientX;
    downX.current = e.clientX;
    velocityRef.current = 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    // Only start capturing after moving >4px so small clicks pass through
    if (!hasDragged.current && Math.abs(e.clientX - downX.current) < 4) return;
    if (!hasDragged.current) {
      hasDragged.current = true;
      containerRef.current?.setPointerCapture(e.pointerId);
    }
    lastX.current = e.clientX;
    const delta = dx * 0.25;
    velocityRef.current = delta;
    rotationRef.current += delta;
    setRotation(rotationRef.current);
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  // Suppress click after a real drag so links don't fire
  const onClick = (e) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const CARD_HEIGHT = 340;

  return (
    <div
      ref={containerRef}
      className="relative select-none w-full"
      style={{ height: CARD_HEIGHT + 28, perspective: 900, cursor: "grab" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onClick={onClick}
      aria-label="3D rotating projects carousel — drag to spin"
    >
      {/* zero-size pivot point centered horizontally */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {items.map((project, index) => {
          const cardAngle = angleStep * index;
          return (
            <div
              key={project.slug}
              style={{
                position: "absolute",
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                top: 0,
                left: -CARD_WIDTH / 2, // center card on rotation axis
                transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
              draggable={false}
            >
              <ProjectCard project={project} index={index} />
            </div>
          );
        })}
      </div>

      {/* hint label */}
      <p
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-slate-500 pointer-events-none"
        aria-hidden="true"
      >
      </p>
    </div>
  );
}

export function Projects() {
  return (
    <motion.section
      variants={sectionVariants}
      id="projects"
      className="flex flex-col gap-4 md:gap-12"
      aria-label="Featured projects"
    >
      <SectionHeader
        eyebrow="Projects"
        title="Selected work"
        kicker="Systems-focused projects with clear responsibilities and clean architecture."
      />

<br />
<br />
      <div className="mt-2">
        <CylinderCarousel items={projects} />
      </div>

      <br />
      <br />
    </motion.section>
    
  );
}
