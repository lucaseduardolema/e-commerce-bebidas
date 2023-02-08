import { Router } from 'express';
import AuthController from '../controller/auth.controller';

export default class AuthRoutes {
  private authController: AuthController;
  private authRoutes: Router;

  constructor() {
    this.authController = new AuthController();
    this.authRoutes = Router();

    this.main();
  }

  private main() {
    this.authRoutes
      .route('/login')
      .post((req, res, next) => this.authController.login(req, res, next));
  }

  public getAuthRouter() {
    return this.authRoutes
  }
}
