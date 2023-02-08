import { INTEGER, Model } from 'sequelize';
import db from '.';

class SaleProducts extends Model {
  declare saleId: number
  declare productId: number
  declare quantity: number
}

SaleProducts.init({
  saleId: {
    allowNull: false,
    type: INTEGER,
    primaryKey: true,
    field: 'sale_id'
  },
  productId: {
    allowNull: false,
    type: INTEGER,
    primaryKey: true,
    field: 'product_id'
  },
  quantity: {
    type: INTEGER
  }
}, {
  sequelize: db,
  modelName: 'SaleProducts',
  tableName: 'sale_products',
  underscored: true,
  timestamps: false,
})

// Sales.belongsToMany(Products, {
//   as: "products",
//   through: SaleProducts,
//   foreignKey: "saleId",
//   otherKey: "productId",
// });
// Products.belongsToMany(Sales, {
//   as: "sales",
//   through: SaleProducts,
//   foreignKey: "productId",
//   otherKey: "saleId",
// });

export default SaleProducts
