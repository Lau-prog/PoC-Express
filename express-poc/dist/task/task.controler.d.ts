import type { Request, Response } from 'express';
import type { Schema } from 'express-validator';
declare const bodySchema: Schema;
declare const partBodySchema: Schema;
declare function findAll(req: Request, res: Response): Promise<void>;
declare function findOne(req: Request, res: Response): Promise<void>;
declare function add(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function remove(req: Request, res: Response): Promise<void>;
export { bodySchema, partBodySchema, findAll, findOne, add, update, remove };
//# sourceMappingURL=task.controler.d.ts.map