import * as cors from 'cors'
import * as express from 'express'
import 'express-async-errors'
import sequelize from './database/models'

export default class App {
  private app: express.Express

  constructor() {
    this.app = express()
    this.config()

    this.app.get('/coffee', (_req, res) => res.status(418).end());
  }

  private config(): void {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(express.static('./public'));
  }

  public start(port: string | number): void {
    this.app.listen(port, () => console.log(`App running on ${port}`));

    (async () => {
      try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
      } catch (error) {
        console.error('Unable to connect to the database:', error)
      }
    })()
  }
}
