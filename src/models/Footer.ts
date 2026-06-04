import mongoose, { Schema, Document } from 'mongoose'

export interface IFooterLink {
  label: string
  href: string
}

export interface ISocialLink {
  platform: string
  url: string
}

export interface IFooter extends Document {
  companyDescription: string
  footerLinks: IFooterLink[]
  socialLinks: ISocialLink[]
  copyright: string
}

const FooterLinkSchema = new Schema<IFooterLink>(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
  },
  { _id: false }
)

const SocialLinkSchema = new Schema<ISocialLink>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
)

const FooterSchema = new Schema<IFooter>(
  {
    companyDescription: { type: String, default: '' },
    footerLinks: [FooterLinkSchema],
    socialLinks: [SocialLinkSchema],
    copyright: { type: String, default: '' },
  },
  { timestamps: true }
)

export const Footer = mongoose.models.Footer || mongoose.model<IFooter>('Footer', FooterSchema)
