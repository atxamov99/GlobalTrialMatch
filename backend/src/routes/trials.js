import { Router } from 'express'
import { searchTrials } from '../services/clinicalTrials.js'

const router = Router()

// GET /api/trials/search?condition=diabetes&country=UZ&status=RECRUITING
router.get('/search', async (req, res) => {
  const { condition, country, status, pageSize } = req.query

  if (!condition) {
    return res.status(400).json({ error: 'condition parametri majburiy' })
  }

  try {
    const trials = await searchTrials({
      condition,
      country,
      status,
      pageSize: parseInt(pageSize) || 20,
    })
    res.json({ count: trials.length, trials })
  } catch (err) {
    console.error('Trials qidirish xatosi:', err.message)
    res.status(500).json({ error: 'Tadqiqotlarni qidirishda xatolik yuz berdi' })
  }
})

export default router
