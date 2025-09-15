import 'dotenv/config'
import mongoose from 'mongoose'
import { Product } from '../models/product.model.js'
import { Inventory } from '../models/inventory.model.js'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cosmetics'

// Generate 10 sample products with KR copy
const products = [
  { sku: 'SERUM-A01', name: '리프팅 세럼', option: '30ml', title: '탄력 개선 리프팅 세럼 30ml', content: '펩타이드 복합체로 탄력을 채워주는 세럼.', active: true, price: 39000, shippingFee: 3000, reviewLink: [], maxQtyPerUser: 3, maxQtyPerOrder: 3, rankingScore: 78, tags: ['anti-aging','serum'] },
  { sku: 'TONER-M02', name: '수분 토너', option: '200ml', title: '저자극 수분 토너 200ml', content: '히알루론산으로 촉촉함을 유지.', active: true, price: 19000, shippingFee: 3000, reviewLink: [], maxQtyPerUser: 5, maxQtyPerOrder: 5, rankingScore: 65, tags: ['moisturizer','toner'] },
  { sku: 'SET-GLW01', name: '글로우 세트', option: '세럼 30ml + 크림 50ml', title: '광채 케어 세트', content: '세럼과 크림으로 완성하는 글로우 루틴.', active: true, price: 69000, shippingFee: 0, reviewLink: ['SERUM-A01'], maxQtyPerUser: 2, maxQtyPerOrder: 2, rankingScore: 88, tags: ['set','brightening'] },
  { sku: 'CRM-M01', name: '보습 크림', option: '50ml', title: '딥 모이스처 크림', content: '건성 피부를 위한 고보습 크림.', active: true, price: 32000, shippingFee: 3000, rankingScore: 55, tags: ['moisturizer'] },
  { sku: 'CLN-G01', name: '젤 클렌저', option: '150ml', title: '마일드 젤 클렌저', content: '세정력과 보습을 동시에.', active: true, price: 15000, shippingFee: 3000, rankingScore: 42, tags: ['cleanser'] },
  { sku: 'MSK-S01', name: '수딩 마스크', option: '1ea', title: '진정 시트마스크', content: '민감 피부를 위한 진정 케어.', active: true, price: 3000, shippingFee: 3000, rankingScore: 60, tags: ['soothing','mask'] },
  { sku: 'EYE-A01', name: '아이 크림', option: '20ml', title: '링클 케어 아이크림', content: '눈가 주름 집중 케어.', active: true, price: 28000, shippingFee: 3000, rankingScore: 72, tags: ['anti-aging','eye'] },
  { sku: 'OIL-N01', name: '페이스 오일', option: '30ml', title: '너리싱 페이스 오일', content: '윤기와 영양을 더하는 오일.', active: true, price: 26000, shippingFee: 3000, rankingScore: 58, tags: ['nourishing','oil'] },
  { sku: 'SUN-D01', name: '데일리 선크림', option: '50ml', title: 'SPF50+ PA++++ 선크림', content: '백탁 없는 데일리 자외선 차단.', active: true, price: 21000, shippingFee: 3000, rankingScore: 68, tags: ['sunscreen'] },
  { sku: 'AMP-B01', name: '브라이트 앰플', option: '30ml', title: '브라이트닝 앰플', content: '피부 톤을 환하게.', active: true, price: 34000, shippingFee: 3000, rankingScore: 80, tags: ['brightening','ampoule'] },
]

async function main() {
  await mongoose.connect(MONGO_URI)
  console.log('[seed] connected')

  for (const p of products) {
    const prod = await Product.findOneAndUpdate({ sku: p.sku }, p, { upsert: true, new: true })
    await Inventory.findOneAndUpdate(
      { sku: p.sku },
      { sku: p.sku, name: p.title || p.name, qty: 100, reserved: 0, updatedAt: new Date() },
      { upsert: true, new: true }
    )
    console.log(`[seed] upserted product ${prod.sku}`)
  }

  const count = await Product.countDocuments()
  console.log(`[seed] total products: ${count}`)
  // Seed notices (sample)
  const { Notice } = await import('../models/notice.model.js')
  const notices = [
    { title: '신규 회원가입 이벤트 진행 중', body: '<p>지금 가입하면 10% 쿠폰 지급!</p>', showOnTop: true, active: true },
    { title: '추석 연휴 배송 안내', body: '<p>연휴 기간 일부 지역 배송이 지연될 수 있습니다.</p>', showOnTop: true, active: true },
    { title: '주문 금액 5만원 이상 무료배송', body: '<p>일부 도서산간 제외</p>', showOnTop: true, active: true },
    { title: '시스템 점검 안내', body: '<p>일요일 02:00-04:00 서비스 점검 예정</p>', showOnTop: false, active: true },
  ]
  for (const n of notices) {
    await Notice.findOneAndUpdate({ title: n.title }, n, { upsert: true, new: true })
  }
  await mongoose.disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
