import { Router } from 'express';
import {
  bodySchema,
  partBodySchema,
  getAllTasks,
  getOneTaskById,
  createTask,
  updateTask,
  deleteTask,
  validacionEstado,
  completeTask,
} from './task.controller.js';
import { checkSchema } from 'express-validator';

export const taskRouter: Router = Router();

taskRouter.get('/', getAllTasks);
taskRouter.get('/:id', getOneTaskById);
taskRouter.post('/', checkSchema(bodySchema), createTask);
taskRouter.put('/:id', checkSchema(bodySchema), updateTask);
taskRouter.patch('/:id/complete', completeTask);
taskRouter.patch('/:id', checkSchema(partBodySchema), validacionEstado ,updateTask);
taskRouter.delete('/:id', deleteTask);
