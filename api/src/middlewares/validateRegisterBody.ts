import { NextFunction, Request, Response } from 'express';
import HttpExeption from '../utils/HttpExeption';
import Joi = require('joi');

export default function validateRegisterBody(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const register = req.body;

  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(register);

  if (error) throw new HttpExeption(400, error.message);

  next();
}
