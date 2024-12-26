import Image from "next/image";
import Link from "next/link"; // Importa el componente Link

export default function Home() {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <Link
        href="/exercise1"
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        Exercise 1
      </Link>
      <Link
        href="/exercise2"
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        Exercise 2
      </Link>
    </div>
  );
}
