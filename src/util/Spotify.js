const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID; // Insert client ID here.
const redirectUri = 'http://localhost:3003/callback'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const Spotify = {

  async loadSpotifyLoginPage() {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    // console.log(accessUrl)
    // This loads the accessUrl in the windows / so the user can add its credentials.
    window.location = accessUrl;
    // user needs to login and it's redirect to the app to redirectUri
  },

  async checkAccessToken() {
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    }
  },

  getAccessToken() {

    try {
      if (accessToken) {
        return accessToken;
      }
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

      if (!(accessTokenMatch && expiresInMatch)) {
        this.loadSpotifyLoginPage().then(() => {
          accessToken = this.checkAccessToken()
        })
      } else {
        accessToken = this.checkAccessToken();
      }
      return accessToken
    } catch (error) {
      console.log(error);
    }

  },

  async search(term) {

    if (!term) {
      return;
    }
    const accessToken = await this.getAccessToken();
    // console.log(accessToken);

    return await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        // console.log('response: ', response)
        if (response.status === 401) {
          // console.log('unauthorized', response.status);
          return []
        }

        if (response.ok) {
          return response.json();
        }
        throw new Error(`Request failed - search by  ${term}`);
      })
      .then(jsonResponse => {

        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      })
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = await this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return await fetch('https://api.spotify.com/v1/me', { headers: headers, cache: 'no-cache' }
    )
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Request failed - save playlist ${name}`);
      })
      .then(async jsonResponse => {
        userId = jsonResponse.id;
        return await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name })
        })
          .then(response => {
            if (response.ok) {
              return response.json()
            }
            throw new Error(`Request failed - post playlist ${userId}`);
          })
          .then(async jsonResponse => {
            const playlistId = jsonResponse.id;
            return await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({ uris: trackUris })
            })
              .then(response => {
                if (response.ok) {
                  return response.status;
                }
                throw new Error(`Request failed - post playlist/ tracks ${userId}`);
              });
          })
      });
  }
};

export default Spotify;
