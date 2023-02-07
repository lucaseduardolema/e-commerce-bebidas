// import { Sequelize } from 'sequelize'
// import config from '../config'

// const sequelize = new Sequelize(config)

// async function dbConnectionTest () {
//   try {
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully.')
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }

// dbConnectionTest()

// export default sequelize

import { Sequelize } from 'sequelize';
import * as config from '../config/';

const sequelize = new Sequelize(config);

export default sequelize;
