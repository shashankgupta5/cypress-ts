describe('Spotify API Tests', () => {
  let spotifyToken;

  before('before all tests', () => {
    // Generate token before all test and store in an alias
    cy.generateSpotifyToken().then((token: string) => {
      spotifyToken = token;
    });
  });

  it('get new releases', () => {
    cy.request({
      method: 'GET',
      url: `https://api.spotify.com/v1/browse/new-releases`,
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
      qs: {
        limit: 3,
      },
    }).then((response) => {
      expect(response.status).eq(200);
      const responseBody = response.body;
      cy.log(`Response = ${JSON.stringify(responseBody)}`);
      expect(responseBody).to.not.be.empty;
      // TODO - Add data assertions
    });
  });
});
