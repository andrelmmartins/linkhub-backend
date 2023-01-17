import { NextFunction, Request, Response } from "express";

import { Role, roles } from '../types';
import { UserModel } from "../models";
import { validateAToken } from "../controllers";

const params = {
    has: {
        token: (request: Request, response: Response, next: NextFunction) => {
            const { token } = request.params
            
            if(!token) return response.status(400).send("token is necessary")
            
            return next()
        }
    },
}

const authenticated = {
    only: async ( request: Request, response: Response, next: NextFunction ) => {
        const { authorization } = request.headers
        const token = authorization?.replace('Bearer ', '');
        
        if(!token) return response.status(401).send('pleate authenticate')
    
        const decoded = validateAToken(token)
        if(!decoded) return response.status(401).send('pleate authenticate')
        
        const user = await UserModel.findById(decoded.id)
        if(!user) return response.status(404).send('user not found')
    
        next();
    },

    asAdmin: async (request: Request, response: Response, next: NextFunction) => {

        const { authorization } = request.headers
        const token = authorization?.replace('Bearer ', '');
        
        if(!token) return response.status(401).send('pleate authenticate')

        const decoded = validateAToken(token)
        if(!decoded) return response.status(401).send('pleate authenticate')
        
        const user = await UserModel.findById(decoded.id)
        if(!user) return response.status(404).send('user not found')
        
        if(user.role !== 'admin') return response.status(401).send('unauthorized')

        return next()
    }
}

const role = {
    body: (request: Request, response: Response, next: NextFunction) => {
        const { role } = request.body
        if(!role) return response.status(400).send("role is necessary")

        return next()
    },

    isValid: (request: Request, response: Response, next: NextFunction) => {
        const { role } = request.body
        if (role) {
            if(!roles.includes(role as Role)) return response.status(400).send("role is invalid")
        }
        return next()
    }
}

export const AuthValidations = {
    authenticated,
    role,
    params
}