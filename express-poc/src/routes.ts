// src/routes.ts
import { Express } from 'express';
import UsersService from './modules/users/users.service';
import usersRouter from './modules/users/users.router';
import prisma from './config/db';
import tasksRouter from './modules/tasks/tasks.router.js';
import TasksService from;
import helloRouter ;
import HelloService;


export default function registerRoutes(app: Express) {
  const usersService = new UsersService(prisma);
  app.use('/users', usersRouter(usersService));

  const tasksService = new TasksService(prisma);
  app.use('/tasks', tasksRouter(tasksService));

  // tasksRouter: misma idea
  const helloService = new HelloService(prisma);
  app.use('/hello', helloRouter(helloService));
  // helloRouter: misma idea
}
