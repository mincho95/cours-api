import express from 'express'
import recettesRoutes from './routes/recettes.routes.js'
import statsRoutes from './routes/stats.routes.js'

const app = express()

app.use('/api/recettes', recettesRoutes)
app.use('/api/stats', statsRoutes)

export default app
