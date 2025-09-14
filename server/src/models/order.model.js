import mongoose from 'mongoose'

const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    sku: String,
    qty: Number,
    price: Number,
    originalPrice: Number,
    option: { type: Object },
    cid: { type: String }
  },
  { _id: false }
)

const RecordSchema = new mongoose.Schema(
  {
    type: String,
    date: Date
  },
  { _id: false }
)

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, index: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'],
      default: 'pending'
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    guestInfo: { type: Object },
    shippingAddress: { type: Object },
    items: { type: [OrderItemSchema], default: [] },
    trackingNo: String,
    trackingCompany: String,
    lastTrackUpdatedAt: Date,
    paymentMethod: String,
    paymentAmount: String,
    records: { type: [RecordSchema], default: [] }
  },
  { timestamps: true }
)

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)
