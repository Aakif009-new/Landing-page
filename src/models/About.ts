import mongoose, { Schema, Document } from 'mongoose'

export interface IAbout extends Document {
  sectionLabel: string
  heading: string
  description: string
  teamCount: number
  teamImages: string[]
  aboutImage: string
}

const AboutSchema = new Schema<IAbout>(
  {
    sectionLabel: { type: String, default: '[ Feature ]' },
    heading: { type: String, required: true },
    description: { type: String, default: '' },
    teamCount: { type: Number, default: 0 },
    teamImages: [{ type: String }],
    aboutImage: { type: String, default: '' },
  },
  { timestamps: true }
)

export const About = mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema)
