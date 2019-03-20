
const bcrypt = require('bcrypt-nodejs');


module.exports = (sequelize, DataTypes) => {
	const Barcode = sequelize.define('Barcode', {

Barcodeid : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },

  });

Barcode.associate = (models) => {
    models.Barcode.belongsTo(models.Products, {foreignKey: {allowNull: false}});
    
  }

  return Barcode;
}