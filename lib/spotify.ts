// lib/spotify.ts
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`; // Fixed URL
const BASE_ENDPOINT = `https://api.spotify.com/v1`; // Fixed URL

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
    cache: 'no-store', // vital for nextjs
  });

  return response.json();
};

// Changed limit to 5 to support the list view
export const getTopTracksLong = async () => {
  const { access_token } = await getAccessToken();
  return fetch(`${BASE_ENDPOINT}/me/top/tracks?time_range=long_term&limit=5`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-store',
  });
};

export const getTopTracksShort = async () => {
  const { access_token } = await getAccessToken();
  return fetch(`${BASE_ENDPOINT}/me/top/tracks?time_range=short_term&limit=1`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-store',
  });
};

export const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();
  return fetch(`${BASE_ENDPOINT}/me/player/recently-played?limit=1`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-store',
  });
};

export const getPlaylist = async (id: string) => {
    const { access_token } = await getAccessToken();
    return fetch(`${BASE_ENDPOINT}/playlists/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: 'no-store',
    });
};

export const getUserProfile = async () => {
    const { access_token } = await getAccessToken();
    return fetch(`${BASE_ENDPOINT}/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: 'no-store',
    });
};