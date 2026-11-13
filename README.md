# Spotify Web API

Utilizing the Web API feature of Spotify in obtaining personal metric(s) data. As referenced on this [personal website](https://ivansojivarghese.github.io/) - ```ivansojivarghese.github.io/```.

## Output

For ```user-read-playback-state```, ```user-read-currently-playing```, or ```user-read-recently-played```:

```
{
  "playback": {
    "device": {
      "id": "c47bb38f575be6a336223f80e4578f62b6f1c5b4",
      "is_active": true,
      "is_private_session": false,
      "is_restricted": false,
      "name": "Web Player (Microsoft Edge)",
      "supports_volume": true,
      "type": "Computer",
      "volume_percent": 66
    },
    "shuffle_state": true,
    "smart_shuffle": false,
    "repeat_state": "off",
    "is_playing": true,
    "timestamp": 1794224549105,
    "context": {
      "external_urls": {
        "spotify": "https://open.spotify.com/playlist/37i9dQZF1EP6YuccBxUcC1"
      },
      "href": "https://api.spotify.com/v1/playlists/37i9dQZF1EP6YuccBxUcC1",
      "type": "playlist",
      "uri": "spotify:playlist:37i9dQZF1EP6YuccBxUcC1"
    },
    "progress_ms": 37538,
    "item": {
      "album": {
        "album_type": "single",
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1oobYLromCfJh2nx8pfZiI"
            },
            "href": "https://api.spotify.com/v1/artists/1oobYLromCfJh2nx8pfZiI",
            "id": "1oobYLromCfJh2nx8pfZiI",
            "name": "Mar Vei",
            "type": "artist",
            "uri": "spotify:artist:1oobYLromCfJh2nx8pfZiI"
          }
        ],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/2PCpYWfdRi80bNCqrZAz9P"
        },
...
```

## Refreshing Tokens

When 6-month ```refresh_token``` reaches the end of its life, Spotify will reject any further requests. To obtain a new ```refresh_token```:

Paste the below URL into the browser, replacing ```YOUR_CLIENT_ID``` with actual client ID.

```https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=https://ivansojivarghese.github.io/&scope=user-read-playback-state%20user-read-currently-playing%20user-read-recently-played```

Click on 'Agree', allowing Spotify to access user data. Then, a redirect occurs. Take note of the URL after the redirect.

```https://ivansojivarghese.github.io/?code=AQD...long_string...```

Copy the entire string after ```?code=``` (stop before any trailing ```#``` or parameters).

Run the below in Bash terminal:

```
curl -X POST "https://accounts.spotify.com/api/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=NEW_CODE_HERE" \
  -d "redirect_uri=https://ivansojivarghese.github.io/" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"
```

Copy the new ```refresh_token``` from the JSON response and replace the old one in script or .env file on Vercel. Expires 6 months later, repeat steps as above.

```SPOTIFY_AUTHORIZED_AT=2026-11-09```
