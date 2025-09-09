import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger } from './middleware/logger';
import registerRoutes from './routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

registerRoutes(app);

// error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
