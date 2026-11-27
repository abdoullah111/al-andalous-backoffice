# Mizan — Prix des métaux

Application web qui affiche les prix actuels de l’or et de l’argent dans plusieurs devises.

## Fonctionnalités

- Affichage dynamique des prix de l’or et de l’argent.
- Choix de devise : MAD, USD ou EUR.
- Bouton Actualiser pour récupérer les nouveaux prix.
- Date et heure de la dernière mise à jour.
- Variation en pourcentage :
  - Vert : prix en hausse.
  - Rouge : prix en baisse.
- Estimateur de bijou selon le poids et le métal choisi.
- Validation du poids saisi.
- États de chargement et gestion des erreurs API.
- Affichage de l’historique de l’or.
- Design responsive.

## Technologies utilisées

- HTML5
- CSS3
- JavaScript ES6
- Fetch API
- Modules JavaScript

## API utilisée

Les données proviennent de l’API XAUS :

- [Prix actuels](https://xaus.com/api/v1/spot)
- [Historique de l’or](https://xaus.com/api/v1/history)
- [Historique de l’argent](https://xaus.com/api/v1/chart?symbol=silver&range=5d)

## Lancer le projet

Ouvrir le fichier `index.html` avec Live Server.

## Traces attendues

- README à jour.
- Historique de commits régulier.
- Captures des trois états :
  - Chargement.
  - Succès.
  - Erreur.

---

# Mizan — Backoffice des articles

Partie backoffice de l’application. Elle permet de gérer un catalogue de bijoux, lingots et pièces avec une API REST locale.

## Fonctionnalités

- Affichage des articles depuis JSON Server.
- Recherche d’un article par titre.
- Filtre des articles par statut.
- Tri par titre, prix et date.
- Création d’un article avec validation.
- Indicateur visible pendant l’ajout.
- Message de succès ou d’erreur après l’ajout.
- Modification complète d’un article avec un formulaire pré-rempli (`PUT`).

## Validation du formulaire

- Le titre contient entre 3 et 80 caractères.
- La description contient au moins 10 caractères.
- Le prix est strictement positif.
- La catégorie est obligatoire.
- Le statut est obligatoire.

## Lancer l’API locale

Installer les dépendances :

```bash
npm install
npm.cmd run mock-api

http://localhost:3001/items

Différence entre PUT et PATCH
PUT
PUT remplace toutes les données d’un article.

Cas d’usage : modifier un article complet depuis un formulaire pré-rempli.
PATCH
PATCH modifie seulement une ou plusieurs propriétés d’un article.

Cas d’usage : modifier uniquement le prix ou le statut directement depuis la liste.

## Structure du projet

```text
mizan-backoffice/
├── css/
│   └── style.css
├── images/
├── js/
│   ├── services/
│   │   ├── api.js
│   │   ├── itemsService.js
│   │   └── renderItems.js
│   ├── api.js
│   ├── calculator.js
│   ├── main.js
│   └── ui.js
├── db.json
├── index.html
├── package.json
└── README.md
```