import express from 'express'
import { UserController } from '../controllers'
import { UserValidations, AuthValidations } from '../validations'

const router = express.Router()

const { body, params } = UserValidations
const { authenticated, role } = AuthValidations

// ---------- CREATE

router.post('/', [ 
    authenticated.asAdmin,
    body.has.name, body.has.email, body.has.username, body.has.password, role.body,
    body.isValid.name, body.isValid.email, body.isValid.password, body.isValid.username, role.isValid,
    body.notExist.email, body.notExist.username
], UserController.create )

// ---------- SHOW

router.get('/:id', [
    authenticated.asAdmin,
    params.has.id,
], UserController.show )

router.post('/exists/email', [
    body.has.email,
    body.isValid.email
], UserController.emailAlredyExists )

router.post('/exists/username', [
    body.has.username,
    body.isValid.username
], UserController.usernameAlredyExists )

// ---------- REMOVE

router.delete('/:id', [
    authenticated.asAdmin,
    params.has.id,
], UserController.remove )

// ---------- UPDATE

router.put('/:id', [
    authenticated.only,
    params.has.id,
    body.isValid.name, body.isValid.email, body.isValid.password, body.isValid.username, role.isValid,
    body.notExist.email, body.notExist.username
], UserController.update )

// ---------- LIST

router.get('/list/all', [
    authenticated.asAdmin,
], UserController.list )

export { router as UserRoutes }