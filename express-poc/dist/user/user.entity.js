import { Task } from '../task/task.entity.js';
export class User {
    email;
    name;
    tasks;
    id;
    constructor(email, name, tasks, id) {
        this.email = email;
        this.name = name;
        this.tasks = tasks;
        this.id = id;
    }
}
//# sourceMappingURL=user.entity.js.map