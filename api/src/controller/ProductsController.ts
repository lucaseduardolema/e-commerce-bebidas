import { NextFunction, Request, Response, Router } from 'express';
import IProductsService from '../interfaces/IProductsService';
import validateToken from '../middlewares/validateToken';
import ProductsService from '../services/ProductsService';
import AbstractController from './AbstractController';

export default class ProductsController extends AbstractController<IProductsService> {
  constructor() {
    super(new ProductsService());
  }

  private async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const products = await this.service.getAllProducts();
    return res.status(200).json(products);
  }

  public initRoutes(): Router {
    this.router.get('/get-products', validateToken, (req, res, next) =>
      this.getAllProducts(req, res, next)
    );

    return this.router;
  }
}
