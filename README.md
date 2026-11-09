# Spotify Web API

Utilizing the Web API feature of Spotify in obtaining personal metric(s) data. As referenced on this [personal website](https://ivansojivarghese.github.io/) - ```ivansojivarghese.github.io/```.

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
