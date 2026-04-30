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

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true)
    const allowed = process.env.ALLOWED_ORIGIN
      ? process.env.ALLOWED_ORIGIN.split(',').map(o => o.trim())
      : []
    // Always allow localhost and vercel previews
    if (
      allowed.includes('*') ||
      allowed.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.startsWith('http://localhost')
    ) {
      return callback(null, true)
    }
    callback(new Error('CORS: not allowed'))
  },
  credentials: true,
}))
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
