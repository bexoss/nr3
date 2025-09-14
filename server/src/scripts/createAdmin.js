import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.model.js'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cosmetics'

const email = process.env.ADMIN_EMAIL || 'admin@local.test'
const name = process.env.ADMIN_NAME || 'Admin'
const password = process.env.ADMIN_PASSWORD || 'changeme123!'

async function main() {
  await mongoose.connect(MONGO_URI)
  const passwordHash = await bcrypt.hash(password, 10)
  const doc = await User.findOneAndUpdate(
    { email },
    { provider: 'credentials', email, name, passwordHash, isAdmin: true },
    { upsert: true, new: true }
  )
  console.log(`[admin] upserted: ${doc.email} (isAdmin=${doc.isAdmin})`)
  console.log(`[admin] default password set. Please change it after login.`)
  await mongoose.disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

