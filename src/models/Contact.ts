import mongoose, { Schema, Document } from 'mongoose'

export interface IContact extends Document {
  phone: string
  email: string
  whatsapp: string
  address: string
  googleMapsUrl: string
}

const ContactSchema = new Schema<IContact>(
  {
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    address: { type: String, default: '' },
    googleMapsUrl: { type: String, default: '' },
  },
  { timestamps: true }
)

export const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema)
