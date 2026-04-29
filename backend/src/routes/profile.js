import { Router } from 'express'
import db from '../db.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// GET /api/profile
router.get('/', authMiddleware, (req, res) => {
  const profile = db.prepare('SELECT * FROM patient_profiles WHERE user_id = ?').get(req.user.id)
  if (!profile) return res.json(null)

  res.json({
    ...profile,
    comorbidities: JSON.parse(profile.comorbidities || '[]'),
  })
})

// POST /api/profile  (yaratish yoki yangilash)
router.post('/', authMiddleware, (req, res) => {
  const { age, gender, country, diagnosis, comorbidities = [] } = req.body

  if (!age || !country || !diagnosis) {
    return res.status(400).json({ error: 'age, country va diagnosis majburiy' })
  }

  const existing = db.prepare('SELECT id FROM patient_profiles WHERE user_id = ?').get(req.user.id)

  if (existing) {
    db.prepare(`
      UPDATE patient_profiles
      SET age=?, gender=?, country=?, diagnosis=?, comorbidities=?, updated_at=CURRENT_TIMESTAMP
      WHERE user_id=?
    `).run(age, gender, country, diagnosis, JSON.stringify(comorbidities), req.user.id)
  } else {
    db.prepare(`
      INSERT INTO patient_profiles (user_id, age, gender, country, diagnosis, comorbidities)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(req.user.id, age, gender, country, diagnosis, JSON.stringify(comorbidities))
  }

  res.json({ message: 'Profil saqlandi' })
})

export default router
