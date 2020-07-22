import express, { Application } from 'express';
import dotenv from 'dotenv';
import Database from './database';
import usersRoute from './routes/users';
import dashboardRouter from './routes/dashboard';

dotenv.config();
const app: Application = express();
const db = new Database();

// Initialize connection to database.
db.connect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(`/api/users`, usersRoute);
app.use(`/dashboard`, dashboardRouter);

export default app;
