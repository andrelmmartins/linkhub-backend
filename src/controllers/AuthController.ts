import { Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

import { UserModel, TokenModel } from '../models'
import { HASH } from '../config/variables'
import { sendForgotMail } from '../config/Mail'

function authToken(id: string) {
    return jwt.sign({ id }, HASH, {
        expiresIn: 60 * 60 * 24 * 1 // 1 day
    })
}

export function validateAToken(token: string) : { id: string, exp: number } | null {
    try {
        const verified = jwt.verify(token, HASH)
        return verified as { id: string, exp: number }
    } catch (e) {
        if(e instanceof JsonWebTokenError) console.log(e.message)
        return null
    }
}

class Controller {

    async createAccount(request: Request, response: Response) {
        try {
            const user = await UserModel.create(request.body)
            const token = authToken(user.id)

            return response.status(200).json({ 
                user: {
                    ...user.toJSON(),
                    password: undefined
                },
                token
            })
        } catch (e) {
            console.log(e)
            return response.status(500).send('something wrong happened in: auth.create.account')
        }
    }

    async auth(request: Request, response: Response) {
        try {
            const { email, password } = request.body

            const user = await UserModel.findOne({ 'email': {'$eq': email }}).select('+password')
        
            if(!user || !(await bcrypt.compare(password, user.password))) return response.status(401).send('incorrect email or password')

            const token = authToken(user.id)
            
            return response.status(200).json({ 
                user: {
                    ...user.toJSON(),
                    password: undefined
                },
                token
            })
            
        } catch (e) {
            console.log(e)
            return response.status(500).send('something wrong happened in: auth')
        }
    }

    async forgot(request: Request, response: Response) {
        try {
            const { email } = request.body

            const user = await UserModel.findOne({ 'email': {'$eq': email }})
            if(!user) return response.status(202).send()
        
            let token = await TokenModel.findOne({ userId: user._id });
            if (token) await token.deleteOne();

            let resetToken = crypto.randomBytes(32).toString('hex')
            let hash = await bcrypt.hash(resetToken, 10)

            await TokenModel.create({ userId: user.id, token: hash, createdAt: Date.now() })

            let wasSent = await sendForgotMail(user.id, user.email, resetToken)
            if (!wasSent) return response.status(500).send('something wrong happened in: send.forgot.mail')
            else return response.status(202).send()
        } catch (e) {
            console.log(e)
            return response.status(500).send('something wrong happened in: auth.forgot')
        }
    }

    async validateForgotProcess(request: Request, response: Response) {
        try {
            const { id, token } = request.params
            
            let user = await UserModel.findById(id)
            if(!user) return response.status(200).send({ valid: false })

            let tokenSaved = await TokenModel.findOne({ userId: id });
            if (!tokenSaved) return response.status(200).send({ valid: false })

            let isValid = await bcrypt.compare(token, tokenSaved.token);
            return response.status(200).send({ valid: isValid })
        } catch (e) {
            console.log(e)
            return response.status(500).send('something wrong happened in: auth.validate.forgot.process')
        }
    }

    async change(request: Request, response: Response) {
        try {
            const { id, token } = request.params
            const { password } = request.body

            let user = await UserModel.findById(id)
            if(!user) return response.status(404).send('user not found')

            let tokenSaved = await TokenModel.findOne({ userId: id });
            if (!tokenSaved) return response.status(400).send('invalid or expired password reset token')

            let isValid = await bcrypt.compare(token, tokenSaved.token);
            if (!isValid) return response.status(400).send('invalid or expired password reset token')

            if(password) {
                user.password = password
                user = await user.save({ timestamps: true })
            }

            return response.status(200).json({ 
                user: {
                    ...user.toJSON(),
                    password: undefined
                }
            })
        } catch (e) {
            console.log(e)
            return response.status(500).send('something wrong happened in: auth.change.password')
        }
    }

}

export const AuthController = new Controller()