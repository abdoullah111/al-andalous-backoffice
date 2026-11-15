# Mizan — Prix des métaux

Application web qui affiche les prix actuels de l’or et de l’argent dans plusieurs devises.

## Fonctionnalités

- Affichage dynamique des prix de l’or et de l’argent
- Choix de devise : MAD, USD ou EUR
- Bouton Actualiser pour récupérer les nouveaux prix
- Date et heure de la dernière mise à jour
- Variation en pourcentage :
  - Vert : prix en hausse
  - Rouge : prix en baisse
- Estimateur de bijou selon le poids et le métal choisi
- Validation du poids saisi
- États de chargement et gestion des erreurs API
- Design responsive

## Technologies utilisées

- HTML5
- CSS3
- JavaScript ES6
- API Fetch
- Modules JavaScript

## API utilisée

Les données proviennent de l’API XAUS :

- Prix actuels : `https://xaus.com/api/v1/spot`
- Historique de l’or : `https://xaus.com/api/v1/history`
- Historique de l’argent : `https://xaus.com/api/v1/chart?symbol=silver&range=5d`

## Lancer le projet

## Structeur De projet:
mizan-metal-prices/
├── css/
│   └── style.css
├── js/
│   ├── api.js
│   ├── calculator.js
│   ├── main.js
│   └── ui.js
├── images/
├── index.html
└── README.md
