// export type Stroke = { id: string; path: string };
// export type Language = "en" | "hi";
// export type LetterDef = {
//   id: string;           // unique key (e.g., "A", "अ")
//   language: Language;
//   display: string;      // render glyph
//   phonics: string;      // label
//   audioUrl?: string;    // optional sound
//   strokes: Stroke[];    // SVG path data per stroke
// };

export type Stroke = { id: string; path: string };

export type Language = "en";

export type LetterDef = {
  id: string;           // unique key (e.g., "A")
  language: Language;
  display: string;      // render glyph
  phonics: string;      // label
  audioUrl?: string;    // optional sound
  strokes: Stroke[];    // SVG path data per stroke
};
