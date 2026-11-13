import { Router } from 'express'
import { chercherRecettes, chercherRecetteParId } from '../services/themealdb.service.js'

const router = Router()

router.get('/', async (req, res) => {
    let recettes = await chercherRecettes()

    if (req.query.categorie) {
        recettes = recettes.filter(recette => recette.categorie === req.query.categorie)
    }

    if (req.query.pays) {
        recettes = recettes.filter(recette => recette.pays === req.query.pays)
    }

    if (req.query.nom) {
        recettes = recettes.filter(recette =>
            recette.nom.toLowerCase().includes(req.query.nom.toLowerCase()))
    }

    res.json(recettes)
})

router.get('/:id', async (req, res) => {
    const recette = await chercherRecetteParId(req.params.id)

    if (!recette) {
        return res.status(404).json({ erreur: 'Recette introuvable' })
    }

    res.json(recette)
})

export default router
