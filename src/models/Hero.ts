import mongoose, { Schema, Document } from 'mongoose'

export interface IHero extends Document {
  title: string
  subtitle: string
  backgroundImage: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  floatingCardTitle: string
  floatingCardDescription: string
  floatingCardImage: string
}

const HeroSchema = new Schema<IHero>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    backgroundImage: { type: String, required: true },
    primaryButtonText: { type: String, default: 'Explore More' },
    primaryButtonLink: { type: String, default: '#services' },
    secondaryButtonText: { type: String, default: 'Watch Video' },
    secondaryButtonLink: { type: String, default: '#case-study' },
    floatingCardTitle: { type: String, default: '' },
    floatingCardDescription: { type: String, default: '' },
    floatingCardImage: { type: String, default: '' },
  },
  { timestamps: true }
)

export const Hero = mongoose.models.Hero || mongoose.model<IHero>('Hero', HeroSchema)
