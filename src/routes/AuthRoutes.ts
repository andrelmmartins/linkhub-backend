import express from 'express'
import { AuthController } from '../controllers'
import { AuthValidations, UserValidations } from '../validations'

const router = express.Router()

const { body, params } = UserValidations
const { params : authParams } = AuthValidations

// ---------- AUTH

router.post('/signIn', [
    body.has.email, body.has.password,
    body.isValid.email,
], AuthController.auth )

// ---------- CREATE

router.post('/create', [ 
    body.has.name, body.has.email, body.has.username, body.has.password,
    body.isValid.name, body.isValid.email, body.isValid.password, body.isValid.username,
    body.notExist.email, body.notExist.username
], AuthController.createAccount )

// ---------- FORGOT

router.post('/forgot', [
    body.has.email,
    body.isValid.email,
], AuthController.forgot )

router.get('/forgot/:id/:token', [
    params.has.id,
    authParams.has.token
], AuthController.validateForgotProcess )

// ---------- CHANGE

router.put('/change/:id/:token', [
    params.has.id,
    authParams.has.token,
    body.has.password,
    body.isValid.password,
], AuthController.change )

export { router as AuthRoutes }