'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center text-black dark:bg-black dark:text-white bw:bg-white bw:text-black">
      <div className="mb-4 text-[#FFD600]">
        <span className="material-symbols-outlined notranslate text-6xl">error_outline</span>
      </div>
      <h2 className="mb-4 text-3xl font-black tracking-tight">Something went wrong!</h2>
      <p className="mb-8 max-w-md text-xl opacity-70">
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={reset}
        className="rounded-lg border-2 border-transparent bg-black px-8 py-3 font-bold text-white transition-all hover:opacity-80 active:scale-95 dark:bg-white dark:text-black bw:bg-black bw:text-white"
      >
        Try Again
      </button>
    </div>
  );
}
