import mongoose, { Document } from 'mongoose';
export interface ITeam extends Document {
    name: string;
    country: string;
    founded: number;
}
declare const _default: mongoose.Model<ITeam, {}, {}>;
export default _default;
