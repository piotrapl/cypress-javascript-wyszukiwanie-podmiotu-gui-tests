describe("REGON search (GUS) – negative scenario", () => {
  beforeEach(() => {
    cy.openRegonSearch();
  });

  it("shows validation message for invalid REGON", () => {
    cy.searchByRegon("123456789");

    // Assert validation message appears (robust to small text changes)
    cy.expectInvalidRegonMessage();
  });
});