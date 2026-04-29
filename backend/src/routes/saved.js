import { Router } from 'express'
import db from '../db.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// POST /api/saved  — tadqiqotni saqlash
router.post('/', authMiddleware, (req, res) => {
  const { trial_id, trial_data } = req.body

  if (!trial_id || !trial_data) {
    return res.status(400).json({ error: 'trial_id va trial_data majburiy' })
  }

  try {
    db.prepare(
      'INSERT OR IGNORE INTO saved_trials (user_id, trial_id, trial_data) VALUES (?, ?, ?)'
    ).run(req.user.id, trial_id, JSON.stringify(trial_data))

    res.status(201).json({ message: 'Saqlandi' })
  } catch {
    res.status(409).json({ error: 'Allaqachon saqlangan' })
  }
})

// GET /api/saved  — saqlangan tadqiqotlar
router.get('/', authMiddleware, (req, res) => {
  const saved = db.prepare(
    'SELECT trial_id, trial_data, saved_at FROM saved_trials WHERE user_id = ? ORDER BY saved_at DESC'
  ).all(req.user.id)

  res.json(saved.map(s => ({
    ...JSON.parse(s.trial_data),
    saved_at: s.saved_at,
  })))
})

// DELETE /api/saved/:trialId  — saqlangandan o'chirish
router.delete('/:trialId', authMiddleware, (req, res) => {
  db.prepare(
    'DELETE FROM saved_trials WHERE user_id = ? AND trial_id = ?'
  ).run(req.user.id, req.params.trialId)

  res.json({ message: 'O\'chirildi' })
})

export default router
