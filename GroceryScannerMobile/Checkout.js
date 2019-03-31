import React, { Component } from 'react';
import { View, Button,  Text, FlatList, TouchableHighlight } from 'react-native';
import stripe from 'tipsi-stripe';
import { doPayment } from './networking/Api.js'
stripe.setOptions({
  publishableKey: 'pk_test_RKmqFFP3lYqxiDYZiW4Mb3wd00KFTiJQGl',
});

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = { isPaymentPending: false};
  }
  requestPayment = () => {
    this.setState({ isPaymentPending: true });
    var cartData = this.props.navigation.getParam('cartData', -1);
    cartData = cartData.reduce( (total, item) => {
        return total + item.price * item.quantity;
    }, 0 ).toFixed(2);
    return stripe
      .paymentRequestWithCardForm()
      .then(stripeTokenInfo => {
        console.warn('Stripe token', { stripeTokenInfo });
        // return doPayment(cartData, stripeTokenInfo.tokenId);
      });
      // .then(() => {
      //   console.warn('Payment succeeded');
      // })
      // .catch(error => {
      //   console.warn('Payment failed', { error });
      // })
      // .finally(() => {
      //   this.setState({ isPaymentPending: false });
      // });
  };

  chooseCardHandler = (stripeTokenInfo) => {
    this.setState({ isPaymentPending: true });
    return stripe
    .then(stripeTokenInfo => {
      return doPayment(cartData, stripeTokenInfo.tokenId);
    })
    .then(() => {
      console.warn('Payment succeeded');
    })
    .catch(error => {
      console.warn('Payment failed', { error });
    })
    .finally(() => {
      this.setState({ isPaymentPending: false });
    });
  }

  render() {
    const { navigation } = this.props;
    var cartData = navigation.getParam('cartData', -1);
    cartData = cartData.reduce( (total, item) => {
        return total + item.price * item.quantity;
    }, 0 ).toFixed(2);
    const user = navigation.getParam('user', {});
    return (
      <View style={styles.container}>
        <Text>Total</Text>
        <Text>{cartData}</Text>
        <Text>Choose a card</Text>
        <FlatList
            data={user.cards}
            renderItem={
            ({item}) =>
              <TouchableHighlight onPress={() =>  chooseCardHandler(item)} underlayColor='lightgrey'>
                <View style={styles.item}>
                {/* <Image source={{uri: '#'}}/> */}
                <Text>{item.last4}</Text>
                <Text>{item.expirationDate}</Text>
                </View>
              </TouchableHighlight>
            }
        />
        <Button
          title="Add a credit card"
          onPress={this.requestPayment}
          disabled={this.state.isPaymentPending}
        />
        <Button
          title="Confirm Purchase"
          disabled={true}
        />
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
};
