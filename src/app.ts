import express, { Application } from 'express';
import compression from 'compression';
import passport from 'passport';
import dotenv from 'dotenv';

import Database from './database';
import usersRoute from './routes/users';
import dashboardRouter from './routes/dashboard';

// Passport config.
import initialize from './config/passport';

dotenv.config();
const app: Application = express();
const db: Database = new Database();

// Initialize connection to database.
db.connect();

// Initialize passport.
initialize(passport);

// Middleware
app.set(`PORT`, process.env.PORT || 4000);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use(`/api/users`, usersRoute);
app.use(`/dashboard`, dashboardRouter);

export default app;
