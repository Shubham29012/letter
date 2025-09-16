// "use client";

// import { useMemo, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import TutorialPlayer from "@/components/TutorialPlayer";
// import { EN_POOL, HI_POOL, getLetterById, randomLetter } from "@/lib/letters";
// import type { Language } from "@/types";

// export default function TutorialPage() {
//   const params = useSearchParams();
//   const router = useRouter();

//   const qId = params.get("id") ?? undefined;
//   const qLang = (params.get("lang") as Language | null) ?? null;

//   const initial = useMemo(() => {
//     if (qId) return getLetterById(qId) ?? randomLetter(qLang ?? undefined);
//     if (qLang) return randomLetter(qLang);
//     return randomLetter(); // random English or Hindi (one only) per session
//   }, [qId, qLang]);

//   const [letter, setLetter] = useState(initial);

//   const skipToDraw = () => {
//     router.push(`/draw?id=${encodeURIComponent(letter.id)}`);
//   };

//   const nextHindi = () => {
//     const next = HI_POOL[Math.floor(Math.random() * HI_POOL.length)];
//     setLetter(next);
//   };

//   return (
//     <main className="min-h-screen p-4">
//       <div className="mx-auto max-w-[680px]">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-xl font-semibold">Tutorial</h1>
//           <div className="text-sm text-gray-600">
//             Current: <strong>{letter.display}</strong>{" "}
//             <span className="opacity-70">({letter.language === "en" ? "English" : "Hindi"})</span>
//           </div>
//         </div>
//         <TutorialPlayer letter={letter} onSkip={skipToDraw} onNextHindi={nextHindi} />
//       </div>
//     </main>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TutorialPlayer from "@/components/TutorialPlayer";
import { EN_POOL, getLetterById, randomLetter } from "@/lib/letters";
import type { Language } from "@/types";

export default function TutorialPage() {
  const params = useSearchParams();
  const router = useRouter();

  const qId = params.get("id") ?? undefined;

  const initial = useMemo(() => {
    if (qId) return getLetterById(qId) ?? randomLetter("en");
    return randomLetter("en"); // random English letter per session
  }, [qId]);

  const [letter, setLetter] = useState(initial);

  const skipToDraw = () => {
    router.push(`/draw?id=${encodeURIComponent(letter.id)}`);
  };

  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto max-w-[680px]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Tutorial</h1>
          <div className="text-sm text-gray-600">
            Current: <strong>{letter.display}</strong>{" "}
            <span className="opacity-70">(English)</span>
          </div>
        </div>
        <TutorialPlayer letter={letter} onSkip={skipToDraw} />
      </div>
    </main>
  );
}
