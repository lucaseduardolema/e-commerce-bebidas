import { NextFunction, Request, Response, Router } from 'express';
import IAuthService from '../interfaces/IAuthService';
import validateLoginBody from '../middlewares/validateLoginBody';
import validateRegisterBody from '../middlewares/validateRegisterBody';
import validateToken from '../middlewares/validateToken';
import AuthService from '../services/AuthService';
import AbstractController from './AbstractController';

export default class AuthController extends AbstractController<IAuthService> {
  constructor() {
    super(new AuthService());
  }

  private async login(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const token = await this.service.login(data);
    return res.status(200).json({ token });
  }

  private async registerCustomer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const data = req.body;
    const token = await this.service.registerCustomer(data);
    return res.status(201).json({ token });
  }

  private async userInfo(req: Request, res: Response, next: NextFunction) {
    const {email} = req.body.decriptedToken
    const info = await this.service.userInfo(email)
    return res.status(200).json(info)
  }

  public initRoutes(): Router {
    this.router
      .route('/login')
      .post(validateLoginBody, (req, res, next) => this.login(req, res, next));

    this.router
      .route('/register-costumer')
      .post(validateRegisterBody, (req, res, next) => this.registerCustomer(req, res, next));

    this.router.get('/user-info', validateToken, (req, res, next) => this.userInfo(req, res, next))

    return this.router;
  }
}
