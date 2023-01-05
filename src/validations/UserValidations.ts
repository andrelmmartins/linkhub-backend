import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

import { UserModel } from "../models";
import { Role, roles } from '../types'

const utils = {
    validate : {
        name: (name: string) => {
            return Boolean(
                name.match(/^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+)?$/)
            )
        },
    
        email: (email: string) => {
            return Boolean(
                email.match(/^(([a-z0-9](\.?[a-z0-9]){3,}))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            )
        },
    
        password: (password: string) => {
            return (
                password.trim().length >= 8
            )
        },
    
        role: (role: string) => {
            return (
                roles.includes(role as Role)
            )
        },
    
        username: (username: string) => {
            return Boolean(
                username.match(/^[a-z0-9](\.?[a-z0-9]){3,}$/)
            )
        } 
    },
    exists: {
        email: async (email: string) => {
            const user = await UserModel.findOne({ 'email': {'$eq': email }})
            return user
        },
        username: async (username: string) => {
            const user = await UserModel.findOne({ 'username': {'$eq': username }})
            return user
        },
    }
}

const body = {
    has: {
        name: (request: Request, response: Response, next: NextFunction) => {
            const { name } = request.body
            
            if(!name) return response.status(400).json({ error: "name is necessary" })
            else if(!utils.validate.name(name)) return response.status(400).json({ error: "name is invalid" })

            return next()
        },

        email: async (request: Request, response: Response, next: NextFunction) => {
            const { email } = request.body
            
            if(!email) return response.status(400).json({ error: "email is necessary" })
            else if(!utils.validate.email(email)) return response.status(400).json({ error: "email is invalid" })
            return next()
        },

        password: (request: Request, response: Response, next: NextFunction) => {
            const { password } = request.body
            
            if(!password) return response.status(400).json({ error: "password is necessary" })
            else if(!utils.validate.password(password)) return response.status(400).json({ error: "password is invalid" })

            return next()
        },

        role: (request: Request, response: Response, next: NextFunction) => {
            const { role } = request.body
            
            if(!role) return response.status(400).json({ error: "role is necessary" })
            else if(!utils.validate.role(role)) return response.status(400).json({ error: "role is invalid" })

            return next()
        },

        username: async (request: Request, response: Response, next: NextFunction) => {
            const { username } = request.body
            
            if(!username) return response.status(400).json({ error: "username is necessary" })
            else if(!utils.validate.username(username)) return response.status(400).json({ error: "username is invalid" })

            return next()
        },
    },
    
    exists: {
        email: async (request: Request, response: Response, next: NextFunction) =>  {
            const { email } = request.body
            if(await utils.exists.email(email)) return response.status(409).json({ error: "email alredy exists" })
            return next()
        },

        username: async (request: Request, response: Response, next: NextFunction) =>  {
            const { username } = request.body
            if(await utils.exists.username(username)) return response.status(409).json({ error: "username alredy exists" })
            return next()
        } 
    }
}

export const UserValidations = {
    body
}