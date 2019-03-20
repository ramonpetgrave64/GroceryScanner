const bcrypt = require('bcrypt-nodejs');


module.exports = (sequelize, DataTypes) => {
	const Products = sequelize.define('Products', {

		productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
		price_per_unit : {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    	Scannable : {
    		type: DataTypes.BOOLEAN,
    		allowNull:false,
    		validate: {
    		  notEmpty: true,
    		},
    	},
    		});

Products.associate = (models) => {
    models.Products.hasOne(models.Barcode);
    models.Products.hasMany(models.Shopping_cart)
    
  }
  

	return Products;
}