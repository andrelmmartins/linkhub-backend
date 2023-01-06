import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserModel } from '../models'
import { HASH } from '../config/variables'
import { sendForgetMail } from '../config/Mail'

function authToken(id: string) {
    return jwt.sign({ id }, HASH, {
        expiresIn: 60 * 60 * 24 * 1 // 1 day
    })
}

function forgetToken(id: string) {
    return jwt.sign({ id }, HASH, {
        expiresIn: 60 * 60 * 1 // 1 hour
    })
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
            });
        } catch (e) {
            console.log(e)
            return response.status(500).send({ error: 'something wrong happened in: auth.create.account' })
        }
    }

    async auth(request: Request, response: Response) {
        try {
            const { email, password } = request.body

            const user = await UserModel.findOne({ 'email': {'$eq': email }}).select('+password');
        
            if(!user || !(await bcrypt.compare(password, user.password))) return response.status(401).json({error: 'incorrect email or password'});

            const token = authToken(user.id)
            
            return response.status(200).json({ 
                user: {
                    ...user.toJSON(),
                    password: undefined
                },
                token
            });
            
        } catch (e) {
            console.log(e)
            return response.status(500).send({ error: 'something wrong happened in: auth' })
        }
    }

    async forget(request: Request, response: Response) {
        try {
            const { email } = request.body

            const user = await UserModel.findOne({ 'email': {'$eq': email }});
            if( !user) return response.status(404).json({error: 'user not found'});
        
            let token = forgetToken(user.id)
            let wasSent = await sendForgetMail(user.email, token)
            
            if (!wasSent) return response.status(500).send({ error: 'something wrong happened in: seng.forget.mail' })
            else return response.status(200).send();
    
        } catch (e) {
            console.log(e)
            return response.status(500).send({ error: 'something wrong happened in: auth.forget' })
        }
    }

    async change(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { password } = request.body

            let user = await UserModel.findById(id) 
            if(!user) return response.status(404).send({ error: 'user not found' })

            if(password) user.password = password

            user = await user.save({ timestamps: true })

            return response.status(200).json({ 
                user: {
                    ...user.toJSON(),
                    password: undefined
                }
            });
        } catch (e) {
            console.log(e)
            return response.status(500).send({ error: 'something wrong happened in: user.update' })
        }
    }

}

export const AuthController = new Controller()