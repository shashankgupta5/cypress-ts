Cypress.Commands.add('generateSpotifyToken', () => {
  const clientId = Cypress.env('spotifyClientId');
  const clientSecret = Cypress.env('spotifyClientSecret');

  expect(clientId).to.not.be.empty;
  expect(clientSecret).to.not.be.empty;

  cy.get('@spotifyToken', { timeout: 0 }).then((token) => {
    if (token) {
      return token;
    } else {
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
          cy.wrap(token, { log: false }).as('spotifyToken');
          return token;
        });
    }
  });
});
