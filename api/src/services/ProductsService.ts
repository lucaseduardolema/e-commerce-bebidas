import Products from '../database/models/Products';
import IProduct from '../interfaces/IProduct';
import AbstractService from './AbstractService';

export default class ProductsService extends AbstractService {
  constructor() {
    super(Products);
  }

  public async getAllProducts(): Promise<IProduct[]> {
    const products = await this._model.findAll();
    return products;
  }
}
