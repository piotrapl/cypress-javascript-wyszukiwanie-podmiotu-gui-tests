### Wprowadzenie

Ten projekt to przykład automatyzacji testóww Cypress (JavaScript) dla publicznej wyszukiwarki REGON (GUS).

## Rezultat wykonania testów w środowisku CI:
[![CI](https://github.com/piotrapl/cypress-javascript-wyszukiwanie-podmiotow-gui-tests/actions/workflows/cypress.yml/badge.svg)](https://github.com/piotrapl/cypress-javascript-wyszukiwanie-podmiotow-gui-tests/actions)

### Testy automatyczne sprawdzają:

Wyszukiwanie podmiotu po numerze REGON
- obsługę przypadku podania przez zużytkownika błędnego numeru REGON

## Projekt realizuje scenariusz testowy:
(Negatywny)  Test Wyszukiwania podmiotu gospodarczego (firmy) po numerze REGON
1. Wprowadzamy niepoprawny nr REGON
2.  → prezentoway jest odpowiedni komunikat o błędzie

Testy napisane zgodnie z tzw. zasadą DRY (Don't Repet Yourself), minimalizacji liczby linii tworzonego kodu

używają odpornych asercji (niezależnych od drobnych zmian treści)

## Projekt jest zintegrowany z procesem CI (GitHub Actions)

Po każdym push/pull request w środowisku CI (Ubuntu Linux) uruchamiane są testy.

### Wymagania systemowe

Node.js ≥ 16

npm (instalowany razem z Node.js)

działa w systemach: Windows / macOS / Linux

Przeglądarka: Chrome / Edge (domyślnie)

### Przygotowanie środowiska

# 1. Klonowanie repozytorium
git clone <repo-url>
cd cypress-regon

# 2. Instalacja zależności
npm install

### Uruchamianie testów
Tryb interaktywny (GUI)
npm run cy:open

Tryb headless ( / terminal)
npm run cy:run

### Co można zoptymalizować / dodać ?

Page Object Model (POM)

Testy danych skrajnych (np. liczba znaków inna niż 9 lub 14) 

Testy API (jeśli endpoint GUS jest dostępny)

Obsługa CAPTCHA / throttlingu (jeśli się pojawi)

Raporty testowe (Allure / Mochawesome)

Równoległe uruchamianie testów w CI

Testy dostępności (a11y)
