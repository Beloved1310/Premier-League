import mongoose, { Schema, Document } from 'mongoose';
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789AQWXSCZEDCVFRTGBHYNJUIKLOPaqwxszedcvfrtgbnhyujmkiolp', 17);

// Define the interface for a fixture
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

export default mongoose.model<ITeam>('Team', TeamSchema);
