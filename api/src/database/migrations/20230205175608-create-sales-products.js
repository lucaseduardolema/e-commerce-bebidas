'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'sale_id'
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'product_id'
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    })
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products')
  }
}
