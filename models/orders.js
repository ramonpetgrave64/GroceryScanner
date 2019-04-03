const bcrypt = require('bcrypt-nodejs');


module.exports = (sequelize, DataTypes) => {
	const Orders = sequelize.define('Orders', {

		list_items: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    list_price: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    tax: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

		total_price : {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    
		
	});

  Orders.associate = (models) => {
    models.Orders.belongsTo(models.Credit_card);

    
  }


	return Orders;
}