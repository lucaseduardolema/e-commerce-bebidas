import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare name: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  name: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'Users',
  tableName: 'users',
  underscored: true,
  timestamps: false,
});

// User.hasMany(Sales, {
//   as: 'sales',
//   foreignKey: 'user_id',
// })

// User.hasMany(Sales, {
//   as: 'sales',
//   foreignKey: 'seller_id',
// });

export default User;
