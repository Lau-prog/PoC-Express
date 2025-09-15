import type { Request, Response, NextFunction } from 'express';
import { User } from './user.entity.js';
import { PrismaClient } from '@prisma/client';
import { body, validationResult, type Schema } from 'express-validator';

const prisma = new PrismaClient();

export const bodySchema: Schema = {
  email: {
    isEmail: {
      errorMessage: 'invalid format',
    },
  },
  name: {
    isString: {
      errorMessage: 'Name must be a string',
    },
    isLength: {
      options: { min: 1 },
      errorMessage: 'Name is required',
    },
  },
};

export const partBodySchema: Schema = {
  email: {
    isEmail: {
      errorMessage: 'invalid format',
    },
    optional: true,
  },
  name: {
    isString: {
      errorMessage: 'Name must be a string',
    },
    isLength: {
      options: { min: 1 },
      errorMessage: 'Name is required',
    },
    optional: true,
  },
};

export async function getAllUsers(req: Request, res: Response) {
  try {
    const user = await prisma.user.findMany();
    res.status(200).json({ message: 'found all users', data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOneUserById(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        tasks: true,
      },
    });
    res.status(200).json({ message: 'found user', data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
      },
    });

    return res.status(201).json({
      message: 'user created',
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userToUpdate = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body, // ✅ puede tener uno o varios campos
      include: { tasks: true },
    });

    return res.status(200).json({
      message: 'user updated',
      data: userToUpdate,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
