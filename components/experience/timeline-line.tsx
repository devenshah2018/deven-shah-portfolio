'use client';

import { memo, useCallback, useEffect, useId, useState, type RefObject } from 'react';

/** Keep resize-driven geometry updates local to the decorative SVG. */
export const TimelineLine = memo(function TimelineLine({
  containerRef,
  viewMode,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  viewMode: 'compact' | 'detailed';
}) {
  const timelineMaskId = useId();
  const [timelineSvg, setTimelineSvg] = useState<{
    top: number;
    left: number;
    height: number;
    gapRects: { y: number; height: number }[];
    ticks: { y: number }[];
  } | null>(null);

  const updateTimelineLine = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cardsWrapper = container.querySelector<HTMLElement>('[data-timeline-cards]');
    const yearCells = cardsWrapper?.querySelectorAll<HTMLElement>('[data-year-cell]') ?? [];
    if (yearCells.length < 2) {
      setTimelineSvg(null);
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const GAP = 4;
    const first = yearCells[0]!;
    const last = yearCells[yearCells.length - 1]!;
    const firstRect = first.getBoundingClientRect();
    const lastRect = last.getBoundingClientRect();
    const yearCenterX = firstRect.left + firstRect.width / 2 - containerRect.left;
    const lineTop = firstRect.bottom - containerRect.top + GAP;
    const lineBottom = lastRect.top - containerRect.top - GAP;
    const lineHeight = Math.max(0, lineBottom - lineTop);

    const gapRects: { y: number; height: number }[] = [];
    const ticks: { y: number }[] = [];
    for (let i = 0; i < yearCells.length; i++) {
      const cell = yearCells[i]!;
      const rect = cell.getBoundingClientRect();

      if (cell.hasAttribute('data-has-year')) {
        const gapTop = rect.top - containerRect.top - GAP;
        const gapHeight = rect.height + GAP * 2;
        const gapBottom = gapTop + gapHeight;
        if (gapBottom <= lineTop || gapTop >= lineTop + lineHeight) continue;
        const clipTop = Math.max(0, gapTop - lineTop);
        const clipBottom = Math.min(lineHeight, gapBottom - lineTop);
        gapRects.push({
          y: clipTop,
          height: Math.max(0, clipBottom - clipTop),
        });
      } else {
        const card = cell.closest('article');
        const logoRow = card?.querySelector<HTMLElement>('[data-logo-row]');
        const anchorRect = logoRow?.getBoundingClientRect();
        const cellCenterY = rect.top + rect.height / 2 - containerRect.top;
        const centerY = anchorRect
          ? anchorRect.top + anchorRect.height / 2 - containerRect.top
          : cellCenterY;
        const tickY = centerY - lineTop;
        if (tickY >= 0 && tickY <= lineHeight) {
          ticks.push({ y: tickY });
        }
      }
    }

    const next = { top: lineTop, left: yearCenterX, height: lineHeight, gapRects, ticks };
    setTimelineSvg(previous => {
      if (
        previous &&
        previous.top === next.top &&
        previous.left === next.left &&
        previous.height === next.height &&
        previous.gapRects.length === gapRects.length &&
        previous.ticks.length === ticks.length &&
        previous.gapRects.every(
          (rect, i) => rect.y === gapRects[i]!.y && rect.height === gapRects[i]!.height
        ) &&
        previous.ticks.every((tick, i) => tick.y === ticks[i]!.y)
      )
        return previous;
      return next;
    });
  }, [containerRef]);

  useEffect(() => {
    updateTimelineLine();
    const t = setTimeout(updateTimelineLine, 400);
    const container = containerRef.current;
    if (!container) return () => clearTimeout(t);
    const obs = new ResizeObserver(updateTimelineLine);
    obs.observe(container);
    return () => {
      clearTimeout(t);
      obs.disconnect();
    };
  }, [viewMode, updateTimelineLine]);

  return (
    <>
      {timelineSvg && timelineSvg.height > 0 && (
        <svg
          className='pointer-events-none absolute overflow-visible'
          style={{
            top: timelineSvg.top,
            left: timelineSvg.left,
            width: 12,
            height: timelineSvg.height,
            transform: 'translateX(-50%)',
          }}
          aria-hidden
        >
          <defs>
            <mask id={timelineMaskId}>
              <rect x='0' y='0' width='12' height={timelineSvg.height} fill='white' />
              {timelineSvg.gapRects.map((g, i) => (
                <rect key={i} x='0' y={g.y} width='12' height={g.height} fill='black' />
              ))}
            </mask>
          </defs>
          <rect
            x='1'
            y='0'
            width='1'
            height={timelineSvg.height}
            fill='#404040'
            fillOpacity='0.4'
            mask={timelineSvg.gapRects.length > 0 ? `url(#${timelineMaskId})` : undefined}
          />
          {timelineSvg.ticks.map((tick, i) => (
            <line
              key={i}
              x1='1'
              y1={tick.y}
              x2='8'
              y2={tick.y}
              stroke='#525252'
              strokeOpacity='0.5'
              strokeWidth='1'
            />
          ))}
        </svg>
      )}
    </>
  );
});
