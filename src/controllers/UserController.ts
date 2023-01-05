import { Request, Response } from 'express'

import { UserModel } from '../models'

class Controller {

    async create(request: Request, response: Response) {
        try {
            const user = await UserModel.create(request.body);
            return response.status(200).json({ 
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                }
            });
        } catch (e) {
            return response.status(500).send({ error: 'something wrong happened in: user.create' })
        }
    }

    async list(request: Request, response: Response) {
        try {
            const users = await UserModel.find();
            return response.status(200).json({
                users: users.map((user) => ({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                }))
            });
        } catch (e) {
            return response.status(500).send({ error: 'something wrong happened in: user.list' })
        }
    }

}

export const UserController = new Controller()