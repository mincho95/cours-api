import { Router } from 'express'
import { chercherRecettes } from '../services/themealdb.service.js'

const router = Router()

router.get('/', async (req, res) => {
    const recettes = await chercherRecettes()

    const comptage = {}

    for (const recette of recettes) {
        for (const ingredient of recette.ingredients) {
            const nom = ingredient.nom.toLowerCase()

            if (comptage[nom]) {
                comptage[nom] = comptage[nom] + 1
            } else {
                comptage[nom] = 1
            }
        }
    }

    let ingredientLePlusUtilise = ''
    let max = 0

    for (const paire of Object.entries(comptage)) {
        if (paire[1] > max) {
            max = paire[1]
            ingredientLePlusUtilise = paire[0]
        }
    }

    res.json({
        comptage: comptage,
        ingredientLePlusUtilise: ingredientLePlusUtilise
    })
})

export default router
