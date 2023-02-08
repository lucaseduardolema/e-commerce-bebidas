import { NextFunction, Request, Response } from 'express';
import HttpExeption from '../utils/HttpExeption';

export default function handleError(
  error: HttpExeption,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || 'Internal Error';
  return res.status(status).json({ message });
}
