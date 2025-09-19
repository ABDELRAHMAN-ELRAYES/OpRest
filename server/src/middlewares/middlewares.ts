import express from 'express';
import cookieParser from 'cookie-parser';
import config from '../config/config';
import cors from 'cors';

// middlewares for parsing the request body
export const bodyParser = express.json();
// Middleware for parsing cookies from browser
export const cookieParserMiddleware = cookieParser();

// Middleware to verify cross origin requests
export const corsMiddleware = cors({
  origin: config.webURL,
  credentials: true,
});


