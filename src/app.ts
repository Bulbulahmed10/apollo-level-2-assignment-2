import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

//! parsers
app.use(express.json());
app.use(cors());

//! all routes
// user route
app.use('/api/users', UserRoutes);

// application test route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Application working successfully',
  });
});

export default app;
