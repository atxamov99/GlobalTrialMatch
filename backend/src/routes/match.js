import { Router } from 'express'
import { searchTrials } from '../services/clinicalTrials.js'
import { scoreMatch } from '../services/aiMatch.js'

const router = Router()

// POST /api/match
// Body: { age, gender, country, diagnosis, comorbidities }
router.post('/', async (req, res) => {
  const { age, gender, country, diagnosis, comorbidities } = req.body

  if (!diagnosis || !age || !country) {
    return res.status(400).json({ error: 'age, country va diagnosis majburiy' })
  }

  try {
    // 1. ClinicalTrials.gov dan tadqiqotlarni olish
    const trials = await searchTrials({ condition: diagnosis, country, pageSize: 10 })

    if (trials.length === 0) {
      return res.json({ count: 0, matches: [], message: 'Hozircha mos tadqiqot topilmadi' })
    }

    // 2. Har bir tadqiqot uchun AI scoring
    const patient = { age, gender, country, diagnosis, comorbidities }

    const scoredResults = await Promise.all(
      trials.map(async (trial) => {
        try {
          const aiResult = await scoreMatch(patient, trial)
          return { ...trial, ...aiResult }
        } catch (err) {
          console.error('scoreMatch xatosi:', trial.id, err.message)
          return { ...trial, score: 0, isMatch: false, explanation: 'Tahlil qilib bo\'lmadi' }
        }
      })
    )

    // 3. Faqat mos kelganlarni, score bo'yicha saralash
    const matches = scoredResults
      .filter(t => t.isMatch)
      .sort((a, b) => b.score - a.score)

    res.json({ count: matches.length, matches })
  } catch (err) {
    console.error('Matching xatosi:', err.message)
    res.status(500).json({ error: 'Matching jarayonida xatolik yuz berdi' })
  }
})

export default router
