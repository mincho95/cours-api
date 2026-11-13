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

    let categorieLaPlusFrequente = ''
    let maxCategorie = 0

    for (const paire of Object.entries(parCategorie)) {
        if (paire[1] > maxCategorie) {
            maxCategorie = paire[1]
            categorieLaPlusFrequente = paire[0]
        }
    }

    let paysLePlusFrequent = ''
    let maxPays = 0

    for (const paire of Object.entries(parPays)) {
        if (paire[1] > maxPays) {
            maxPays = paire[1]
            paysLePlusFrequent = paire[0]
        }
    }

    res.json({
        total: recettes.length,
        parCategorie: parCategorie,
        parPays: parPays,
        categorieLaPlusFrequente: categorieLaPlusFrequente,
        paysLePlusFrequent: paysLePlusFrequent,
        nbRecettesSimples: recettesSimples.length
    })
})

export default router
