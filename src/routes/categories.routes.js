import { Router } from 'express'
import { chercherRecettes } from '../services/themealdb.service.js'

const router = Router()

router.get('/', async (req, res) => {
    const recettes = await chercherRecettes()

    const comptage = {}

    for (const recette of recettes) {
        if (comptage[recette.categorie]) {
            comptage[recette.categorie] = comptage[recette.categorie] + 1
        } else {
            comptage[recette.categorie] = 1
        }
    }

    const categories = []

    for (const paire of Object.entries(comptage)) {
        categories.push({ nom: paire[0], nbRecettes: paire[1] })
    }

    res.json(categories)
})

export default router
