const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://wyszukiwarkaregon.stat.gov.pl/appBIR",
    supportFile: "cypress/support/e2e.js",
    defaultCommandTimeout: 15000
  }
}); 