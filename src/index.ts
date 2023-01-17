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

server.use('/user', UserRoutes)
server.use('/auth', AuthRoutes)

server.listen(PORT || 4000, () => {
    console.log("Server Online")
})

const app = server
export default app