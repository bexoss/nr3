import mongoose from 'mongoose'

const AttachmentSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video', 'file'], default: 'image' },
  },
  { _id: false }
)

const NoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, default: '' }, // HTML or markdown
    showOnTop: { type: Boolean, default: false, index: true },
    active: { type: Boolean, default: true, index: true },
    attachments: { type: [AttachmentSchema], default: [] },
  },
  { timestamps: true }
)

export const Notice = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema)

