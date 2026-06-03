import { useRef, useCallback } from "react";

export function useMagnetic(strength: number = 0.3) {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
    ref.current.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
    const timeout = setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
