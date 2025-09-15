import type { Request, Response, NextFunction } from 'express';
import { Task } from './task.entity.js';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import type { Schema } from 'express-validator';

const prisma = new PrismaClient();

export const bodySchema: Schema = {
  title: {
    isString: {
      errorMessage: 'Title must be a string',
    },
    isLength: {
      options: { min: 1 },
      errorMessage: 'Title is required',
    },
  },
  description: {
    isString: {
      errorMessage: 'Description must be a string',
    },
    isLength: {
      options: { min: 1 },
      errorMessage: 'Description is required',
    },
  },
  iduser: {
    isInt: {
      errorMessage: 'idUser must be a number',
    },
    toInt: true,
    isLength: {
      options: { min: 1 },
      errorMessage: 'idUser is required',
    },
  },
};

export const partBodySchema: Schema = {
  title: {
    isString: {
      errorMessage: 'Title must be a string',
    },
    isLength: {
      options: { min: 1 },
      errorMessage: 'Title is required',
    },
    optional: true,
  },
  description: {
    isString: {
      errorMessage: 'Description must be a string',
    },
    isLength: {
      options: { min: 1 },
      errorMessage: 'Description is required',
    },
    optional: true,
  },
  iduser: {
    isInt: {
      errorMessage: 'idUser must be a number',
    },
    toInt: true,
    isLength: {
      options: { min: 1 },
      errorMessage: 'idUser is required',
    },
    optional: true,
  },
};

export async function getAllTasks(req: Request, res: Response) {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json({ message: 'found all tasks', data: tasks });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOneTaskById(req: Request, res: Response) {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        user: true,
      },
    });
    res.status(200).json({ message: 'found task', data: task });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createTask(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await prisma.task.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        iduser: req.body.iduser,
      },
    });

    return res.status(201).json({
      message: 'task created',
      data: task,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const taskToUpdate = await prisma.task.update({
      where: { id: Number(req.params.id) },
      data: req.body, // ✅ puede tener uno o varios campos
      include: { user: true },
    });

    return res.status(200).json({
      message: 'task updated',
      data: taskToUpdate,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const task = await prisma.task.delete({
      where: {
        id: Number(req.params.id),
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
