import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const HouseSchema = new Schema (
  {
  year: {type: Number, required: true },
  location: {type: String, required: true },
  stories: {type: Number, required: true },
  price: {type: Number,  required: true },
  color: {type: String,  required: true },
  description: {type: String,  required: true },
  imgUrl: { type: String, required: true, default: 'https://placehold.it/300x300' },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
  },
  {timestamps: true, toJSON: {virtuals: true} }
)

HouseSchema.virtual('creator', {
  localField: 'creator',
  foreignField: '_id',
  ref: 'Profile',
  justOne: true
})