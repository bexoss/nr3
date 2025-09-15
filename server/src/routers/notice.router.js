import { Router } from 'express'
import { Notice } from '../models/notice.model.js'

const router = Router()

// List notices with optional filters
router.get('/', async (req, res) => {
  const { showOnTop, active, limit = 20 } = req.query
  const q = {}
  if (showOnTop === '1' || showOnTop === 'true') q.showOnTop = true
  if (active === '0' || active === 'false') q.active = false
  else if (active === '1' || active === 'true') q.active = true
  const docs = await Notice.find(q).sort({ createdAt: -1 }).limit(Number(limit)).lean()
  res.json(docs)
})

// Get one
router.get('/:id', async (req, res) => {
  const doc = await Notice.findById(req.params.id).lean()
  if (!doc) return res.status(404).json({ error: 'not_found' })
  res.json(doc)
})

// Create
router.post('/', async (req, res) => {
  const { title, body = '', showOnTop = false, active = true, attachments = [] } = req.body || {}
  if (!title) return res.status(400).json({ error: 'title_required' })
  const doc = await Notice.create({ title, body, showOnTop, active, attachments })
  res.json(doc)
})

// Update
router.put('/:id', async (req, res) => {
  const { title, body, showOnTop, active, attachments } = req.body || {}
  const doc = await Notice.findByIdAndUpdate(
    req.params.id,
    { $set: { ...(title != null && { title }), ...(body != null && { body }), ...(showOnTop != null && { showOnTop }), ...(active != null && { active }), ...(attachments != null && { attachments }) } },
    { new: true }
  )
  if (!doc) return res.status(404).json({ error: 'not_found' })
  res.json(doc)
})

// Delete
router.delete('/:id', async (req, res) => {
  const doc = await Notice.findByIdAndDelete(req.params.id)
  if (!doc) return res.status(404).json({ error: 'not_found' })
  res.json({ ok: true })
})

export default router

