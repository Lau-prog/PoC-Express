import { Task } from '../task/task.entity.js'

export class User {
  constructor(
    public email: string,
    public name: string,
    public tasks: Task[],
    public id?: number,
  ) {}
}