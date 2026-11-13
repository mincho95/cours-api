import { Router } from 'express'
import { chercherRecettes } from '../services/themealdb.service.js'

const router = Router()

router.get('/', async (req, res) => {
    const recettes = await chercherRecettes()

    const parCategorie = {}
    const parPays = {}

    for (const recette of recettes) {
        if (parCategorie[recette.categorie]) {
            parCategorie[recette.categorie] = parCategorie[recette.categorie] + 1
        } else {
            parCategorie[recette.categorie] = 1
        }

        if (parPays[recette.pays]) {
            parPays[recette.pays] = parPays[recette.pays] + 1
        } else {
            parPays[recette.pays] = 1
        }
    }

    const recettesSimples = recettes.filter(recette => recette.nbIngredients <= 5)

    res.json({
        total: recettes.length,
        parCategorie: parCategorie,
        parPays: parPays,
        nbRecettesSimples: recettesSimples.length
    })
})

export default router
