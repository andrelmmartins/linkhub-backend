import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

import { HASH } from "../config/variables";
import { Role, roles } from '../types';
import { UserModel } from "../models";

export interface CustomRequest extends Request {
    token: { id: string } | JwtPayload;
}

const authenticated = {
    only: async ( request: Request, response: Response, next: NextFunction ) => {
        const { authorization } = request.headers
        const token = authorization?.replace('Bearer ', '');
        
        if(!token) return response.status(401).send('pleate authenticate')
    
        const { id } = jwt.verify(token, HASH) as { id: string }
        if(!id) return response.status(401).send('pleate authenticate')
        
        const user = await UserModel.findById(id)
        if(!user) return response.status(404).send('user not found')
    
        next();
    },

    asAdmin: async (request: Request, response: Response, next: NextFunction) => {

        const { authorization } = request.headers
        const token = authorization?.replace('Bearer ', '');
        
        if(!token) return response.status(401).send('pleate authenticate')

        const { id } = jwt.verify(token, HASH) as { id: string }
        if(!id) return response.status(401).send('pleate authenticate')
        
        const user = await UserModel.findById(id)
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
    role
}