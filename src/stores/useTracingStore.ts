// import { create } from 'zustand';

// interface TracingState {
//   language: 'en' | 'hi';
//   letter: string;
//   setLanguage: (v: 'en' | 'hi') => void;
//   setLetter: (v: string) => void;
// }

// export const useTracingStore = create<TracingState>((set) => ({
//   language: 'en',
//   letter: 'A',
//   setLanguage: (v) => set({ language: v }),
//   setLetter: (v) => set({ letter: v })
// }));

import { create } from 'zustand';

interface TracingState {
  language: 'en';
  letter: string;
  setLetter: (v: string) => void;
}

export const useTracingStore = create<TracingState>((set) => ({
  language: 'en',
  letter: 'A',
  setLetter: (v) => set({ letter: v }),
}));
