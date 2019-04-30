const express = require('express');
const models = require('../models');
const passport = require('../middlewares/authentication');

const router = express.Router();

function getSpaceNeeded(maxChar, rightString, leftString){
	return maxChar - (rightString.length + leftString.length)
}

function addSpace(numOfSpaces){
	let spaces = ""
	for(let i = 0; i < numOfSpaces; i++){
		spaces += " ";
	}
	return spaces;
}

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	models.Orders.findAll({
		where:{
			UserId: req.user.id
		}
	})
	.then((orders) => {
		res.status(200).send(orders);
	})
	.catch(() => {
		res.status(500).send('Failed to get orders');
	})
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) =>{
	let cartdata = req.body.cartdata;
	let cartdataProduct = [];
	for(let i = 0; i < cartdata.length; i++){
		cartdataProduct.push(cartdata[i].name);
	}
	let cartdataPrice = [];
	for(let i = 0; i < cartdata.length; i++){
		cartdataPrice.push(cartdata[i].price);
	}
	let tax = 0.08875;
	let totalPrice = cartdataPrice.reduce((total, prodPrice) => Math.round((total + prodPrice) * 100) / 100);
	let totalPriceWTaxes = Math.round((totalPrice * (1 + tax))*100)/100;

	
	models.Orders.create({
		list_items: cartdataProduct,
		list_price: cartdataPrice,
		tax: tax,
		total_price: totalPriceWTaxes,
		CreditCardId: req.body.creditId,
		UserId: req.user.id
	}).then((order) => {
		let receipt = "Description: " + addSpace(getSpaceNeeded(100, "Description: ", "Price: ")) + "Price: \n";
		let totalPrice = order.list_price.reduce((total, prodPrice) => Math.round((total + prodPrice) * 100) / 100);
		for(let i = 0; i < order.list_items.length; i++){
			receipt += order.list_items[i]+ addSpace(getSpaceNeeded(100, order.list_items[i], order.list_price[i].toString()))    + order.list_price[i] + "\n";
		}
		receipt += "Total "+ addSpace(getSpaceNeeded(100, "Total ", totalPrice.toString())) + totalPrice + "\n";
		receipt += "Total with taxes "+ addSpace(getSpaceNeeded(100, "Total with taxes ", order.total_price.toString())) + totalPriceWTaxes + "\n";
		res.status(200).send(receipt);	
	})
	.catch((err) =>{
		res.status(500).send(err);
	})
	


});

module.exports = router;