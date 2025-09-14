import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import './models/index.js'
import routers from './routers/index.js'

const app = express()
const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cosmetics'

app.use(cors({ origin: process.env.CLIENT_ORIGIN || true, credentials: true }))
app.use(morgan('dev'))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.get('/health', (req, res) => {
  res.json({ ok: true, ts: Date.now() })
})

app.use('/api', routers)

async function start() {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(MONGO_URI)
    console.log('[server] Mongo connected')
    app.listen(PORT, () => console.log(`[server] listening on :${PORT}`))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
