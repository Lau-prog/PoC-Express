import { User } from './user.entity.js';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
const prisma = new PrismaClient();
const bodySchema = {
    email: {
        isEmail: {
            errorMessage: "invalid format",
        },
    },
    name: {
        isString: {
            errorMessage: "Name must be a string",
        },
        isLength: {
            options: { min: 1 },
            errorMessage: "Name is required"
        }
    }
};
const partBodySchema = {
    email: {
        isEmail: {
            errorMessage: "invalid format",
        },
        optional: true
    },
    name: {
        isString: {
            errorMessage: "Name must be a string",
        },
        isLength: {
            options: { min: 1 },
            errorMessage: "Name is required"
        },
        optional: true
    }
};
/*function sanitizeUserInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    email: req.body.email,
    name: req.body.name,
    tasks: req.body.tasks,
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
async function findAll(req, res) {
    try {
        const user = await prisma.user.findMany();
        res.status(200).json({ message: 'found all users', data: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                tasks: true
            }
        });
        res.status(200).json({ message: 'found user', data: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
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
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
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
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(req.params.id),
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { bodySchema, partBodySchema, findAll, findOne, add, update, remove };
//# sourceMappingURL=user.controler.js.map