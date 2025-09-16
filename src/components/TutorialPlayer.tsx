// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { Stage, Layer, Group, Rect, Path, Text } from "react-konva";
// import Konva from "konva";
// import type { LetterDef } from "@/types";
// import { getCanvasSize } from "@/lib/utils";

// type Props = {
//   letter: LetterDef;
//   onSkip: () => void;
//   onNextHindi: () => void;
// };

// export default function TutorialPlayer({ letter, onSkip, onNextHindi }: Props) {
//   const { w, h } = getCanvasSize();
//   const PADDING = 24;

//   const pathRefs = useRef<Record<string, Konva.Path | null>>({});
//   const tweens = useRef<Konva.Tween[]>([]);
//   const [step, setStep] = useState(0);

//   // Start/advance animation every 5s
//   useEffect(() => {
//     if (step >= letter.strokes.length) return;
//     const id = letter.strokes[step].id;
//     const node = pathRefs.current[id];
//     if (!node) return;

//     // Stroke-dash animation to "draw" the guide
//     const length = node.getLength();
//     node.dash([length, length]);
//     node.dashOffset(length);
//     node.opacity(0.9);

//     const tw = new Konva.Tween({
//       node,
//       dashOffset: 0,
//       duration: 1.3,
//       easing: Konva.Easings.EaseInOut
//     });
//     tw.play();
//     tweens.current.push(tw);

//     const timer = setTimeout(() => {
//       setStep((s) => Math.min(s + 1, letter.strokes.length));
//     }, 5000); // 5 seconds per step
//     return () => clearTimeout(timer);
//   }, [step, letter.strokes]);

//   useEffect(() => () => { // cleanup on unmount
//     tweens.current.forEach((t) => t.destroy());
//     tweens.current = [];
//   }, []);

//   const nums = useMemo(() => letter.strokes.map((_, i) => i + 1), [letter.strokes]);

//   return (
//     <div className="w-full max-w-[620px] mx-auto p-4">
//       <div className="flex items-center justify-between mb-3">
//         <div>
//           <div className="text-5xl font-bold">{letter.display}</div>
//           <div className="text-sm opacity-80">{letter.phonics}</div>
//         </div>
//         <div className="flex gap-2">
//           <button
//             className="px-3 py-2 rounded-lg bg-gray-200 active:scale-[.98]"
//             onClick={onSkip}
//             aria-label="Skip to drawing"
//           >
//             Skip → Draw
//           </button>
//           <button
//             className="px-3 py-2 rounded-lg bg-blue-600 text-white active:scale-[.98]"
//             onClick={onNextHindi}
//             aria-label="Next Hindi Tutorial"
//           >
//             Next (Hindi)
//           </button>
//         </div>
//       </div>

//       <div className="rounded-xl overflow-hidden border">
//         <Stage width={w} height={h}>
//           <Layer>
//             <Rect x={0} y={0} width={w} height={h} fill="#fff" />
//             <Group x={PADDING} y={PADDING}>
//               {nums.map((n, i) => (
//                 <Text
//                   key={`num-${i}`}
//                   text={`${n}`}
//                   x={8}
//                   y={i * 18}
//                   fontSize={14}
//                   fill={i < step ? "#4caf50" : i === step ? "#1e88e5" : "#888"}
//                 />
//               ))}

//               {letter.strokes.map((s, i) => (
//                 <Path
//                   key={s.id}
//                   data={s.path}
//                   stroke={i < step ? "#4caf50" : i === step ? "#1e88e5" : "#999"}
//                   strokeWidth={22}
//                   lineCap="round"
//                   lineJoin="round"
//                   opacity={0.22}
//                   ref={(node) => (pathRefs.current[s.id] = node)}
//                 />
//               ))}

//               {step >= letter.strokes.length && (
//                 <Text
//                   text="✅ Tutorial finished! You can start drawing now."
//                   x={w / 2 - 200}
//                   y={h / 2 - 10}
//                   fontSize={18}
//                   fill="#2e7d32"
//                 />
//               )}
//             </Group>
//           </Layer>
//         </Stage>
//       </div>

//       <div className="mt-3 text-sm opacity-70">
//         Step {Math.min(step + 1, letter.strokes.length)} of {letter.strokes.length} — each step auto-plays every 5s.
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Stage, Layer, Group, Rect, Path, Text } from "react-konva";
import Konva from "konva";
import type { LetterDef } from "@/types";
import { getCanvasSize } from "@/lib/utils";

type Props = {
  letter: LetterDef;
  onSkip: () => void;
};

export default function TutorialPlayer({ letter, onSkip }: Props) {
  const { w, h } = getCanvasSize();
  const PADDING = 24;

  const pathRefs = useRef<Record<string, Konva.Path | null>>({});
  const tweens = useRef<Konva.Tween[]>([]);
  const [step, setStep] = useState(0);

  // Start/advance animation every 5s
  useEffect(() => {
    if (step >= letter.strokes.length) return;
    const id = letter.strokes[step].id;
    const node = pathRefs.current[id];
    if (!node) return;

    // Stroke-dash animation to "draw" the guide
    const length = node.getLength();
    node.dash([length, length]);
    node.dashOffset(length);
    node.opacity(0.9);

    const tw = new Konva.Tween({
      node,
      dashOffset: 0,
      duration: 1.3,
      easing: Konva.Easings.EaseInOut,
    });
    tw.play();
    tweens.current.push(tw);

    const timer = setTimeout(() => {
      setStep((s) => Math.min(s + 1, letter.strokes.length));
    }, 5000); // 5 seconds per step
    return () => clearTimeout(timer);
  }, [step, letter.strokes]);

  useEffect(
    () => () => {
      // cleanup on unmount
      tweens.current.forEach((t) => t.destroy());
      tweens.current = [];
    },
    []
  );

  const nums = useMemo(() => letter.strokes.map((_, i) => i + 1), [letter.strokes]);

  return (
    <div className="w-full max-w-[620px] mx-auto p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-5xl font-bold">{letter.display}</div>
          <div className="text-sm opacity-80">{letter.phonics}</div>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-2 rounded-lg bg-gray-200 active:scale-[.98]"
            onClick={onSkip}
            aria-label="Skip to drawing"
          >
            Skip 
          </button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border">
        <Stage width={w} height={h}>
          <Layer>
            <Rect x={0} y={0} width={w} height={h} fill="#fff" />
            <Group x={PADDING} y={PADDING}>
              {nums.map((n, i) => (
                <Text
                  key={`num-${i}`}
                  text={`${n}`}
                  x={8}
                  y={i * 18}
                  fontSize={14}
                  fill={i < step ? "#4caf50" : i === step ? "#1e88e5" : "#888"}
                />
              ))}

              {letter.strokes.map((s, i) => (
                <Path
                  key={s.id}
                  data={s.path}
                  stroke={i < step ? "#4caf50" : i === step ? "#1e88e5" : "#999"}
                  strokeWidth={22}
                  lineCap="round"
                  lineJoin="round"
                  opacity={0.22}
                  ref={(node) => (pathRefs.current[s.id] = node)}
                />
              ))}

              {step >= letter.strokes.length && (
                <Text
                  text="Tutorial finished! You can start drawing now."
                  x={w / 2 - 200}
                  y={h / 2 - 10}
                  fontSize={18}
                  fill="#2e7d32"
                />
              )}
            </Group>
          </Layer>
        </Stage>
      </div>

      <div className="mt-3 text-sm opacity-70">
        Step {Math.min(step + 1, letter.strokes.length)} of {letter.strokes.length} — each step auto-plays every 5s.
      </div>
    </div>
  );
}
