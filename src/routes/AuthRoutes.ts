import express from 'express'
import { AuthController } from '../controllers'
import { UserValidations } from '../validations'

const router = express.Router()

const { body, params } = UserValidations

// ---------- AUTH

router.post('/', [
    body.has.email, body.has.password,
    body.isValid.email, body.isValid.password,
], AuthController.auth )

// ---------- CREATE

router.post('/create', [ 
    body.has.name, body.has.email, body.has.username, body.has.password,
    body.isValid.name, body.isValid.email, body.isValid.password, body.isValid.username,
    body.notExist.email, body.notExist.username
], AuthController.createAccount )

// ---------- FORGET

router.post('/forget', [
    body.has.email,
    body.isValid.email,
], AuthController.forget )

// ---------- FORGET

router.post('/change/:id', [
    params.has.id,
    body.has.password,
    body.isValid.password,
], AuthController.change )

export { router as AuthRoutes }