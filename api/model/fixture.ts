import { string } from 'joi';
import mongoose, { Schema, Document } from 'mongoose';
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789AQWXSCZEDCVFRTGBHYNJUIKLOPaqwxszedcvfrtgbnhyujmkiolp', 17);


// Define the interface for a fixture
export interface IFixture extends Document {
  homeTeam: string;
  awayTeam: string;
  kickoffTime: Date;
  result: string;
  // Add other fixture-specific properties as needed
}

// Create a schema for the fixture
const FixtureSchema: Schema = new Schema({
  code: {
    type: String,
    default: () => 'fix_' + nanoid(), 
  },
  homeTeam: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    awayTeam: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
  kickoffTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: 'pending'
  },
  result: {
    type: String,
    default: 'Not Played', // You can set a default value or use a different type for results
  },
  // Add other fixture-specific properties as needed
});

// Create a model for the fixture
export default mongoose.model<IFixture>('Fixture', FixtureSchema);
