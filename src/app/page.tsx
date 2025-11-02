"use client";

import { useEffect, useMemo, useState } from "react";
import { slides } from "@/data/slides";

const TOTAL_SLIDES = slides.length;

export default function PresentationPage() {
  const [index, setIndex] = useState(0);

  const currentSlide = useMemo(() => slides[index], [index]);
  const progress = useMemo(
    () => Math.round(((index + 1) / TOTAL_SLIDES) * 100),
    [index]
  );

  const goTo = (nextIndex: number) => {
    if (nextIndex < 0) {
      return;
    }
    if (nextIndex >= TOTAL_SLIDES) {
      return;
    }
    setIndex(nextIndex);
  };

  const handleKey = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      goTo(index + 1);
    }
    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      goTo(index - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      goTo(TOTAL_SLIDES - 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-6 sm:px-8">
      <div className="w-full max-w-6xl space-y-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-indigo-900/20 backdrop-blur">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary-300">
              Comprehensive Clinical Briefing
            </p>
            <h1 className="text-2xl font-serif text-primary-100 sm:text-3xl">
              Pregnancy & Kidney: Evidence-Based Overview
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex min-w-[120px] items-center gap-2">
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-primary-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-medium text-primary-200">
                {progress}%
              </span>
            </div>
            <span className="rounded-full border border-primary-500/30 px-3 py-1 text-xs uppercase tracking-wide text-primary-100">
              Slide {index + 1} / {TOTAL_SLIDES}
            </span>
          </div>
        </header>

        <section className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-inner shadow-black/40">
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-primary-100 sm:text-2xl">
              {currentSlide.title}
            </h2>
            <ul className="space-y-3 text-base leading-7 text-slate-200 sm:text-lg">
              {currentSlide.bullets.map((point, idx) => (
                <li
                  key={idx}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/50 px-3 py-2 shadow-sm shadow-slate-950/60"
                >
                  {point}
                </li>
              ))}
            </ul>
            {currentSlide.footnote ? (
              <p className="rounded-lg border border-primary-500/20 bg-primary-950/40 px-3 py-2 text-sm text-primary-200">
                {currentSlide.footnote}
              </p>
            ) : null}
          </div>
        </section>

        <footer className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-primary-500/40 px-4 py-2 text-sm font-semibold text-primary-100 transition hover:border-primary-400/70 hover:bg-primary-500/10 disabled:cursor-not-allowed disabled:border-slate-700 disabled:text-slate-500"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
            >
              ← Previous
            </button>
            <button
              type="button"
              className="rounded-full border border-primary-500/40 px-4 py-2 text-sm font-semibold text-primary-100 transition hover:border-primary-400/70 hover:bg-primary-500/10 disabled:cursor-not-allowed disabled:border-slate-700 disabled:text-slate-500"
              onClick={() => goTo(index + 1)}
              disabled={index === TOTAL_SLIDES - 1}
            >
              Next →
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
            <span className="rounded-full border border-slate-700 px-3 py-1">
              Keyboard: ← → Home End
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1">
              Sources: Davidson · Kumar & Clark · Harrison
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
