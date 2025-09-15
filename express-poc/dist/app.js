import express from 'express';
import { userRouter } from './modules/users/user.routes.js';
import { taskRouter } from './modules/tasks/task.routes.js';
import { loggerMiddleware } from './middleware/logger.middleware.js';
const app = express();
app.use(loggerMiddleware);
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);
app.listen(4000, () => {
    console.log(`Servidor corriendo en http://localhost:4000`);
});
console.log('DATABASE_URL:', process.env.DATABASE_URL);
//# sourceMappingURL=app.js.map