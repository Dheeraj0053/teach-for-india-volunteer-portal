import { useEffect, useState, useRef } from 'react';

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

export function parseStatValue(display) {
  const firstDigit = display.search(/\d/);
  if (firstDigit === -1) return { prefix: display, end: 0, suffix: '' };

  const lastDigit = display.search(/\d(?!\d|,)/);
  let i = firstDigit;
  while (i < display.length && /[\d,]/.test(display[i])) i += 1;

  const numStr = display.slice(firstDigit, i).replace(/,/g, '');
  return {
    prefix: display.slice(0, firstDigit),
    end: parseInt(numStr, 10) || 0,
    suffix: display.slice(i),
  };
}

export function formatCount(n) {
  return n.toLocaleString('en-US');
}

/**
 * Animates from `start` to `end` when `active` becomes true.
 */
export function useCountUp(end, { start = 1, duration = 2000, active = true } = {}) {
  const [count, setCount] = useState(start);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    if (end <= start) {
      setCount(end);
      hasRun.current = true;
      return;
    }

    hasRun.current = true;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(start + (end - start) * eased);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(tick);
  }, [active, end, start, duration]);

  return count;
}
