declare global {
  namespace Cypress {
    interface Chainable {
      generateSpotifyToken(): Chainable<string>;
    }
  }
}

export {};
