import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import tasksRoutes from './routes/tasks.routes';

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (_, res) => res.send('Tasks POC - Express + TS'));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});