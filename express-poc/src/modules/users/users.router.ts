// src/modules/users/users.router.ts
import { Router, Request, Response } from 'express';
import UsersService from './users.service';

export default function usersRouter(service: UsersService) {
  const router = Router();

  router.get('/', async (_req: Request, res: Response) => {
    const users = await service.findAll();
    res.json(users);
  });

  router.post('/', async (req: Request, res: Response) => {
    const created = await service.create(req.body);
    res.status(201).json(created);
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const user = await service.findOne(Number(req.params.id));
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  });

  return router;
}

