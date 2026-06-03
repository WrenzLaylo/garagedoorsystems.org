import { useRef, useCallback } from "react";

interface TiltOptions {
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

export function useTilt({ maxTilt = 8, scale = 1.02 }: TiltOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxTilt;
      const rotateY = (x - 0.5) * maxTilt;
      ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    },
    [maxTilt, scale],
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    ref.current.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    const timeout = setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const onMouseEnter = useCallback(() => {
    if (ref.current) ref.current.style.transition = "transform 0.1s ease-out";
  }, []);

  return { ref, onMouseMove, onMouseLeave, onMouseEnter };
}
