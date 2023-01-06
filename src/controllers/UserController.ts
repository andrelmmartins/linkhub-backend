import { Request, Response } from 'express'

import { USER_EMAIL, USER_NAME, USER_PASSWORD } from '../config/variables'
import { UserModel } from '../models'

class Controller {

    constructor() {
        this.createFirstUser()
    }

    private async createFirstUser() {
        try {

            const user = await UserModel.findOne({ 'email': {'$eq': USER_EMAIL }})
            if(!user) {
                await UserModel.create({
                    name: USER_NAME,
                    username: USER_NAME,
                    email: USER_EMAIL,
                    password: USER_PASSWORD,
                    role: 'admin'
                })
            }

        } catch (e) {
            console.log(e)
            console.log('something wrong happened in: first.user.creation')
        }
    } 

    async create(request: Request, response: Response) {
        try {
            const user = await UserModel.create(request.body)
            return response.status(200).json({ 
                user: {
                    ...user.toJSON(),
                    password: undefined
                }
            });
        } catch (e) {
            console.log(e)
            return response.status(500).send({ error: 'something wrong happened in: user.create' })
        }
    }

    async list(request: Request, response: Response) {
        try {
            const users = await UserModel.find();
            return response.status(200).json({
                users: users.map((user) => user.toJSON())
            });
        } catch (e) {
            console.log(e)
            return response.status(500).send({ error: 'something wrong happened in: user.list' })
        }
    }

    async show(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const user = await UserModel.findById(id)
            if(!user) return response.status(404).send({ error: 'user not found' })

            return response.status(200).json({ user: user.toJSON() });
        } catch (e) {
            console.log(e)
            return response.status(500).send({ error: 'something wrong happened in: user.show' })
        }
    }

    async remove(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const user = await UserModel.findByIdAndDelete(id)
            if(!user) return response.status(404).send({ error: 'user not found' })

            return response.status(200).json({ 
                user: {
                    ...user.toJSON(),
                    password: undefined
                }
            });
        } catch (e) {
            console.log(e)
            return response.status(500).send({ error: 'something wrong happened in: user.remove' })
        }
    }

    async update(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { name, email, username, password } = request.body

            let user = await UserModel.findById(id) 
            if(!user) return response.status(404).send({ error: 'user not found' })

            if(name) user.name = name
            if(email) user.email = email
            if(username) user.username = username
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

export const UserController = new Controller()