import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library'
import db from '../db.js'
import { signToken, authMiddleware } from '../middleware/auth.js'

const router = Router()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

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

// POST /api/auth/google  — Google OAuth (access_token yoki userInfo)
router.post('/google', async (req, res) => {
  const { email, name, googleId } = req.body

  if (!email || !name) {
    return res.status(400).json({ error: 'email va name majburiy' })
  }

  try {
    let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)

    if (!user) {
      const result = db.prepare(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
      ).run(name, email, `google_${googleId || Date.now()}`, 'patient')
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid)
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role })
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ error: 'Server xatoligi' })
  }
})

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.user.id)
  if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' })
  res.json(user)
})

// PATCH /api/auth/me  — ism va emailni yangilash
router.patch('/me', authMiddleware, (req, res) => {
  const { name, email } = req.body

  if (!name && !email) {
    return res.status(400).json({ error: 'name yoki email kerak' })
  }

  if (email) {
    const existing = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(email, req.user.id)
    if (existing) {
      return res.status(409).json({ error: 'Bu email boshqa foydalanuvchida bor' })
    }
  }

  const fields = []
  const values = []
  if (name)  { fields.push('name = ?');  values.push(name) }
  if (email) { fields.push('email = ?'); values.push(email) }
  values.push(req.user.id)

  db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...values)

  const user = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(req.user.id)
  const token = signToken({ id: user.id, email: user.email, role: user.role })
  res.json({ token, user })
})

// PATCH /api/auth/password  — parolni o'zgartirish
router.patch('/password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'currentPassword va newPassword majburiy' })
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Yangi parol kamida 6 ta belgi bo\'lishi kerak' })
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)
  if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' })

  // Google bilan kirgan foydalanuvchilar uchun parol yo'q
  if (user.password.startsWith('google_')) {
    return res.status(400).json({ error: 'Google orqali kirgan hisobda parol yo\'q' })
  }

  const valid = await bcrypt.compare(currentPassword, user.password)
  if (!valid) return res.status(401).json({ error: 'Joriy parol noto\'g\'ri' })

  const hashed = await bcrypt.hash(newPassword, 10)
  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashed, req.user.id)

  res.json({ message: 'Parol muvaffaqiyatli o\'zgartirildi' })
})

export default router
