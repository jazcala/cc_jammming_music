const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID; // Insert client ID here.
const redirectUri = 'http://localhost:3003/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const Spotify = {

  async loadSpotifyLoginPage() {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    console.log('access url: ', accessUrl);
    // This loads the accessUrl in the windows / so the user can add its credentials.
    window.location = accessUrl;
    // user needs to login and it's redirect to the app to redirectUri
  },


  async getAccessToken() {

    try {
      console.log('Spotify - Getting access Token ')
      if (accessToken) {
        console.log(`Returning existing accessToken`)
        return accessToken;
      }

      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

      if (!(accessTokenMatch && expiresInMatch)) {
        let login = await this.loadSpotifyLoginPage();
        console.log('login variable: ', login);
      }

      if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
        return accessToken;
      }

    } catch (error) {
      console.log(error);
    }

  },

  async search(term) {
    // const getResponse = async (term) => {
    console.log(`Spotify - Search by ${term} `);

    if (!term) {
      return;
    }
    const accessToken = await this.getAccessToken();

    console.log('accessToken  insearch', accessToken);

    return await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        console.log(`In response fetch search ${term}`);
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Request failed - search by  ${term}`);
      })
      .then(jsonResponse => {
        console.log(`In jsonResponse fetch search ${term}`);

        if (!jsonResponse.tracks) {
          console.log(`no tracks found`)
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
    console.log(`Spotify - savePlaylist ${name}`)
    if (!name || !trackUris.length) {
      console.log(`Missing name ${name} or  tracks ${trackUris}`);
      return;
    }
    const accessToken = await this.getAccessToken();
    console.log('Save playlist get access token', accessToken);
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
        console.log(`In jsonResponse ${name}`)
        userId = jsonResponse.id;
        return await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name })
        })
          .then(response => {
            console.log(`in response save playlit ${name}`)
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
                  return response.json();
                }
                throw new Error(`Request failed - post playlist/ tracks ${userId}`);
              });
          })
      });
  }
};

export default Spotify;
