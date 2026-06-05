import mongoose, { Schema, Document } from 'mongoose'

export interface IGeoSettings extends Document {
  companySummary: string
  businessDescription: string
  servicesOverview: string
  productsOverview: string
  industryOverview: string
  whyChooseXurya: string
  faqSection: string
  caseStudySummary: string
}

const GeoSettingsSchema = new Schema<IGeoSettings>(
  {
    companySummary: { type: String, default: '' },
    businessDescription: { type: String, default: '' },
    servicesOverview: { type: String, default: '' },
    productsOverview: { type: String, default: '' },
    industryOverview: { type: String, default: '' },
    whyChooseXurya: { type: String, default: '' },
    faqSection: { type: String, default: '' },
    caseStudySummary: { type: String, default: '' },
  },
  { timestamps: true }
)

export const GeoSettings = mongoose.models.GeoSettings || mongoose.model<IGeoSettings>('GeoSettings', GeoSettingsSchema)
