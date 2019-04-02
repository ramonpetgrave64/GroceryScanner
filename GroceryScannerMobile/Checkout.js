import React, { Component } from 'react';
import { Modal, Dimensions, View, Button,  Text, FlatList, TouchableHighlight } from 'react-native';
import stripe from 'tipsi-stripe';
import { doPayment } from './networking/Api.js'
import Receipt from './Receipt.js'
stripe.setOptions({
  publishableKey: 'pk_test_RKmqFFP3lYqxiDYZiW4Mb3wd00KFTiJQGl',
});

export default class Checkout extends Component<Props> {

  constructor(props) {
    super(props);
    this.cartData = this.props.navigation.getParam('cartData', -1);
    this.totalAmount = this.cartData.reduce( (total, item) => {
        return total + item.price * item.quantity;
    }, 0 ).toFixed(2);
    this.user = this.props.navigation.getParam('user', {});
    this.state = {
      modalVisible: false,
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
      card: stripeTokenInfo,
      cannotConfirmPurchase: false
    });
  };

  confirmPurchase = () => {
    // if (this.totalAmount == -1) { return; }
    // return doPayment(this.totalAmount, this.state.card)
    //   .then(() => {
    //     console.warn('Payment succeeded');
    //   })
    //   .catch(error => {
    //     console.warn('Payment failed', { error });
    //   })
    //   .finally(() => {
        this.props.navigation.navigate('Receipt', this.cartData);
      // });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Total</Text>
          <Text style={styles.price}>${this.totalAmount}</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.chooseCardField}>Choose a card</Text>
          <FlatList style={styles.list}
              data={this.user.cards}
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
            onPress={() => {this.props.navigation.navigate('MyModal');}}
            disabled={this.state.cannotConfirmPurchase}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <Receipt
            cart_data={this.state.cart_data}
            onRequestClose={() => {
            this.setModalVisible(false); } }
          />
        </Modal>
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
