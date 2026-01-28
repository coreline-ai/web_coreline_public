import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center text-black dark:bg-black dark:text-white bw:bg-white bw:text-black">
      <div className="relative mb-6 h-24 w-24">
        <Image src="/logo.svg" alt="Coreline Logo" fill className="object-contain" priority />
      </div>
      <h2 className="mb-4 text-4xl font-black tracking-tight">PAGE NOT FOUND</h2>
      <p className="mb-8 max-w-md text-xl opacity-70">
        Could not find the requested resource. The page may have been moved or deleted.
      </p>
      <Link
        href="/"
        className="rounded-lg border-2 border-black bg-[#FFD600] px-8 py-3 font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:scale-95"
      >
        Return Home
      </Link>
    </div>
  );
}
