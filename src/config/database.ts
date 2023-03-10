import mongoose from 'mongoose'
import { MONGO } from './variables';

mongoose.set("strictQuery", false);
mongoose.connect(MONGO)
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch((err) => {
        console.log(err)
    })

export { mongoose }