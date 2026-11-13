import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'La route recettes fonctionne' })
})

export default router
