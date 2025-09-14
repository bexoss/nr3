import mongoose from 'mongoose'

const ShippingSchema = new mongoose.Schema(
  {
    zipCode: String,
    shippingAddress1: String,
    shippingAddress2: String
  },
  { _id: false }
)

const UserSchema = new mongoose.Schema(
  {
    provider: { type: String, default: 'credentials' },
    providerId: { type: String },
    email: { type: String, index: true },
    name: { type: String },
    passwordHash: { type: String },
    isAdmin: { type: Boolean, default: false },
    shippingAddress: { type: ShippingSchema }
  },
  { timestamps: true }
)

export const User = mongoose.models.User || mongoose.model('User', UserSchema)
