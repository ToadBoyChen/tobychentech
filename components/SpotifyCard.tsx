'use client'
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function SpotifyCard() {
  const { data, error } = useSWR('/api/spotify', fetcher);

  if (error) return <div className="text-white">Failed to load</div>;
  if (!data) return <div className="text-white">Loading...</div>;

  return (
    <Link 
      href={data.url} 
      target="_blank" 
      className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-green-500 transition-colors group max-w-sm"
    >
      <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
        <Image 
          src={data.coverImage} 
          alt={data.title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs text-green-500 font-mono tracking-wider mb-1">
            // TOP_TRACK_LAST_4_WEEKS
        </span>
        <h3 className="text-white font-bold leading-none truncate">{data.title}</h3>
        <p className="text-zinc-400 text-sm truncate">{data.artist}</p>
      </div>
    </Link>
  );
}