export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black bw:bg-white">
      <div className="relative h-16 w-16">
        <div className="absolute top-0 left-0 h-full w-full animate-pulse rounded-full border-4 border-[#FFD600]/30"></div>
        <div className="absolute top-0 left-0 h-full w-full animate-spin rounded-full border-4 border-transparent border-t-[#FFD600]"></div>
      </div>
    </div>
  );
}
