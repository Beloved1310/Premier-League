import mongoose, { Schema, Document } from 'mongoose';


// Define the interface for a fixture
export interface ITeam extends Document {
  name: string;
  country: string;
  founded: number;
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  founded: { type: Number, required: true },
});

export default mongoose.model<ITeam>('Team', TeamSchema);
