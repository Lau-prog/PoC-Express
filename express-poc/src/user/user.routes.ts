import { Router } from 'express'
import { bodySchema, partBodySchema, findAll, findOne, add, update, remove } from './user.controler.js'
import { checkSchema } from 'express-validator';

export const userRouter = Router()

userRouter.get('/', findAll)
userRouter.get('/:id', findOne)
userRouter.post('/', checkSchema(bodySchema), add)
userRouter.put('/:id', checkSchema(bodySchema), update)
userRouter.patch('/:id', checkSchema(partBodySchema), update)
userRouter.delete('/:id', remove)