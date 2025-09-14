import mongoose from 'mongoose'

const InventorySchema = new mongoose.Schema(
  {
    sku: { type: String, unique: true, index: true, required: true },
    name: { type: String },
    qty: { type: Number, default: 0 },
    reserved: { type: Number, default: 0 },
    warehouseId: { type: String },
    updatedAt: { type: Date, default: Date.now }
  },
  { minimize: false }
)

export const Inventory = mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema)
