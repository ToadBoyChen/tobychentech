// app/api/spotify/route.ts
import { getTopTracks } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
  const response = await getTopTracks();
  const { items } = await response.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ isPlaying: false });
  }

  // Get the first track from the list
  const track = items[0];
  
  const title = track.name;
  const artist = track.artists.map((_artist: any) => _artist.name).join(', ');
  const url = track.external_urls.spotify;
  const coverImage = track.album.images[0].url;

  return NextResponse.json({
    title,
    artist,
    url,
    coverImage,
    isPlaying: true
  });
}