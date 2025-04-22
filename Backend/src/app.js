import express from 'express';
import passport from "../src/auth/passport.auth.js"
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());



app.use('/api/auth', authRoutes);

export default app;