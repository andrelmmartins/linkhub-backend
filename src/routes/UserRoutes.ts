import express from 'express'
import { UserController } from '../controllers'
import { UserValidations } from '../validations'

const router = express.Router()

const { body } = UserValidations

// create
const createValidations = [ body.has.name, body.has.email, body.has.username, body.has.password, body.has.role, body.exists.email, body.exists.username ]
router.post('/', createValidations, UserController.create )

// list
router.get('/list', UserController.list )

export { router as UserRoutes }