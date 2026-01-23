const SEL = {
  // Try hard to find the REGON input without relying on a single fragile id.
  regonInput:
    'input[id*="REGON"]', 
    //input[name*="Regon"], input[placeholder*="REGON"], input[aria-label*="REGON"]',

  // “Szukaj” button exists on the page UI. :contentReference[oaicite:1]{index=1}
  searchButton: () => cy.contains('button, input[type="submit"], a', /^Szukaj$/),

  // A place where messages/results appear is labeled “Komunikat” in the UI. :contentReference[oaicite:2]{index=2}
  messageRegion: () =>
    cy.contains(/^Komunikat$/)
      .parent()
      .should("be.visible")
};

Cypress.Commands.add("openRegonSearch", (path = "/index.aspx") => {
  cy.visit(path);

  cy.contains(/Szukaj po pojedynczym identyfikatorze/i)
    .filter(":visible")
    .should("have.length.at.least", 1);
});

Cypress.Commands.add("searchByRegon", (regon) => {
  // Select REGON “tab/option” if present, then type.
  cy.contains(/^REGON$/).click({ force: true });
  cy.get(SEL.regonInput).first().clear().type(regon);
  SEL.searchButton().click();
});

Cypress.Commands.add("expectInvalidRegonMessage", () => {
  // “Immune to small changes”: assert key tokens, not the full sentence.
  SEL.messageRegion()
    .invoke("text")
    .then((t) => {
      expect(t).to.match(/REGON/i);
      expect(t).to.match(/nieprawidł/i);        // catches "nieprawidłowy/nieprawidłowa/..."
      expect(t).to.match(/cyfr.*kontrol/i);      // "cyfry kontrolnej" (allow minor edits)
    });
});

Cypress.Commands.add("expectCompanyFoundLikeRmf", () => {
  // Avoid exact full legal name match; check stable “core” tokens.
  const coreName = /RADIO\s+MUZYKA\s+FAKTY\s+GRUPA\s+RMF/i;

  // On results tables the label “nazwa” is present (seen in page content). :contentReference[oaicite:4]{index=4}
  cy.contains(/^nazwa$/i)
    .should("be.visible")
    .parent()
    .invoke("text")
    .then((t) => {
      expect(t).to.match(coreName);
    });
});