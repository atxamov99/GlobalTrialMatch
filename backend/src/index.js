import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import trialsRouter from './routes/trials.js'
import matchRouter from './routes/match.js'
import authRouter from './routes/auth.js'
import profileRouter from './routes/profile.js'
import applicationsRouter from './routes/applications.js'
import savedRouter from './routes/saved.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'GlobalTrialMatch API ishlayapti' })
})

app.use('/api/auth', authRouter)
app.use('/api/trials', trialsRouter)
app.use('/api/match', matchRouter)
app.use('/api/profile', profileRouter)
app.use('/api/applications', applicationsRouter)
app.use('/api/saved', savedRouter)

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} da ishlamoqda`)
})
