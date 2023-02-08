import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const token = await this.authService.login(data);
    return res.status(200).json({ token });
  }

  async registerCustomer(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const token = await this.authService.registerCustomer(data);
    return res.status(201).json({ token });
  }
}
