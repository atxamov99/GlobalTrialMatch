import { Router } from 'express'
import bcrypt from 'bcryptjs'
import db from '../db.js'
import { signToken, authMiddleware } from '../middleware/auth.js'

const router = Router()

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, role = 'patient' } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email va password majburiy' })
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing) {
    return res.status(409).json({ error: 'Bu email allaqachon ro\'yxatdan o\'tgan' })
  }

  const hashed = await bcrypt.hash(password, 10)
  const result = db.prepare(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
  ).run(name, email, hashed, role)

  const token = signToken({ id: result.lastInsertRowid, email, role })
  res.status(201).json({ token, user: { id: result.lastInsertRowid, name, email, role } })
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'email va password majburiy' })
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  if (!user) {
    return res.status(401).json({ error: 'Email yoki parol noto\'g\'ri' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return res.status(401).json({ error: 'Email yoki parol noto\'g\'ri' })
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role })
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
})

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.user.id)
  if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' })
  res.json(user)
})

export default router
