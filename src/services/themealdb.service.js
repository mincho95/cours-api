const BASE = 'https://www.themealdb.com/api/json/v1/1'

const LETTRES = 'abcdefghijklmnopqrstuvwxyz'

let cache = null

function nettoyer (recette) {
    const ingredients = []

    for (let i = 1; i <= 20; i++) {
        const nom = recette['strIngredient' + i]
        const quantite = recette['strMeasure' + i]

        if (nom) {
            ingredients.push({ nom: nom, quantite: quantite })
        }
    }

    return {
        id : recette.idMeal,
        nom : recette.strMeal,
        categorie : recette.strCategory,
        pays : recette.strCountry,
        image : recette.strMealThumb,
        ingredients : ingredients,
        nbIngredients : ingredients.length
    }
}

export async function chercherRecettes () {
    if (cache) {
        return cache
    }

    const tous = []

    for (const lettre of LETTRES) {
        const reponse = await fetch(BASE + '/search.php?f=' + lettre)
        const donnees = await reponse.json()

        if (donnees.meals) {
            for (const recette of donnees.meals) {
                tous.push(recette)
            }
        }
    }

    cache = tous.map(nettoyer)

    return cache
}

export async function chercherRecetteParId (id) {
    const reponse = await fetch(BASE + '/lookup.php?i=' + id)
    const donnees = await reponse.json()

    if (!donnees.meals || donnees.meals === 'Invalid ID') {
        return null
    }

    return nettoyer(donnees.meals[0])
}
