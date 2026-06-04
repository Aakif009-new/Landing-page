import mongoose, { Schema, Document } from 'mongoose'

export interface IProcessStep extends Document {
  stepNumber: number
  title: string
  description: string
  image: string
  displayOrder: number
}

const ProcessStepSchema = new Schema<IProcessStep>(
  {
    stepNumber: { type: Number, default: 0 },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const ProcessStep = mongoose.models.ProcessStep || mongoose.model<IProcessStep>('ProcessStep', ProcessStepSchema)
