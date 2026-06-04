import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  category: string
  description: string
  image: string
  specifications: string[]
  featured: boolean
  displayOrder: number
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, required: true },
    specifications: [{ type: String }],
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
