import React, { Component } from 'react';
import { Dimensions, View, Button,  Text, FlatList, TouchableHighlight } from 'react-native';
import stripe from 'tipsi-stripe';
import { doPayment } from './networking/Api.js'

stripe.setOptions({
  publishableKey: 'pk_test_RKmqFFP3lYqxiDYZiW4Mb3wd00KFTiJQGl',
});

export default class Checkout extends Component {

  var cartData = {};
  var totalAmount = -1;
  var user = {};

  constructor() {
    super();
    cartData = this.props.navigation.getParam('cartData', -1);
    totalAmount = cartData.reduce( (total, item) => {
        return total + item.price * item.quantity;
    }, 0 ).toFixed(2);
    user = this.props.navigation.getParam('user', {});
    this.state = {
      card: {},
      isPaymentPending: false,
      cannotConfirmPurchase: true
    };
  }
  
  createCardToken = () => {
    this.setState({ isPaymentPending: true });
    return stripe
      .paymentRequestWithCardForm()
      .then(stripeTokenInfo => {
        console.warn('Stripe token', { stripeTokenInfo });
        this.setState({
          isPaymentPending: false,
          cannotConfirmPurchase: false,
          card: stripeTokenInfo
        });
      });
  };

  chooseCardHandler = (stripeTokenInfo) => {
    console.warn('called', { stripeTokenInfo });
    // return doPayment(cartData, stripeTokenInfo.tokenId);
    this.setState({
      card: stripTokenInfo,
      cannotConfirmPurchase: false
    });
  };

  confirmPurchase = () => {
    if (totalAmount == -1) { return; }
    return doPayment(totalAmount, this.state.card)
      .then(() => {
        console.warn('Payment succeeded');
      })
      .catch(error => {
        console.warn('Payment failed', { error });
      })
      .finally(() => {
        this.props.navigation.navigate('Receipt', cartData);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Total</Text>
          <Text style={styles.price}>${totalAmount}</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.chooseCardField}>Choose a card</Text>
          <FlatList style={styles.list}
              data={user.cards}
              renderItem={
              ({item}) =>
                <TouchableHighlight onPress={() =>  this.chooseCardHandler(item)} underlayColor='lightgrey'>
                  <View style={styles.item}>
                  {/* <Image source={{uri: '#'}}/> */}
                  <Text>Card ending in ...{item.last4}</Text>
                  <Text>{item.expirationDate}</Text>
                  </View>
                </TouchableHighlight>
              }
          />
          <Button
            title="Add a credit card"
            onPress={this.createCardToken}
            disabled={this.state.isPaymentPending}
          />
        </View>
        <View style={styles.footer}>
          <Button
            title="Confirm Purchase"
            onPress={this.}
            disabled={this.state.cannotConfirmPurchase}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between'
  },
  header: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  list: {
    alighItems: 'flex-start',
    flexDirection: 'column',
    borderStyle: 'solid'
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'column',
  },

  chooseCardField: {
    fontSize: 18
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    flexDirection: 'row',
    borderRadius: 0,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    justifyContent: 'space-between',
  },
};
