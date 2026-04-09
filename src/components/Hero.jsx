import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

import { MagneticButton } from "./MagneticButton";
import profileImage from "../assets/images.jpg";
import cvPdf from "../assets/Thanuja Thisum Madappuli.pdf";

const heroLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: 2.8, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const heroRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: 2.8, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const MotionDiv = motion.div;

const stats = [
  { label: "Months of experience", value: 6 },
  { label: "Projects delivered", value: 4 },
];

const roles = [
  { text: "Software Engineer", colorClass: "text-indigo-300" },
  { text: "Graphic Designer", colorClass: "text-emerald-300" },
  { text: "Event Planner", colorClass: "text-amber-300" },
];

function Stat({ label, value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 1200;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const increment = value / totalFrames;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }
      setCount(Math.round(current));
    }, frameDuration);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="flex flex-col">
      <span className="text-lg font-semibold text-slate-50">
        {count}
        <span className="text-indigo-300">+</span>
      </span>
      <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
        {label}
      </span>
    </div>
  );
}

function RotatingRoleTypewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex].text;

    const typingSpeed = isDeleting ? 45 : 85;
    const delayAfterType = 1300;
    const delayAfterDelete = 260;

    let timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), delayAfterType);
    } else if (isDeleting && displayText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, delayAfterDelete);
    } else {
      timeout = setTimeout(() => {
        const nextText = isDeleting
          ? currentRole.slice(0, displayText.length - 1)
          : currentRole.slice(0, displayText.length + 1);
        setDisplayText(nextText);
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <p className={`mt-2 text-sm font-medium ${roles[roleIndex].colorClass}`}>
      {displayText}
      <span className="ml-0.5 animate-pulse text-slate-200">|</span>
    </p>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
      <MotionDiv variants={heroLeftVariants} className="text-justify">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
          <span className="block text-sm font-normal text-indigo-200 sm:text-base">
            Hi, I&apos;m
          </span>
          <span className="block w-fit max-w-full whitespace-nowrap">
            <Typewriter
              words={["Thanuja Thisum Madappuli"]}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              loop={false}
            />
          </span>
        </h1>
        <RotatingRoleTypewriter />
        <p className="mt-4 max-w-xl text-sm text-slate-300">
          I design and build reliable systems with clean, maintainable
          architectures — from backend services to interfaces that stay out of
          the way.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <MagneticButton
            as="a"
            href={cvPdf}
            download
            aria-label="Download CV as PDF"
            className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Download CV
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#projects"
            aria-label="Skip to projects section"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-5 py-2 text-xs font-semibold text-slate-100 shadow-sm transition hover:border-indigo-400 hover:text-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            View Projects
          </MagneticButton>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-transparent px-4 py-2 text-xs font-normal text-slate-300 underline-offset-4 hover:text-indigo-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Contact
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-8 text-xs text-slate-300">
          {stats.map((stat) => (
            <Stat key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </MotionDiv>

      <MotionDiv
        variants={heroRightVariants}
        className="relative max-w-md justify-self-center md:justify-self-end"
      >
        <div className="flex justify-center">
          <div className="relative isolate w-full max-w-sm">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-white/20 via-sky-300/15 to-indigo-300/20 blur-2xl" />
            <div className="pointer-events-none absolute -inset-1 -z-10 rounded-[1.8rem] border border-white/15 bg-white/5 backdrop-blur-md" />
            <MotionDiv
              initial={
                shouldReduceMotion ? undefined : { opacity: 0, scale: 1.05 }
              }
              animate={
                shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative w-full overflow-hidden rounded-3xl border border-slate-700/70 bg-transparent shadow-xl shadow-black/50"
            >
              <img
                src={profileImage}
                alt="Portrait of Thanuja Thisum Madappuli"
                className="h-72 w-full object-cover sm:h-80"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-white/10" />
              <div className="pointer-events-none absolute left-6 right-6 top-4 h-10 rounded-full bg-white/20 blur-xl" />
            </MotionDiv>
          </div>
        </div>
      </MotionDiv>
    </section>
  );
}
