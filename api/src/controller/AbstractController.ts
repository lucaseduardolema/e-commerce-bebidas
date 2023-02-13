import { Router } from 'express';

export default abstract class AbstractController<S> {
  protected router: Router;
  protected service: S;

  constructor(service: S) {
    this.router = Router();
    this.service = service;
  }

  public abstract initRoutes(): Router;
}
