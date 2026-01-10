describe('Spotify API Tests', () => {
  it('get new releases', () => {
    cy.generateSpotifyToken().then((token) => {
      cy.request({
        method: 'GET',
        url: `https://api.spotify.com/v1/browse/new-releases`,
        headers: {
          Authorization: `Bearer ${token}`,
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
});
