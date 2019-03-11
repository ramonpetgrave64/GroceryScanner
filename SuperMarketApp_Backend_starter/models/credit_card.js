
const bcrypt = require('bcrypt-nodejs');


module.exports = (sequelize, DataTypes) => {
	const Credit_card = sequelize.define('Credit_card', {

    username : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
      },
    },
		number : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
	});

  

	return Credit_card;
}