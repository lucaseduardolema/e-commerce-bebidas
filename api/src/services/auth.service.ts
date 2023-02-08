import Joi = require('joi');
import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import User from '../database/models/User';
import ILogin from '../interfaces/ILogin';
import HttpExeption from '../utils/HttpExeption';
const md5 = require('md5');

export default class AuthService {
  private _userModel;

  constructor() {
    this._userModel = User;
  }

  public async login(data: ILogin) {
    this.validateDataLogin(data);

    const user = await this._userModel.findOne({
      where: { email: data.email },
    });

    if (!user) throw new HttpExeption(404, 'User not found');

    this.checkPassword(data.password, user.password);

    return this.generateToken({ id: user.id, email: user.email });
  }

  private validateDataLogin(data: ILogin) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(data);

    if (error) throw new HttpExeption(400, error.message);
  }

  private checkPassword(inputPasswor: string, dbPassword: string) {
    const newHash = md5(inputPasswor);

    if (newHash !== dbPassword)
      throw new HttpExeption(400, 'Incorrect Password');
  }

  private generateToken(data: object) {
    const secret = process.env.JWT_SECRET as string;
    return sign(data, secret, {
      expiresIn: '24h',
      algorithm: 'HS256',
    });
  }
}
