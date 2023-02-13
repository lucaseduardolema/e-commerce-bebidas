import IProduct from './IProduct';

export default interface IProductsService {
  getAllProducts(): Promise<IProduct[]>;
}
