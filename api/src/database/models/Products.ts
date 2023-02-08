import { DECIMAL, INTEGER, Model, STRING } from "sequelize";
import db from '.';

class Products extends Model {
  declare id: number
  declare name: string
  declare price: number
  declare urlImage: string
}

Products.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  name: {
    type: STRING(100)
  },
  price: {
    type: DECIMAL(4, 2)
  },
  urlImage: {
    type: STRING(200),
    field: 'url_image'
  }
}, {
  sequelize: db,
  modelName: 'Products',
  tableName: 'products',
  underscored: true,
  timestamps: false,
})

export default Products
