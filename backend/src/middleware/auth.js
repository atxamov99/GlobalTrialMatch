import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'globaltrialmatch_secret_key'

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token kerak' })
  }

  const token = header.split(' ')[1]
  try {
    req.user = jwt.verify(token, SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Token yaroqsiz yoki muddati tugagan' })
  }
}

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}
