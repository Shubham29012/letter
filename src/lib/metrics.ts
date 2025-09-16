/**
 * Heuristic scoring:
 * - For each guide stroke's bounding box, measure how many drawn points
 *   fell within a tolerance-expanded bbox.
 * - Average across strokes to produce 0–100% accuracy.
 * - Also ensures child drew strokes roughly in sequence (soft requirement).
 */

type BBox = { x: number; y: number; w: number; h: number };

export function isStrokeLikelyMatched(
  drawPoints: number[],
  bbox: BBox,
  tolerancePX = 24
) {
  if (!drawPoints || drawPoints.length < 8) return false;
  const x1 = bbox.x - tolerancePX;
  const y1 = bbox.y - tolerancePX;
  const x2 = bbox.x + bbox.w + tolerancePX;
  const y2 = bbox.y + bbox.h + tolerancePX;
  let inside = 0;
  const total = drawPoints.length / 2;
  for (let i = 0; i < drawPoints.length; i += 2) {
    const x = drawPoints[i], y = drawPoints[i + 1];
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) inside++;
  }
  return inside / total > 0.55;
}

export function strokeCoverageRatio(
  drawPoints: number[],
  bbox: BBox,
  tolerancePX = 24
) {
  if (!drawPoints || drawPoints.length < 8) return 0;
  const x1 = bbox.x - tolerancePX;
  const y1 = bbox.y - tolerancePX;
  const x2 = bbox.x + bbox.w + tolerancePX;
  const y2 = bbox.y + bbox.h + tolerancePX;
  let inside = 0;
  const total = Math.max(1, drawPoints.length / 2);
  for (let i = 0; i < drawPoints.length; i += 2) {
    const x = drawPoints[i], y = drawPoints[i + 1];
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) inside++;
  }
  return inside / total; // 0..1
}

/**
 * Compute overall accuracy: average of best coverage per guide stroke.
 */
export function computeAccuracy(
  lines: { points: number[] }[],
  strokeBBoxes: BBox[],
  tolerancePX = 24
): number {
  if (strokeBBoxes.length === 0) return 0;
  let total = 0;
  for (const bbox of strokeBBoxes) {
    let best = 0;
    for (const l of lines) {
      best = Math.max(best, strokeCoverageRatio(l.points, bbox, tolerancePX));
    }
    total += best;
  }
  return Math.round((total / strokeBBoxes.length) * 100);
}
