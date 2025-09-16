// import type { LetterDef, Language } from "@/types";

// export const LETTERS: LetterDef[] = [
//   // English examples (add more A–Z as you like)
//   {
//     id: "A",
//     language: "en",
//     display: "A",
//     phonics: "A as in Apple",
//     strokes: [
//       { id: "A-1", path: "M 100 400 L 200 100" },
//       { id: "A-2", path: "M 200 100 L 300 400" },
//       { id: "A-3", path: "M 140 260 L 260 260" }
//     ]
//   },
//   {
//     id: "B",
//     language: "en",
//     display: "B",
//     phonics: "B as in Ball",
//     strokes: [
//       { id: "B-1", path: "M 120 100 L 120 400" },
//       { id: "B-2", path: "M 120 100 Q 220 100 220 200 Q 220 250 120 250" },
//       { id: "B-3", path: "M 120 250 Q 240 250 240 360 Q 240 420 120 400" }
//     ]
//   },

//   // Hindi examples (अ–ज्ञ; add more)
//  {
//   id: "अ",
//   language: "hi",
//   display: "अ",
//   phonics: "अ — अनार",
//   // Stroke order: bowl → vertical stem → shirorekhā
//   strokes: [
//     // Bowl: fuller lower curve, short exit; does NOT drift into stem region (x >= 315)
//     {
//       id: "HI-A-1",
//       path: [
//         "M 258 178",                 // start inside top bowl
//         "q -112 0 -158 58",          // sweep left
//         "q -42 50 0 116",            // go down/around
//         "q 42 62 150 58",            // forward belly
//         "q 44 -3 62 -14"             // short exit; still far from stem x
//       ].join(" ")
//     },
//     // Right vertical stem (placed further right than before)
//     { id: "HI-A-2", path: "M 340 145 L 340 445" },
//     // Shirorekhā (headline)
//     { id: "HI-A-3", path: "M 92 145 L 340 145" }
//   ]
// },


//   {
//     id: "उ",
//     language: "hi",
//     display: "उ",
//     phonics: "उ — उल्लू",
//     strokes: [
//       { id: "HI-U-1", path: "M 80 110 L 300 110" },
//       {
//         id: "HI-U-2",
//         path:
//           "M 220 110 q -80 0 -110 40 q -30 30 0 70 q 25 40 90 38 q 60 -2 90 -28"
//       },
//       { id: "HI-U-3", path: "M 280 110 L 280 380" }
//     ]
//   }
// ];

// export const EN_POOL = LETTERS.filter((l) => l.language === "en");
// export const HI_POOL = LETTERS.filter((l) => l.language === "hi");

// export function randomLetter(lang?: Language) {
//   const pool = lang ? LETTERS.filter((l) => l.language === lang) : LETTERS;
//   return pool[Math.floor(Math.random() * pool.length)];
// }

// export function getLetterById(id: string) {
//   return LETTERS.find((l) => l.id === id);
// }

import type { LetterDef, Language } from "@/types";

export const LETTERS: LetterDef[] = [
  // English examples (add more A–Z as you like)
  {
    id: "A",
    language: "en",
    display: "A",
    phonics: "A as in Apple",
    strokes: [
      { id: "A-1", path: "M 100 400 L 200 100" },
      { id: "A-2", path: "M 200 100 L 300 400" },
      { id: "A-3", path: "M 140 260 L 260 260" }
    ]
  },
  {
    id: "B",
    language: "en",
    display: "B",
    phonics: "B as in Ball",
    strokes: [
      { id: "B-1", path: "M 120 100 L 120 400" },
      { id: "B-2", path: "M 120 100 Q 220 100 220 200 Q 220 250 120 250" },
      { id: "B-3", path: "M 120 250 Q 240 250 240 360 Q 240 420 120 400" }
    ]
  }
];

export const EN_POOL = LETTERS.filter((l) => l.language === "en");

export function randomLetter(lang?: Language) {
  const pool = lang ? LETTERS.filter((l) => l.language === lang) : LETTERS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getLetterById(id: string) {
  return LETTERS.find((l) => l.id === id);
}
