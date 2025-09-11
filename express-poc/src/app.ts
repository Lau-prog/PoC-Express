import express from 'express'
import { userRouter } from "./user/user.routes.js"
import { taskRouter } from "./task/task.routes.js"
import { loggerMiddleware } from './middleware/logger.middleware.js'

const app = express()

app.use(loggerMiddleware)

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/tasks', taskRouter)

app.listen(3000, () => {
  console.log('Servidor andando')
})
