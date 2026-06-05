import mongoose, { Schema, Document } from 'mongoose'

export interface ISeoPage {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogImage: string
}

export interface ISeoSettings extends Document {
  home: ISeoPage
  about: ISeoPage
  solutions: ISeoPage
  caseStudies: ISeoPage
  products: ISeoPage
  contact: ISeoPage
}

const SeoPageSchema = new Schema<ISeoPage>(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' },
    ogTitle: { type: String, default: '' },
    ogDescription: { type: String, default: '' },
    ogImage: { type: String, default: '' },
  },
  { _id: false }
)

const SeoSettingsSchema = new Schema<ISeoSettings>(
  {
    home: { type: SeoPageSchema, default: () => ({}) },
    about: { type: SeoPageSchema, default: () => ({}) },
    solutions: { type: SeoPageSchema, default: () => ({}) },
    caseStudies: { type: SeoPageSchema, default: () => ({}) },
    products: { type: SeoPageSchema, default: () => ({}) },
    contact: { type: SeoPageSchema, default: () => ({}) },
  },
  { timestamps: true }
)

export const SeoSettings = mongoose.models.SeoSettings || mongoose.model<ISeoSettings>('SeoSettings', SeoSettingsSchema)
