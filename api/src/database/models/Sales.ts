import { DATE, DECIMAL, INTEGER, literal, Model, STRING } from 'sequelize';
import db from '.';
import SaleProducts from './SaleProducts';

class Sales extends Model {
  declare userId: number;
  declare sellerId: number;
  declare totalPrice: number;
  declare deliveryAddress: string;
  declare deliveryNumber: string;
  declare saleDate: Date
  declare status: string
}

Sales.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  userId: {
    type: INTEGER,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  sellerId: {
    type: INTEGER,
    field: 'seller_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  totalPrice: {
    type: DECIMAL(9,2),
    field: 'total_price'
  },
  deliveryAddress: {
    type: STRING(100),
    field: 'delivery_address'
  },
  deliveryNumber: {
    type: STRING(50),
    field: 'delivery_number'
  },
  saleDate: {
    type: DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    field: 'sale_date',
  },
  status: {
    type: STRING(50)
  },
}, {
  sequelize: db,
  modelName: 'Sales',
  tableName: 'sales',
  underscored: true,
  timestamps: false,
});

Sales.hasMany(SaleProducts, {
  as: "salesProducts",
  foreignKey: "saleId",
});

export default Sales;
