import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import { UserRoutes } from './routes'

dotenv.config()

const server = express()

server.use(express.json())
server.use(cors())
server.use('*', cors())

server.use('/user', UserRoutes)

server.listen( process.env.Port || 3333, () => {
    console.log("Server Online")
})