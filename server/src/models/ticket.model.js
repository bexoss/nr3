import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
  {
    authorType: { type: String, enum: ['customer', 'agent'], required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
)

const TicketSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    relatedOrderId: { type: mongoose.Schema.Types.ObjectId },
    category: { type: String, default: 'general' },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'waiting_customer', 'resolved', 'closed'],
      default: 'new',
      index: true
    },
    messages: { type: [MessageSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { minimize: false }
)

export const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema)
