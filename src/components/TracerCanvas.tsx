"use client";

import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Group, Rect, Path, Line } from "react-konva";
import Konva from "konva";
import type { LetterDef } from "@/types";
import { computeAccuracy, isStrokeLikelyMatched } from "@/lib/metrics";
import { getCanvasSize } from "@/lib/utils";

type Props = {
  letter: LetterDef;
  onComplete: (summary: { ms: number; accuracy: number }) => void;
};

export default function TracerCanvas({ letter, onComplete }: Props) {
  const { w, h } = getCanvasSize();
  const PADDING = 24;

  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [lines, setLines] = useState<{ points: number[] }[]>([]);
  const drawingRef = useRef(false);
  const startMs = useRef<number | null>(null);

  const pathRefs = useRef<Record<string, Konva.Path | null>>({});

  const [showReference, setShowReference] = useState(true);
  const [canDraw, setCanDraw] = useState(false);

  // Show reference for 15s, then hide and enable drawing
  useEffect(() => {
    setShowReference(true);
    setCanDraw(false);
    const t = setTimeout(() => {
      setShowReference(false);
      setCanDraw(true);
    }, 15_000);
    return () => clearTimeout(t);
  }, [letter.id]);

  // Start timing when first stroke begins
  useEffect(() => {
    if (lines.length === 1 && startMs.current == null) {
      startMs.current = performance.now();
    }
  }, [lines.length]);

  const handleDown = (e: any) => {
    if (!canDraw) return; // block drawing before 15s
    drawingRef.current = true;
    const pos = e.target.getStage().getPointerPosition();
    if (!pos) return;
    setLines((prev) => [...prev, { points: [pos.x, pos.y] }]);
  };

  const handleMove = (e: any) => {
    if (!drawingRef.current || !canDraw) return;
    const p = e.target.getStage().getPointerPosition();
    if (!p) return;
    setLines((prev) => {
      const next = [...prev];
      const last = { ...next[next.length - 1] };
      last.points = last.points.concat([p.x, p.y]);
      next[next.length - 1] = last;
      return next;
    });
  };

  const handleUp = () => {
    if (!canDraw) return;
    drawingRef.current = false;

    const bboxes = letter.strokes.map((s) => {
      const node = pathRefs.current[s.id];
      const r = node?.getClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    });

    const matched = letter.strokes.every((s) => {
      const node = pathRefs.current[s.id];
      if (!node) return false;
      const r = node.getClientRect();
      return lines.some((l) =>
        isStrokeLikelyMatched(l.points, { x: r.x, y: r.y, w: r.width, h: r.height })
      );
    });

    if (matched) {
      const ms = Math.max(0, performance.now() - (startMs.current ?? performance.now()));
      const accuracy = computeAccuracy(lines, bboxes);
      onComplete({ ms, accuracy });
    }
  };

  const guideStrokeWidth = 22;
  const drawStrokeWidth = 10;

  return (
    <div className="w-full max-w-[620px] mx-auto p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold">{letter.display}</div>
          <div className="text-xs opacity-70">{letter.phonics}</div>
          {showReference ? (
            <span className="text-xs text-green-600">(Look carefully! Drawing unlocks in 15s)</span>
          ) : (
            <span className="text-xs text-gray-500">(Now draw the letter!)</span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-2 rounded-lg bg-gray-200 active:scale-[.98]"
            onClick={() => setLines([])}
            disabled={!canDraw}
          >
            Clear
          </button>
          <button
            className="px-3 py-2 rounded-lg bg-gray-200 active:scale-[.98]"
            onClick={() => setTool((t) => (t === "pen" ? "eraser" : "pen"))}
            disabled={!canDraw}
          >
            Tool: {tool === "pen" ? "✏️ Pen" : "🧽 Eraser"}
          </button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border">
        <Stage
          width={w}
          height={h}
          onMouseDown={handleDown}
          onMousemove={handleMove}
          onMouseup={handleUp}
          onTouchStart={handleDown}
          onTouchMove={handleMove}
          onTouchEnd={handleUp}
          style={{ touchAction: "none" }}
        >
          <Layer>
            <Rect x={0} y={0} width={w} height={h} fill="#fff" />
            <Group x={PADDING} y={PADDING}>
              {letter.strokes.map((s) => (
                <Path
                  key={s.id}
                  data={s.path}
                  stroke={showReference ? "#1e88e5" : "#e5e7eb"}
                  strokeWidth={guideStrokeWidth}
                  lineCap="round"
                  lineJoin="round"
                  opacity={showReference ? 0.25 : 0}
                  ref={(node) => (pathRefs.current[s.id] = node)}
                />
              ))}

              {lines.map((l, idx) => (
                <Line
                  key={idx}
                  points={l.points}
                  stroke="#df4b26"
                  strokeWidth={drawStrokeWidth}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={tool === "eraser" ? "destination-out" : "source-over"}
                />
              ))}
            </Group>
          </Layer>
        </Stage>
      </div>
      <p className="mt-3 text-sm opacity-70">
        The letter is shown for 15 seconds. After that, you can draw it from memory!
      </p>
    </div>
  );
}
