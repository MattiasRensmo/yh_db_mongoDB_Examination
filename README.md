# Examination MongoDB

Gjort av Mattias Rensmo

## Users

Enklare validering när vi skapar användare. Tex längd på lösenord och att användarnamnet/e-posten inte redan är skapade samt att `role` är antingen `admin` eller `user`.

När vi loggar in bakar vi in `username`, `role` och `userId` i en JWT och skickar det till användaren i en cookie.

Man kan logga in med username eller email - det är upp till användaren.

## Validering

### User

Vill användaren komma åt någon annan route än `login` och `register` valideras användarens cookie med hjälp av middleware. Kakan är giltig i en timme. En användaren kan bara redigera eller radera sina egna recensioner. En användaren kan bara lista filmer, inte skapa/redigera dem.

### Admin

Role är inbakad i JWT:n som ligger i vår cookie. Skapa film-routes är skyddade med middleware. Admin kan också redigera/radera alla recensioner oavsett vem som skapat dem.

### Validering av data

En middleware kontrollerar om `id` ens är ett giltigt MongoDB-id. I övrigt försöker jag använda Mongoose inbyggda validerings å mycket som möjligt och skriva in felmeddelanden direkt i schemat.

## Movies

Alla routes enligt vg-kraven, vissa skyddade med middleware. Använder `populate` för att hämta ut användaren som lagt in filmen i klartext.

Skapar sedan ett nytt objekt för att kunna leverera relevant data som jag vill. Jag testar också att använda `aggregate` för att hämta data från andra collections och sedan `project` för att välja hur data ska visas.

## Review

Alla routes enligt vg-krav.
