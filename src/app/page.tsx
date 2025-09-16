import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2">Letter Drawing Activity</h1>
        
        <Link
          href="/tutorial"
          className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 text-white text-lg active:scale-[.98]"
        >
          Start Activity
        </Link>
      </div>
    </main>
  );
}



// "use client";

// import AlphabetTracer from "../components/AlphabetTracer";

// export default function Page() {
//   return <AlphabetTracer />;
// }
