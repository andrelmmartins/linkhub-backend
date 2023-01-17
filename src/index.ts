import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { UserRoutes, AuthRoutes } from './routes'
import { PORT, FRONTEND } from './config/variables'

const server = express()

server.use(express.json())
server.use(cors({
    origin: FRONTEND
}))

server.use('/api/user', UserRoutes)
server.use('/api/auth', AuthRoutes)

server.listen( PORT, () => {
    console.log("Server Online")
})