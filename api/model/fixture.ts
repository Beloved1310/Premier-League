import mongoose, { Schema, Document } from 'mongoose'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet(
  '0123456789AQWXSCZEDCVFRTGBHYNJUIKLOPaqwxszedcvfrtgbnhyujmkiolp',
  17,
)

export interface IFixture extends Document {
  homeTeam: string
  awayTeam: string
  kickoffTime: Date
  result: string
}

const FixtureSchema: Schema = new Schema({
  code: {
    type: String,
    default: () => 'fix_' + nanoid(),
  },
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  kickoffTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  result: {
    type: String,
    default: 'Not Played',
  },
});

FixtureSchema.index({ homeTeam: 1, kickoffTime: 1 });
FixtureSchema.index({ awayTeam: 1, kickoffTime: 1 });

export default mongoose.model<IFixture>('Fixture', FixtureSchema);
