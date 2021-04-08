import { Document, Model, model, Types, Schema, Query } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<Boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  { collection: 'users' }
);

export default model('User', UserSchema);
