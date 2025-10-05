import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from './config/passport.js';
import authRoutes from './routes/auth.js';
import groupRoutes from './routes/groups.js';
import accountRoutes from './routes/account.js';
import eventRoutes from './routes/event.js'

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
}));

app.use(express.json());
app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/api', groupRoutes);
app.use('/api/account', accountRoutes);
app.use('/api', eventRoutes);
app.get('/api/warmup', (req, res) => {res.status(200).send('OK');});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));