import bcrypt from 'bcrypt'
import { mongoose } from '../config/database'

const UserSchema = new mongoose.Schema({
    name:       { type: String, required: true, trim: true },
    email:      { type: String, required: true, lowercase: true, unique: true, trim: true },
    username:   { type: String, required: true, lowercase: true, unique: true, trim: true },
    password:   { type: String, required: true, select: false, default: "linkhub" },
}, {
    timestamps: true
})

UserSchema.pre('save', async function( next ) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

export const UserModel = mongoose.model('user', UserSchema);