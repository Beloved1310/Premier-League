import mongoose, { Document } from 'mongoose';
export interface IFixture extends Document {
    homeTeam: string;
    awayTeam: string;
    kickoffTime: Date;
    result: string;
}
declare const _default: mongoose.Model<IFixture, {}, {}>;
export default _default;
