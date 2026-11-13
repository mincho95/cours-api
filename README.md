# cours-api

API Node.js (Express) qui se place entre le visiteur et [TheMealDB](https://www.themealdb.com/api.php). Elle va chercher les recettes, les nettoie (noms en français, ingrédients aplatis dans un tableau, champs vides retirés) et calcule des statistiques.

## Lancer le projet

Node.js 20 ou plus.

```bash
npm install
node --watch server.js
```

## Les routes

| Route | Ce qu'elle renvoie | Exemple |
|---|---|---|
| `GET /api/recettes` | La liste des recettes nettoyées, par pages de 20 : `{ page, nbPages, total, recettes }` | `http://localhost:3000/api/recettes` |
| `GET /api/recettes?page=2` | Une page précise (404 si elle n'existe pas) | `http://localhost:3000/api/recettes?page=2` |
| `GET /api/recettes?categorie=...` | Les recettes d'une catégorie | `http://localhost:3000/api/recettes?categorie=Chicken` |
| `GET /api/recettes?pays=...` | Les recettes d'un pays | `http://localhost:3000/api/recettes?pays=Japan` |
| `GET /api/recettes?nom=...` | Les recettes dont le nom contient le texte (sans tenir compte des majuscules) | `http://localhost:3000/api/recettes?nom=curry` |
| `GET /api/recettes/:id` | Une recette, ou un 404 si l'id n'existe pas | `http://localhost:3000/api/recettes/52772` |
| `GET /api/stats` | Des statistiques calculées : `total`, `parCategorie`, `parPays`, `categorieLaPlusFrequente`, `paysLePlusFrequent`, `nbRecettesSimples` (5 ingrédients ou moins) | `http://localhost:3000/api/stats` |
| `GET /api/categories` | Chaque catégorie avec son nombre de recettes : `[{ nom, nbRecettes }]` | `http://localhost:3000/api/categories` |
| `GET /api/ingredients` | Le nombre d'utilisations de chaque ingrédient et `ingredientLePlusUtilise` | `http://localhost:3000/api/ingredients` |

Les filtres `categorie`, `pays` et `nom` se combinent entre eux et avec `page`, par exemple `http://localhost:3000/api/recettes?categorie=Chicken&pays=Japan`. Le filtrage se fait avant la pagination.

### Forme d'une recette

```json
{
  "id": "52772",
  "nom": "Teriyaki Chicken Casserole",
  "categorie": "Chicken",
  "pays": "Japan",
  "image": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
  "ingredients": [
    { "nom": "soy sauce", "quantite": "3/4 cup" }
  ],
  "nbIngredients": 1
}
```

## Organisation des fichiers

- `server.js` allume le serveur ; `src/app.js` crée l'application, branche les routes, le 404 et le 500.
- `src/routes/` contient une route par fichier (`recettes`, `stats`, `categories`, `ingredients`) ; `src/services/themealdb.service.js` est le seul fichier qui communique avec TheMealDB.