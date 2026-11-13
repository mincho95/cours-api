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

    const PAR_PAGE = 20
    const total = recettes.length
    const nbPages = Math.ceil(total / PAR_PAGE)
    const page = Number(req.query.page) || 1

    if (page < 1 || (nbPages > 0 && page > nbPages)) {
        return res.status(404).json({ erreur: 'Cette page n existe pas' })
    }

    const debut = (page - 1) * PAR_PAGE

    res.json({
        page,
        nbPages,
        total,
        recettes: recettes.slice(debut, debut + PAR_PAGE)
    })
})

router.get('/:id', async (req, res) => {
    const recette = await chercherRecetteParId(req.params.id)

    if (!recette) {
        return res.status(404).json({ erreur: 'Recette introuvable' })
    }

    res.json(recette)
})

export default router
