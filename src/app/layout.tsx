import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alphabet Tracing — English & Hindi",
  description: "Tracing board and tutorial for kids to learn English and Hindi alphabets.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-900/70 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
            </div>
          </header>
          <div className="flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
