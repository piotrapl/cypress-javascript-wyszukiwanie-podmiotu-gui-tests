// cypress/support/commands.js
// definicje niestandardowych komend Cypress dla wyszukiwarki REGON
// reużywane w testach E2E w cypress/e2e/regon-search.cy.js

// SEL zawiera selektory używane w komendach
// SEL to miejsce na selektory, mapa elementów UI
// Ułatwia utrzymanie kodu w przypadku zmian w UI

const SEL = {
// regonInput znajduje element o id zawierającym "txtRegon"
  regonInput:
    'input[id*="txtRegon"]', 
// searchButton znajduje element o id równym dokładnie "btnSzukaj"
  searchButton:
    'input[id="btnSzukaj"]',

 // to selektor i jednocześnie asercja - sprawdza, czy element z komunikatem jest widoczny
    messageRegion: () => cy.get("#divInfoKomunikat").should("be.visible")
  
};

// Komenda otwierająca stronę wyszukiwarki REGON
//  Domyślnie otwiera "/index.aspx", ale można podać inny path (unikanie zaszywania na sztywno warości URL)
//  używana w beforeEach testów
Cypress.Commands.add("openRegonSearch", (path = "/index.aspx") => {
  cy.visit(path);

});

// komanda searchByRegon
// Wybiera pole REGON (pojawia się w nim kursor), wpisuje numer REGON i klika przycisk 'Szukaj'
// optymalizuje kod testów, unika powtarzania
// to jest sekwencja działań użytkownika, nie tylko pojedyncza akcja    
Cypress.Commands.add("searchByRegon", (regon) => {
  // Select REGON “tab/option” if present, then type.
  cy.contains(/^REGON$/).click({ force: true });
  cy.get(SEL.regonInput).first().clear().type(regon);
  cy.get(SEL.searchButton).click();
});

Cypress.Commands.add("expectInvalidRegonMessage", () => {
  // Asercja sprawdzająca, czy komunikat o błędzie REGON jest widoczny
  // Sprawdza, czy tekst komunikatu zawiera słowa "REGON", "nieprawidł" i "cyfr...kontrol"
  // Używa wyrażeń regularnych, aby być odpornym na drobne zmiany w tekście komunikatu
  SEL.messageRegion()
    .invoke("text")
    .then((t) => {
      expect(t).to.match(/REGON/i);
      expect(t).to.match(/nieprawidł/i);
      expect(t).to.match(/cyfr.*kontrol/i);
    });
});
