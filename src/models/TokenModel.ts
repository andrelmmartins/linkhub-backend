import { Schema } from 'mongoose';
import { mongoose } from '../config/database'

const TokenSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), expires: 60 * 30 } // 30 minutes
})

export const TokenModel = mongoose.model('token', TokenSchema);