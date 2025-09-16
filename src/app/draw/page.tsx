// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import TracerCanvas from "@/components/TracerCanvas";
// import { getLetterById, randomLetter } from "@/lib/letters";

// export default function DrawPage() {
//   const params = useSearchParams();
//   const router = useRouter();
//   const id = params.get("id") ?? undefined;

//   const letter = useMemo(() => getLetterById(id ?? "") ?? randomLetter(), [id]);
//   const [result, setResult] = useState<{ ms: number; accuracy: number } | null>(null);

//   useEffect(() => setResult(null), [letter.id]);

//   return (
//     <main className="min-h-screen p-4">
//       <div className="mx-auto max-w-[680px]">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-xl font-semibold">Draw</h1>
//           <button
//             className="px-3 py-2 rounded-lg bg-gray-200 active:scale-[.98]"
//             onClick={() => router.push("/tutorial")}
//           >
//             Back to Tutorial
//           </button>
//         </div>

//         <TracerCanvas
//           letter={letter}
//           onComplete={(summary) => setResult(summary)}
//         />

//         {result && (
//           <div className="mx-auto max-w-[620px] mt-4 p-4 rounded-xl border bg-gray-50">
//             <h2 className="text-lg font-semibold mb-1">Great job! 🎉</h2>
//             <p className="text-sm text-gray-700">
//               Time: <strong>{(result.ms / 1000).toFixed(1)}s</strong> &nbsp;|&nbsp;
//               Accuracy: <strong>{result.accuracy}%</strong>
//             </p>
//             <div className="mt-3 flex gap-2">
//               <button
//                 className="px-3 py-2 rounded-lg bg-blue-600 text-white active:scale-[.98]"
//                 onClick={() => router.refresh()}
//               >
//                 Try Again
//               </button>
//               <button
//                 className="px-3 py-2 rounded-lg bg-gray-200 active:scale-[.98]"
//                 onClick={() => router.push("/tutorial")}
//               >
//                 New Tutorial
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TracerCanvas from "@/components/TracerCanvas";
import { getLetterById, randomLetter } from "@/lib/letters";

export default function DrawPage() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id") ?? undefined;

  // Always English only now
  const letter = useMemo(() => getLetterById(id ?? "") ?? randomLetter("en"), [id]);
  const [result, setResult] = useState<{ ms: number; accuracy: number } | null>(null);

  useEffect(() => setResult(null), [letter.id]);

  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto max-w-[680px]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Draw</h1>
          <button
            className="px-3 py-2 rounded-lg bg-gray-200 active:scale-[.98]"
            onClick={() => router.push("/tutorial")}
          >
            Back to Tutorial
          </button>
        </div>

        <TracerCanvas
          letter={letter}
          onComplete={(summary) => setResult(summary)}
        />

        {result && (
          <div className="mx-auto max-w-[620px] mt-4 p-4 rounded-xl border bg-gray-50">
            <h2 className="text-lg font-semibold mb-1">Great job! 🎉</h2>
            <p className="text-sm text-gray-700">
              Time: <strong>{(result.ms / 1000).toFixed(1)}s</strong> &nbsp;|&nbsp;
              Accuracy: <strong>{result.accuracy}%</strong>
            </p>
            <div className="mt-3 flex gap-2">
              <button
                className="px-3 py-2 rounded-lg bg-blue-600 text-white active:scale-[.98]"
                onClick={() => router.refresh()}
              >
                Try Again
              </button>
              <button
                className="px-3 py-2 rounded-lg bg-gray-200 active:scale-[.98]"
                onClick={() => router.push("/tutorial")}
              >
                New Tutorial
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
