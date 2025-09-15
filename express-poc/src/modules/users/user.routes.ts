import { Router } from 'express';
import {
  bodySchema,
  partBodySchema,
  getAllUsers,
  getOneUserById,
  createUser,
  updateUser,
  deleteUser,
} from './user.controller.js';
import { checkSchema } from 'express-validator';

export const userRouter: Router = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getOneUserById);
userRouter.post('/', checkSchema(bodySchema), createUser);
userRouter.put('/:id', checkSchema(bodySchema), updateUser);
userRouter.patch('/:id', checkSchema(partBodySchema), updateUser);
userRouter.delete('/:id', deleteUser);
