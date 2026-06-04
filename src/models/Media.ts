import mongoose, { Schema, Document } from 'mongoose'

export interface IMedia extends Document {
  url: string
  publicId: string
  section: string
  uploadedAt: Date
}

const MediaSchema = new Schema<IMedia>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    section: { type: String, default: 'general' },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export const Media = mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema)
