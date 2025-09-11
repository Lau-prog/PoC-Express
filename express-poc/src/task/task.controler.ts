import type { Request, Response, NextFunction } from 'express'
import { Task } from './task.entity.js'
import { PrismaClient } from '@prisma/client'
import { body, validationResult } from 'express-validator'
import type { Schema } from 'express-validator'

const prisma = new PrismaClient()

const bodySchema: Schema = {
  title: {
    isString: {
      errorMessage: "Title must be a string",
    },
    isLength: {
      options: { min: 1 },
      errorMessage: "Title is required"
    }
  },
  description: {
    isString: {
      errorMessage: "Description must be a string",
    },
    isLength: {
      options: { min:1 },
      errorMessage: "Description is required"
    }
  },
  iduser: {
    isInt: {
      errorMessage: "idUser must be a number"
    },
    toInt: true,
    isLength: {
      options: { min:1 },
      errorMessage: "idUser is required"
    }
  }
}

const partBodySchema: Schema = {
  title: {
    isString: {
      errorMessage: "Title must be a string",
    },
    isLength: {
      options: { min: 1 },
      errorMessage: "Title is required"
    },
    optional: true
  },
  description: {
    isString: {
      errorMessage: "Description must be a string",
    },
    isLength: {
      options: { min:1 },
      errorMessage: "Description is required"
    },
    optional: true
  },
  iduser: {
    isInt: {
      errorMessage: "idUser must be a number"
    },
    toInt: true,
    isLength: {
      options: { min:1 },
      errorMessage: "idUser is required"
    },
    optional: true
  }
}

/*function sanitizeTaskInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    title: req.body.title,
    description: req.body.description,
    idUser: req.body.idUser,
  }
  //more checks here
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}
*/

async function findAll(req: Request, res: Response) {
  try {
    const tasks = await prisma.task.findMany()
    res.status(200).json({ message: 'found all tasks', data: tasks })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(req.params.id)
      },
      include: {
        user: true
      }
    })
    res.status(200).json({ message: 'found task', data: task })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await prisma.task.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        iduser: req.body.iduser
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

async function update(req: Request, res: Response) {
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

async function remove(req: Request, res: Response) {
  try {
    const task = await prisma.task.delete({
      where: {
        id: Number(req.params.id),
      }
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { bodySchema, partBodySchema, findAll, findOne, add, update, remove }