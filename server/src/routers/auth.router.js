import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.model.js'

const r = Router()

r.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ error: 'missing_credentials' })
    const user = await User.findOne({ email })
    if (!user || !user.passwordHash) return res.status(401).json({ error: 'invalid_credentials' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'invalid_credentials' })

    // Very simple demo cookie (NOT production-ready)
    res.cookie('uid', String(user._id), { httpOnly: true, sameSite: 'lax' })
    res.cookie('isAdmin', user.isAdmin ? '1' : '0', { httpOnly: true, sameSite: 'lax' })
    res.json({ ok: true, user: { _id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin } })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'login_failed' })
  }
})

export default r
