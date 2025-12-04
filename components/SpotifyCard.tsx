"use client";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import HackerHeader from "./HackerHeader";
import HighText from "./HighText";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function SpotifyCard() {
  const { data, error, isLoading } = useSWR("/api/spotify", fetcher);

  if (isLoading) return <SpotifyBentoSkeleton />;
  if (error || !data)
    return <div className="text-red-500">Error loading music data.</div>;

  return (
    <div>
      <div className="flex flex-col group">
        <div className="mb-12">
          <HackerHeader
            text="02 01 01 // MUSIC OBSESSED"
            lineSide="left"
            variant="light"
          />
        </div>
        <p className="text-stone-50 mb-12">
          I'm not sure if I can claim to be an <HighText text="audiophile" variant="light"/> just yet but I do love some good songs. I'm a big fan of the <HighText text="Smiths" variant="light"/>, <HighText text="Radiohead" variant="light"/> and <HighText text="Deftones" variant="light"/> , though I don't shy away from a varied music taste. Also, I play music (the guitar and a long time ago the saxophone) - though I'm really quite terrible. The only song I can play well is either <HighText text="Nothing else matters" variant="light"/> by <HighText text="Metallica" variant="light"/> or <HighText text="Tears in heaven" variant="light"/> by <HighText text="Eric Clapton" variant="light"/>.
        </p>
      </div>
      
      {/* Grid Container */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10 lg:gap-14 w-full h-full">
        
        {/* --- LEFT COL: ALL TIME FAVORITE --- */}
        <Link
          href={data.allTime?.url || "#"}
          target="_blank"
          className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-2 relative h-full bg-zinc-900 rounded-2xl overflow-hidden group"
        >
          {data.allTime?.coverImage ? (
            <div className="flex flex-col h-full">
              <Image
                src={data.allTime.coverImage}
                alt={data.allTime.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-900/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-stone-50 font-bold leading-none truncate text-xl">
                  {data.allTime.title}
                </h3>
                <p className="text-stone-200 text-md truncate">
                  {data.allTime.artist}
                </p>
              </div>
              <div className="absolute top-0 left-0 z-10">
                <span className="text-xs font-bold text-stone-50 font-mono tracking-tightest block bg-lime-950/40 p-2 rounded-tl-2xl rounded-br-2xl backdrop-blur-sm">
                  // FAVOURITE_SONG
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500 text-xs">
              No Data
            </div>
          )}
        </Link>

        {/* --- MIDDLE COL: STACKED CARDS --- */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-2 flex flex-col h-full gap-4">
          <Link
            href={data.month?.url || "#"}
            target="_blank"
            className="relative flex-1 px-4 py-8 flex flex-col justify-center rounded-2xl overflow-hidden group"
          >
            {data.month?.coverImage && (
              <>
                <div className="absolute inset-0 z-0">
                  <Image
                    src={data.month.coverImage}
                    alt="Background"
                    fill
                    className="object-cover opacity-40 blur-xs scale-110"
                  />
                </div>
                <div className="absolute inset-0 z-0 bg-linear-to-t from-black/80 via-black/40 to-black/40" />
              </>
            )}
            <div className="relative z-10 flex flex-col gap-2">
              <span className="text-sm text-zinc-300 font-mono tracking-wider">
                // 4_WEEK_FAVOURITE
              </span>
              <div className="flex items-center gap-3">
                {data.month?.coverImage && (
                  <div className="relative h-24 w-24 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={data.month.coverImage}
                      alt="Month"
                      fill
                      sizes="(max-width: 768px) 15vw, 10vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-stone-50 text-md font-bold truncate">
                    {data.month?.title}
                  </p>
                  <p className="text-zinc-300 text-sm truncate">
                    {data.month?.artist}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link
            href={data.recent?.url || "#"}
            target="_blank"
            className="relative flex-1 px-4 py-8 flex flex-col justify-center rounded-2xl overflow-hidden group"
          >
            {data.recent?.coverImage && (
              <>
                <div className="absolute inset-0 z-0">
                  <Image
                    src={data.recent.coverImage}
                    alt="Background"
                    fill
                    className="object-cover opacity-40 blur-xs"
                  />
                </div>
                <div className="absolute inset-0 z-0 bg-linear-to-t from-black/80 via-black/40 to-black/40" />
              </>
            )}
            <div className="relative z-10 flex flex-col gap-2">
              <span className="text-sm text-zinc-300 font-mono tracking-wider">
                // LAST_LISTEN
              </span>
              <div className="flex items-center gap-3">
                {data.recent?.coverImage && (
                  <div className="relative w-24 h-24 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={data.recent.coverImage}
                      alt="Recent"
                      fill
                      sizes="(max-width: 768px) 15vw, 10vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-stone-50 text-md font-bold truncate">
                    {data.recent?.title}
                  </p>
                  <p className="text-zinc-300 text-sm truncate">
                    {data.recent?.artist}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* --- RIGHT COL: PROFILE --- */}
        <div
          className="col-span-2 lg:col-span-2 lg:row-span-2 rounded-2xl p-6 relative overflow-hidden group min-h-96 my-2 bg-lime-700"
        >
          {data.profile ? (
            <>
              <div className="absolute top-6 right-6 w-42 h-42 rounded-2xl shadow-xl overflow-hidden transform rotate-3 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 z-30">
                {data.profile.image ? (
                  <Image
                    src={data.profile.image}
                    alt="Profile"
                    fill
                    sizes="(max-width: 768px) 33vw, 20vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                    ?
                  </div>
                )}
              </div>
              <h2 className="absolute bottom-6 left-8 text-4xl md:text-5xl font-black text-lime-950 z-10">
                {data.profile.name}
              </h2>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative z-20 flex flex-col items-center justify-center w-40 h-40 bg-lime-200 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <svg
                    className="w-8 h-8 text-lime-800 mb-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>

                  <span className="text-2xl font-black text-lime-900 leading-tight">
                    {data.profile.followers}
                  </span>
                  <span className="text-sm uppercase text-lime-800 font-medium mt-1">
                    Followers
                  </span>
                </div>

                <div className="absolute w-40 h-40 rounded-full border border-lime-500/20 animate-ping opacity-20" />
                <div className="absolute w-56 h-56 rounded-full border border-lime-500/10" />
              </div>

              <Link
                target="_blank"
                href={data.profile?.url || "#"} 
                className="absolute bottom-6 right-6 z-20 hover:scale-105 transition-all">
                <p className="bg-lime-950 text-stone-50 px-8 py-4 rounded-full text-sm font-bold shadow-lg">
                  View Profile
                </p>
              </Link>
            </>
          ) : (
            <div className="text-zinc-500">Loading Profile...</div>
          )}
        </div>
      </div>
    </div>
  );
}

function SpotifyBentoSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full h-full opacity-50">
      <div className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-2 h-64 bg-zinc-900 rounded-2xl animate-pulse" />
      <div className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-2 flex flex-col gap-4">
        <div className="flex-1 h-32 bg-zinc-900 rounded-2xl animate-pulse" />
        <div className="flex-1 h-32 bg-zinc-900 rounded-2xl animate-pulse" />
      </div>
      <div className="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 h-64 bg-zinc-900 rounded-2xl animate-pulse" />
    </div>
  );
}