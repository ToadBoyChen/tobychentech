import { getTopTracksLong, getTopTracksShort, getRecentlyPlayed, getPlaylist, getUserProfile } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [longRes, shortRes, recentRes, playlistRes, profileRes] = await Promise.all([
      getTopTracksLong(),
      getTopTracksShort(),
      getRecentlyPlayed(),
      getPlaylist('3x3WcYMxaQLXu4JjEZu0ZB'), // Your Playlist ID
      getUserProfile()
    ]);

    const longData = await longRes.json();
    const shortData = await shortRes.json();
    const recentData = await recentRes.json();
    const playlistData = await playlistRes.json();
    const profileData = await profileRes.json();

    const formatTrack = (track: any) => {
      if (!track) return null;
      return {
        title: track.name,
        artist: track.artists.map((_artist: any) => _artist.name).join(', '),
        url: track.external_urls.spotify,
        coverImage: track.album.images[0]?.url || null,
      };
    };

    return NextResponse.json({
      allTime: longData.items?.[0] ? formatTrack(longData.items[0]) : null,
      month: shortData.items?.[0] ? formatTrack(shortData.items[0]) : null,
      recent: recentData.items?.[0] ? formatTrack(recentData.items[0].track) : null,
      
      // Playlist Data
      playlist: playlistData.error ? null : {
          name: playlistData.name,
          description: playlistData.description,
          url: playlistData.external_urls.spotify,
          coverImage: playlistData.images?.[0]?.url || null,
          owner: playlistData.owner.display_name,
      },

      // New Profile Data
      profile: profileData.error ? null : {
          name: profileData.display_name,
          followers: profileData.followers.total,
          url: profileData.external_urls.spotify,
          image: profileData.images?.[0]?.url || null, // Getting the largest profile image
      }
    });
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return NextResponse.json({ error: "Failed to fetch music data" }, { status: 500 });
  }
}