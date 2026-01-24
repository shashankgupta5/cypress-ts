Cypress.Commands.add('generateSpotifyToken', () => {
  const clientId = Cypress.env('spotifyClientId');
  const clientSecret = Cypress.env('spotifyClientSecret');

  if (!clientId || !clientSecret) {
    throw new Error('Credentials are not set, please check!');
  }

  return cy
    .request({
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      form: true,
      body: { grant_type: 'client_credentials' },
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
    })
    .then((response) => {
      const token = response.body.access_token;
      return token;
    });
});
