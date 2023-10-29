import mongoose, { Document } from 'mongoose';
export interface UserInput {
    fullname: string;
    email: string;
    password: string;
}
export interface UserDocument extends UserInput, Document {
    fullname: string;
    email: string;
    password: string;
    isAdmin: boolean;
    generateAuthToken(): string;
}
declare const _default: mongoose.Model<UserDocument, {}, {}>;
export default _default;
