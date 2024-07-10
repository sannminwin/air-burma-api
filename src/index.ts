import express from 'express';
import * as dotenv from "dotenv"
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import https from 'https';
import http from 'http';
import fs from 'fs';

import { userRouter } from './routes/userRouter';
import Logger from './services/Logger';

dotenv.config();
const logger = Logger.getInstance();
// Create Express server
const app = express(); // New express instance

// Express configuration
app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan('dev')); // Enable Morgan
app.use(express.json()) // Parse JSON bodies of incoming requests
app.use(express.urlencoded({extended : true})) //  Parse URL-encoded bodies of incoming requests.

app.use('/v1/', userRouter);
app.get('v1/', (req, res) => {
    res.send('Hello World');
    logger.info('GET / endpoint called');
})

export { app };
