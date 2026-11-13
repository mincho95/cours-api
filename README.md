# cours-api

API Node.js (Express) qui se place entre le visiteur et [TheMealDB](https://www.themealdb.com/api.php). Elle va chercher les recettes, les nettoie (noms en français, ingrédients aplatis dans un tableau, champs vides retirés) et calcule des statistiques.

## Lancer le projet

Node.js 20 ou plus.

```bash
npm install
node --watch server.js
```

Le serveur écoute sur `http://localhost:3000`.

## Les routes

| Route | Ce qu'elle renvoie | Exemple |
|---|---|---|
| `GET /api/recettes` | La liste de toutes les recettes nettoyées | `http://localhost:3000/api/recettes` |
| `GET /api/recettes?categorie=...` | Les recettes d'une catégorie | `http://localhost:3000/api/recettes?categorie=Chicken` |
| `GET /api/recettes/:id` | Une recette, ou un 404 si l'id n'existe pas | `http://localhost:3000/api/recettes/52772` |
| `GET /api/stats` | Des statistiques calculées : `total`, `parCategorie`, `parPays`, `nbRecettesSimples` (5 ingrédients ou moins) | `http://localhost:3000/api/stats` |

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
- `src/routes/` contient une route par fichier (`recettes.routes.js`, `stats.routes.js`) ; `src/services/themealdb.service.js` est le seul fichier qui communique avec TheMealDB.