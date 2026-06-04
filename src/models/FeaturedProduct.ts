import mongoose, { Schema, Document } from 'mongoose'

export interface IFeaturedProduct extends Document {
  name: string
  description: string
  specifications: string[]
  image: string
  displayOrder: number
  active: boolean
}

const FeaturedProductSchema = new Schema<IFeaturedProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    specifications: [{ type: String }],
    image: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const FeaturedProduct = mongoose.models.FeaturedProduct || mongoose.model<IFeaturedProduct>('FeaturedProduct', FeaturedProductSchema)
