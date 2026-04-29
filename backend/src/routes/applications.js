import { Router } from 'express'
import db from '../db.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// POST /api/applications  — tadqiqotga ariza berish
router.post('/', authMiddleware, (req, res) => {
  const { trial_id, trial_title, note } = req.body

  if (!trial_id) {
    return res.status(400).json({ error: 'trial_id majburiy' })
  }

  const existing = db.prepare(
    'SELECT id FROM applications WHERE user_id = ? AND trial_id = ?'
  ).get(req.user.id, trial_id)

  if (existing) {
    return res.status(409).json({ error: 'Siz bu tadqiqotga allaqachon ariza bergansiz' })
  }

  const result = db.prepare(`
    INSERT INTO applications (user_id, trial_id, trial_title, note)
    VALUES (?, ?, ?, ?)
  `).run(req.user.id, trial_id, trial_title, note)

  res.status(201).json({ id: result.lastInsertRowid, message: 'Ariza muvaffaqiyatli yuborildi' })
})

// GET /api/applications  — mening arizalarim
router.get('/', authMiddleware, (req, res) => {
  const apps = db.prepare(
    'SELECT * FROM applications WHERE user_id = ? ORDER BY applied_at DESC'
  ).all(req.user.id)

  res.json(apps)
})

// DELETE /api/applications/:id  — arizani bekor qilish
router.delete('/:id', authMiddleware, (req, res) => {
  const app = db.prepare(
    'SELECT id FROM applications WHERE id = ? AND user_id = ?'
  ).get(req.params.id, req.user.id)

  if (!app) return res.status(404).json({ error: 'Ariza topilmadi' })

  db.prepare('DELETE FROM applications WHERE id = ?').run(req.params.id)
  res.json({ message: 'Ariza bekor qilindi' })
})

export default router
