import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { carRoutes } from './app/modules/cars/car.route';
import { orderRoutes } from './app/modules/orders/order.route';
import { userRoutes } from './app/modules/User/user.route';
import { authRoutes } from './app/modules/Auth/auth.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import { adminRoutes } from './app/modules/Admin/admin.route';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: 'https://batch-4-assignment-4-car-shop-client.vercel.app',
    origin: [
      'http://localhost:5173',
      'http://192.168.68.55:5173',
      'https://batch-4-assignment-4-car-shop-client.vercel.app',
    ],
    credentials: true,
  }),
);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Car API');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
