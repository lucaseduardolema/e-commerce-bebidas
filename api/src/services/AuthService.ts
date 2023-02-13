import Joi = require('joi');
import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import User from '../database/models/User';
import IAuthService from '../interfaces/IAuthService';
import ILogin from '../interfaces/ILogin';
import IRegister from '../interfaces/IRegister';
import HttpExeption from '../utils/HttpExeption';
const md5 = require('md5');

export default class AuthService implements IAuthService {
  private _userModel;

  constructor() {
    this._userModel = User;
  }

  public async login(data: ILogin): Promise<string> {
    const user = await this._userModel.findOne({
      where: { email: data.email },
    });

    if (!user) throw new HttpExeption(404, 'Usuário não encontrado');

    this.checkPassword(data.password, user.password);

    return this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  public async registerCustomer(data: IRegister): Promise<string> {

    const user = await this._userModel.findOne({
      where: { email: data.email },
    });

    if (user) throw new HttpExeption(409, 'Usuário já cadastrado');

    const hash = md5(data.password);

    const newUser = await this._userModel.create({
      ...data,
      password: hash,
      role: 'customer',
    });

    return this.generateToken({
      id: newUser.id,
      email: data.email,
      role: newUser.role,
    });
  }

  private checkPassword(inputPasswor: string, dbPassword: string) {
    const newHash = md5(inputPasswor);

    if (newHash !== dbPassword) throw new HttpExeption(400, 'Senha Incorreta');
  }

  private generateToken(data: object) {
    const secret = process.env.JWT_SECRET as string;
    return sign(data, secret, {
      expiresIn: '24h',
      algorithm: 'HS256',
    });
  }
}
