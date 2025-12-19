"use client";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import HackerHeader from "./HackerHeader";
import HighText from "./HighText";
import CustomDiv from "./CustomDiv";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function SpotifyCard() {
  const { data, isLoading } = useSWR("/api/spotify", fetcher);
  if (isLoading) return <SpotifyBentoSkeleton />;
  return (
    <div>
      <div className="flex flex-col group">
        <div className="mb-12">
          <HackerHeader
            prefix1="02"
            prefix2="01"
            prefix3="01"
            text="MUSIC OBSESSED"
            lineSide="left"
            bgColour="bg-lime-400"
          />
        </div>
        <div className="grid grid-cols-3 gap-8 mb-12 bg-lime-500 py-12 px-8 rounded-2xl rounded-tl-[60px] rounded-br-[60px]">
          <p className="col-span-3 sm:col-span-2 text-stone-50">
            I'm not sure if I can claim to be an <HighText variant="light" text="audiophile" />{" "}
            just yet but I do love some good songs. I'm a big fan of the{" "}
            <HighText text="Smiths" variant="light" />, <HighText text="Radiohead" variant="light" /> and{" "}
            <HighText text="Deftones" variant="light" /> , though I don't shy away from a varied
            music taste. Also, I play music (the guitar and a long time ago the
            saxophone) - though I'm really quite terrible. The only song I can
            play well is either <HighText text="Nothing else matters" variant="light" /> by{" "}
            <HighText text="Metallica" variant="light" /> or <HighText text="Tears in heaven" variant="light" />{" "}
            by <HighText text="Eric Clapton" variant="light" />.
          </p>
          <div className="col-span-3 sm:col-span-1">
            <CustomDiv 
              label={"Fav Song"} 
              lineColor="bg-lime-400" 
              textColor="text-stone-50"  
            />
            <Link
              href={data.allTime?.url || "#"}
              target="_blank"
              className="relative h-full min-h-[320px] flex flex-col items-center justify-between p-6"
            >
              {data.allTime?.coverImage ? (
                <>
                  <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full animate-[spin_6s_linear_infinite]">
                      <div
                        className="absolute inset-0 rounded-full opacity-30"
                        style={{
                          background: `repeating-radial-gradient(
                  #1a2e05 0, 
                  #1a2e05 2px, 
                  transparent 3px, 
                  transparent 4px
                )`,
                        }}
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 rounded-full overflow-hidden z-10">
                        <Image
                          src={data.allTime.coverImage}
                          alt={data.allTime.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full text-center mt-6 relative z-10">
                    <p className="text-2xl font-black text-lime-950 truncate mb-1">
                      {data.allTime.title}
                    </p>
                    <p className="text-lime-700 font-bold font-mono text-sm uppercase tracking-wider truncate">
                      {data.allTime.artist}
                    </p>
                    <div className="flex justify-center gap-1 mt-3 h-4 items-end">
                      {[50, 75, 60, 90, 55, 90].map((h, i) => (
                        <div
                          key={i}
                          className="w-2 bg-lime-600 rounded-full animate-bounce"
                          style={{
                            animationDelay: `${i * 0.1}s`,
                            height: `${h}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-lime-700 font-mono text-xs">
                  // NO_DISC_LOADED
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="grid grid-cols-2 gap-6 h-full">
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
        <div className="col-span-2 lg:col-span-2 lg:row-span-2 rounded-2xl p-6 relative overflow-hidden group min-h-96 my-2 bg-yellow-200">
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
                    className="w-8 h-8 text-lime-800"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>

                  <span className="text-2xl font-black text-lime-900 mt-2 mb-1">
                    {data.profile.followers}
                  </span>
                  <span className="text-lime-700 font-semibold">Followers</span>
                </div>

                <div className="absolute w-40 h-40 rounded-full border border-lime-500/20 animate-ping opacity-20" />
                <div className="absolute w-56 h-56 rounded-full border border-lime-500/10" />
              </div>

              <Link
                target="_blank"
                href={data.profile?.url || "#"}
                className="absolute bottom-6 right-6 z-20 hover:scale-105 transition-all"
              >
                <p className="bg-lime-200 text-lime-900 px-8 py-4 rounded-full text-sm font-bold shadow-lg">
                  View Profile
                </p>
              </Link>
            </>
          ) : (
            <div className="text-zinc-500">Loading Profile...</div>
          )}
        </div>

        {/* --- BOTTOM: PLAYLIST BLOCK --- */}
        {data.playlist && (
          <Link
            href={data.playlist.url}
            target="_blank"
            className="col-span-2 lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-6 group hover:shadow-lg transition-all duration-300"
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl shadow-lg overflow-hidden border-4 border-zinc-800 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <Image
                src={data.playlist.coverImage}
                alt="Playlist"
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col flex-1 min-w-0 justify-center">
              <span className="text-[10px] uppercase font-black text-zinc-500 tracking-widest mb-1">
                // MY_PLAYLIST
              </span>
              <h3 className="text-xl md:text-2xl font-black text-stone-50 leading-none truncate">
                {data.playlist.name}
              </h3>
              <p className="text-zinc-400 text-sm md:text-base truncate mt-1 font-medium">
                {data.playlist.description}
              </p>
            </div>

            {/* Larger Play Button */}
            <div className="hidden sm:flex w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-500 text-black items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all shadow-xl shrink-0">
              <svg
                className="w-6 h-6 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </Link>
        )}
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
      <div className="col-span-1 sm:col-span-2 lg:col-span-4 h-24 bg-zinc-900 rounded-2xl animate-pulse" />
    </div>
  );
}
