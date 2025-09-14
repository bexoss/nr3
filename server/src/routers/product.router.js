import { Router } from 'express'
import { Product } from '../models/product.model.js'

const r = Router()

// List with basic filtering/sorting/pagination
r.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10)
    const size = Math.min(parseInt(req.query.size || '20', 10), 50)
    const skip = (page - 1) * size

    const filter = {}
    if (req.query.tag) filter.tags = req.query.tag
    if (req.query.active) filter.active = req.query.active === 'true'
    if (req.query.q) {
      const q = String(req.query.q)
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { title: { $regex: q, $options: 'i' } },
        { option: { $regex: q, $options: 'i' } },
        { sku: { $regex: q, $options: 'i' } }
      ]
    }

    let cursor = Product.find(filter)

    // sorting
    if (req.query.sort === 'best') cursor = cursor.sort({ rankingScore: -1 })
    else cursor = cursor.sort({ createdAt: -1 })

    const [total, items] = await Promise.all([Product.countDocuments(filter), cursor.skip(skip).limit(size)])

    res.json({ items, page, size, total })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'failed_list_products' })
  }
})

// Basic CRUD for admin
r.post('/', async (req, res) => {
  try {
    const doc = await Product.create(req.body)
    res.status(201).json(doc)
  } catch (e) {
    res.status(400).json({ error: 'failed_create_product', detail: e.message })
  }
})

r.get('/:id', async (req, res) => {
  const doc = await Product.findById(req.params.id)
  if (!doc) return res.status(404).json({ error: 'not_found' })
  res.json(doc)
})

r.put('/:id', async (req, res) => {
  try {
    const doc = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(doc)
  } catch (e) {
    res.status(400).json({ error: 'failed_update', detail: e.message })
  }
})

r.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

export default r
