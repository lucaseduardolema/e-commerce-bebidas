import { NextFunction, Request, Response } from 'express';
import HttpExeption from '../utils/HttpExeption';
import Joi = require('joi');

export default function validateLoginBody(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const login = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(login);

  if (error) throw new HttpExeption(400, error.message);

  next();
}
