import { NextFunction, Request, Response, Router } from 'express';
import IUserService from "../interfaces/IUserService";
import validateToken from '../middlewares/validateToken';
import UserService from '../services/UserService';
import AbstractController from "./AbstractController";

export default class UserController extends AbstractController<IUserService> {
  constructor() {
    super(new UserService())
  }

  private async userInfo(req: Request, res: Response, next: NextFunction) {
    const {email} = req.body.decriptedToken
    const info = await this.service.userInfo(email)
    return res.status(200).json(info)
  }

  private async getSellersInfo(req: Request, res: Response, next: NextFunction) {
    const sellers = await this.service.getSellersInfo()
    return res.status(200).json(sellers)
  }

  public initRoutes(): Router {
    this.router.get('/user-info', validateToken, (req, res, next) => this.userInfo(req, res, next))
    this.router.get('/get-sellers-info', (req, res, next) => this.getSellersInfo(req, res, next))

    return this.router;
  }
}
