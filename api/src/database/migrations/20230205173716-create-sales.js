/* eslint-disable max-lines-per-function */
'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      sellerId: {
        type: Sequelize.INTEGER,
        field: 'seller_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        field: 'total_price'
      },
      deliveryAddress: {
        type: Sequelize.STRING(100),
        field: 'delivery_address'
      },
      deliveryNumber: {
        type: Sequelize.STRING(50),
        field: 'delivery_number'
      },
      saleDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'sale_date'
      },
      status: {
        type: Sequelize.STRING(50)
      }
    })
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales')
  }
}
