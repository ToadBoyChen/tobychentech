// lib/spotify.ts
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

// --- OFFICIAL SPOTIFY ENDPOINTS ---
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists`;
const USER_PROFILE_ENDPOINT = `https://api.spotify.com/v1/me`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
    cache: 'no-store',
  });

  return response.json();
};

export const getTopTracksLong = async () => {
  const { access_token } = await getAccessToken();
  return fetch(`${TOP_TRACKS_ENDPOINT}?time_range=long_term&limit=1`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-store',
  });
};

export const getTopTracksShort = async () => {
  const { access_token } = await getAccessToken();
  return fetch(`${TOP_TRACKS_ENDPOINT}?time_range=short_term&limit=1`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-store',
  });
};

export const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();
  return fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=1`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-store',
  });
};

export const getPlaylist = async (id: string) => {
    const { access_token } = await getAccessToken();
    return fetch(`${PLAYLIST_ENDPOINT}/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: 'no-store',
    });
};

// --- NEW PROFILE FUNCTION ---
export const getUserProfile = async () => {
    const { access_token } = await getAccessToken();
    return fetch(USER_PROFILE_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: 'no-store',
    });
};