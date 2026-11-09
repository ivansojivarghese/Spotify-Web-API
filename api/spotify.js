const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const API_URL = 'https://api.spotify.com/v1';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return res.status(500).json({ error: 'Missing Spotify environment variables' });
  }

  try {
    const tokenResponse = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
          ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN
      })
    });

    if (!tokenResponse.ok) {
      return res.status(502).json({ error: 'Could not refresh Spotify token' });
    }

    const { access_token } = await tokenResponse.json();

    const headers = {
      Authorization: `Bearer ${access_token}`
    };

    const [playbackResponse, recentResponse] = await Promise.all([
      fetch(`${API_URL}/me/player`, { headers }),
      fetch(`${API_URL}/me/player/recently-played?limit=10`, { headers })
    ]);

    const playback =
      playbackResponse.status === 204
        ? null
        : playbackResponse.ok
          ? await playbackResponse.json()
          : null;

    if (!recentResponse.ok) {
      return res.status(502).json({
        error: 'Could not retrieve recently played tracks'
      });
    }

    const recentlyPlayed = await recentResponse.json();

    return res.status(200).json({
      playback,
      recentlyPlayed
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Spotify request failed' });
  }
}