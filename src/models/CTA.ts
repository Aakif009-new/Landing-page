import mongoose, { Schema, Document } from 'mongoose'

export interface ICTA extends Document {
  heading: string
  description: string
  buttonOneText: string
  buttonOneLink: string
  buttonTwoText: string
  buttonTwoLink: string
}

const CTASchema = new Schema<ICTA>(
  {
    heading: { type: String, required: true },
    description: { type: String, default: '' },
    buttonOneText: { type: String, default: 'Explore More' },
    buttonOneLink: { type: String, default: '#services' },
    buttonTwoText: { type: String, default: 'Book Now' },
    buttonTwoLink: { type: String, default: '' },
  },
  { timestamps: true }
)

export const CTA = mongoose.models.CTA || mongoose.model<ICTA>('CTA', CTASchema)
