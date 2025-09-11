import { Router } from 'express'
import { bodySchema, partBodySchema, findAll, findOne, add, update, remove } from './task.controler.js'
import { checkSchema } from 'express-validator'

export const taskRouter = Router()

taskRouter.get('/', findAll)
taskRouter.get('/:id', findOne)
taskRouter.post('/', checkSchema(bodySchema), add)
taskRouter.put('/:id', checkSchema(bodySchema), update)
taskRouter.patch('/:id', checkSchema(partBodySchema), update)
taskRouter.delete('/:id', remove)

