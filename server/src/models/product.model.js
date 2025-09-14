import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    sku: { type: String, index: true, required: true, maxlength: 20 },
    name: { type: String, required: true },
    option: { type: String },
    title: { type: String },
    content: { type: String },
    active: { type: Boolean, default: true },
    price: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    reviewLink: { type: [String], default: [] },
    maxQtyPerUser: { type: Number, default: 100 },
    maxQtyPerOrder: { type: Number, default: 100 },
    cid: { type: String },
    rankingScore: { type: Number, default: 0, min: 0, max: 100 },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
)

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
