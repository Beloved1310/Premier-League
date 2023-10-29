import mongoose, { Schema, Document } from 'mongoose';
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789AQWXSCZEDCVFRTGBHYNJUIKLOPaqwxszedcvfrtgbnhyujmkiolp', 17);

// Define the interface for a team
export interface ITeam extends Document {
  name: string;
  country: string;
  founded: number;
}

const TeamSchema: Schema = new Schema({
  code: {
    type: String,
    default: () => 'tem_' + nanoid(), 
  },
  name: { type: String, required: true },
  country: { type: String, required: true },
  founded: { type: Number, required: true },
});


TeamSchema.index({ name: 1, country: 1 });
TeamSchema.index({ country: 1, founded: 1 });

TeamSchema.index({ name: 1 }, { unique: true });

export default mongoose.model<ITeam>('Team', TeamSchema);
