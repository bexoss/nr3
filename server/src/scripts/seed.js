import 'dotenv/config'
import mongoose from 'mongoose'
import { Product } from '../models/product.model.js'
import { Inventory } from '../models/inventory.model.js'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cosmetics'

const products = [
  {
    sku: 'SERUM-A01',
    name: '리프팅 세럼',
    option: '30ml',
    title: '탄력 개선 리프팅 세럼 30ml',
    content: '펩타이드 복합체로 탄력을 채워주는 리프팅 세럼.',
    active: true,
    price: 39000,
    shippingFee: 3000,
    reviewLink: [],
    maxQtyPerUser: 3,
    maxQtyPerOrder: 3,
    rankingScore: 78,
    tags: ['anti-aging', 'serum']
  },
  {
    sku: 'TONER-M02',
    name: '수분 토너',
    option: '200ml',
    title: '저자극 수분 토너 200ml',
    content: '히알루론산으로 피부에 촉촉함을.',
    active: true,
    price: 19000,
    shippingFee: 3000,
    reviewLink: [],
    maxQtyPerUser: 5,
    maxQtyPerOrder: 5,
    rankingScore: 65,
    tags: ['moisturizer', 'toner']
  },
  {
    sku: 'SET-GLW01',
    name: '글로우 세트',
    option: '세럼 30ml + 크림 50ml',
    title: '광채 케어 세트',
    content: '세럼과 크림으로 완성하는 글로우 루틴.',
    active: true,
    price: 69000,
    shippingFee: 0,
    reviewLink: ['SERUM-A01'],
    maxQtyPerUser: 2,
    maxQtyPerOrder: 2,
    rankingScore: 88,
    tags: ['set', 'brightening']
  }
]

async function main() {
  await mongoose.connect(MONGO_URI)
  console.log('[seed] connected')

  for (const p of products) {
    const prod = await Product.findOneAndUpdate({ sku: p.sku }, p, { upsert: true, new: true })
    await Inventory.findOneAndUpdate(
      { sku: p.sku },
      { sku: p.sku, name: p.title || p.name, qty: 100, reserved: 0 },
      { upsert: true, new: true }
    )
    console.log(`[seed] upserted product ${prod.sku}`)
  }

  const count = await Product.countDocuments()
  console.log(`[seed] total products: ${count}`)
  await mongoose.disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
