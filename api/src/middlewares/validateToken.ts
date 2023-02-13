import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default function validateToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization as string
  const secret = process.env.JWT_SECRET as string;
  const data = verify(token,secret)
  req.body = {
    ...req.body,
    decriptedToken: data
  }
  next()
}
