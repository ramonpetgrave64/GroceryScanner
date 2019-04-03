
const bcrypt = require('bcrypt-nodejs');


module.exports = (sequelize, DataTypes) => {
	const Credit_card = sequelize.define('Credit_card', {

		number : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
	});

Credit_card.associate = (models) => {
    models.Credit_card.belongsTo(models.Users);
    models.Credit_card.hasMany(models.Orders);
    
  }
  

	return Credit_card;
}