import { Router } from 'express'
import { chercherRecettes } from '../services/themealdb.service.js'

const router = Router()

router.get('/', async (req, res) => {
    const recettes = await chercherRecettes()

    res.json(recettes)
})

export default router
