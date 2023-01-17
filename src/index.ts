import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

import { UserRoutes, AuthRoutes } from './routes'
import { PORT, FRONTEND } from './config/variables'

const server = express()

server.use(express.static('public'))
server.use(express.json())
server.use(cors({
    origin: FRONTEND
}))

server.use('/user', UserRoutes)
server.use('/auth', AuthRoutes)

server.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

server.listen(PORT, () => {
    console.log("Server Online")
})

export default server