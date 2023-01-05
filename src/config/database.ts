import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const url = process.env.MONGO_URL ?? ''

mongoose.set("strictQuery", false);
mongoose.connect(url)
    .then(() => {
        console.log('MongoDB Connexcted')
    })
    .catch((err) => {
        console.log(err)
    })

export { mongoose }