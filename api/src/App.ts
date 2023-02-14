import * as cors from 'cors';
import * as express from 'express';
import 'express-async-errors';
import AuthController from './controller/AuthController';
import ProductsController from './controller/ProductsController';
import UserController from './controller/UserController';
import handleError from './middlewares/handelError';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.initRoutes();
    this.initMiddlewares();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH'
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.static('./public'));
  }

  private initRoutes(): void {
    this.app.get('/coffee', (_req, res) => res.status(418).end());
    this.app.use(new AuthController().initRoutes());
    this.app.use(new ProductsController().initRoutes())
    this.app.use(new UserController().initRoutes())
  }

  private initMiddlewares(): void {
    this.app.use(handleError);
  }
}

export default new App().app;
