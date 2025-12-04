"use client";

export default function Rank({ count = 0 }: { count?: number }) {
  return (
    <div className="flex justify-center w-full pb-12 md:pb-24">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center relative overflow-hidden group py-16 bg-white rounded-[3rem] shadow-xl shadow-stone-200/50 border border-stone-100">
        <div className="relative z-10 flex flex-col items-center">
          <span className="font-mono text-lime-600 font-bold text-xs tracking-[0.3em] mb-4 bg-lime-50 px-3 py-1 rounded-full">
            DATABASE_QUERY_RESULT
          </span>

          <p className="text-9xl md:text-[200px] font-black text-transparent bg-clip-text bg-linear-to-b from-stone-100 to-stone-300 mb-0 select-none leading-none">
            {count}
          </p>

          <p className="text-xl md:text-3xl font-bold text-stone-800 mb-8">
            Total Customers Served{" "}
            <span className="text-stone-400 text-lg font-normal block mt-2">
              (so far)
            </span>
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-lime-400 text-stone-900 hover:bg-yellow-400 font-bold font-mono text-sm rounded-full transition-all duration-300 shadow-lg shadow-lime-400/20 hover:shadow-yellow-400/30 hover:-translate-y-1"
          >
            <span>INITIATE_CONTACT</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}