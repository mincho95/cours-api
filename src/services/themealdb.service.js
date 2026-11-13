// Ce fichier est le seul à connaître l'API d'en face (TheMealDB).
// BASE est l'adresse de départ de toutes nos requêtes.
const BASE = 'https://www.themealdb.com/api/json/v1/1'

const LETTRES = 'abcdefghijklmnopqrstuvwxyz'

export async function chercherRecettes () {
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

    return tous
}
