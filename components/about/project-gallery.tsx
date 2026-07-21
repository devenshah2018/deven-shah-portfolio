'use client';

import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '@/database/content-registry';
import { ProjectMedia } from '@/components/projects/project-media';
import { scrollToProject } from '@/lib/url-utils';

const ROTATE_MS = 4200;
const FADE_MS = 240;

/**
 * Rotating showcase of projects (media + title + description). Starts from a random
 * shuffle each load so it isn't repetitive, and quick-fades between entries. Pauses
 * while hovered or when scrolled out of view.
 */
export function ProjectGallery() {
  const projects = PROJECTS;
  // Deterministic order for SSR; shuffled on the client to avoid a hydration mismatch.
  const [order, setOrder] = useState<number[]>(() => projects.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  // Random, non-repetitive starting sequence (client-only).
  useEffect(() => {
    const arr = projects.map((_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const a = arr[i]!;
      arr[i] = arr[j]!;
      arr[j] = a;
    }
    setOrder(arr);
    setPos(0);
  }, [projects.length]);

  // Pause rotation when the gallery isn't on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(!!entries[0]?.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Advance with a quick fade-out → swap → fade-in.
  useEffect(() => {
    if (paused || !inView || order.length <= 1) return;
    const timer = setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setPos((p) => (p + 1) % order.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, inView, order.length]);

  const project = projects[order[pos] ?? 0]!;

  return (
    <div
      ref={rootRef}
      className="select-none overflow-hidden rounded-xl border border-[#2a2a2a]/80 bg-[#161616]/95 shadow-[0_1px_0_0_rgba(255,255,255,0.03)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between border-b border-[#2a2a2a]/60 px-5 py-3.5">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737373]">Selected work</h3>
        <div className="flex items-center gap-1" aria-hidden>
          {order.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-1 rounded-full transition-colors duration-300 ${i === pos ? 'bg-[#a3a3a3]' : 'bg-[#3a3a3a]'}`}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        <div
          className="transition-opacity ease-in-out"
          style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS - 20}ms` }}
        >
          {/* key forces a fresh <video> so demos restart cleanly on each rotation */}
          <div key={project.id} className="group/media">
            <ProjectMedia project={project} aspectClass="aspect-[16/10]" />
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={() => scrollToProject(project.id)}
              className="group/g block max-w-full text-left"
            >
              <span className="block truncate text-[15px] font-semibold text-[#f5f5f0] transition-colors group-hover/g:text-white">
                {project.title}
              </span>
            </button>
            {project.subtitle && (
              <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-[#9a9a9a]">
                {project.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
