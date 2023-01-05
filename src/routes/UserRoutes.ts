import express from 'express'
import { UserController } from '../controllers'
import { UserValidations } from '../validations'

const router = express.Router()

const { body, params } = UserValidations

// ---------- CREATE

router.post('/', [ 
    body.has.name, body.has.email, body.has.username, body.has.password, body.has.role,
    body.notExist.email, body.notExist.username
], UserController.create )

// ---------- SHOW

router.get('/:id', [
    params.has.id,
], UserController.show )

// ---------- REMOVE

router.delete('/:id', [
    params.has.id,
], UserController.remove )

// ---------- LIST

router.get('/list/all', UserController.list )

export { router as UserRoutes }