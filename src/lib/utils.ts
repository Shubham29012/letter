import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// SSR-safe window size for Konva canvas
export function getCanvasSize() {
  if (typeof window === "undefined") return { w: 360, h: 520 };
  const w = Math.min(window.innerWidth, 560);
  const h = Math.min(Math.floor(window.innerHeight * 0.72), 560);
  return { w, h };
}
