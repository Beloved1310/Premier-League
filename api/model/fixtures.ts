import { string } from 'joi';
import mongoose, { Schema, Document } from 'mongoose';

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
  homeTeam: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  kickoffTime: {
    type: Date,
    required: true,
  },
  status: {
    type: string,
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
