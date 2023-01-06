import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { UserRoutes, AuthRoutes } from './routes'
import { PORT } from './config/variables'

const server = express()

server.use(express.json())
server.use(cors())
server.use('*', cors())

server.use('/user', UserRoutes)
server.use('/auth', AuthRoutes)

server.listen( PORT, () => {
    console.log("Server Online")
})