/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Button, SafeAreaView, View, Image, Modal, Text, TouchableHighlight, Alert} from 'react-native';
import Camera from './components/Camera.js';
import Checkout from './Checkout.js';
import ShoppingCart from './components/Cart.js';

const items =
{ chocolate: {name: 'Chocolate', icon: '#', price: 2.00, quantity: 1},
  yogurt: {name: 'Yogurt', icon: '#', price: 1.25, quantity: 1},
  pretzel: {name: 'Pretzel', icon: '#', price: 3.00, quantity: 1},
  chips: {name: 'Chips', icon: '#', price: 2.00, quantity: 1},
  juice: {name: 'Juice', icon: '#', price: 2.50, quantity: 1},
};

var groceryCount = 0;
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class JMButton extends Component<Props> {
  render() {
    return <Button
      title={this.props.name}
      color="white"
    />;
  }
}

const { height, width } = Dimensions.get('window');

export default class ScannerNoCamera extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      cart_data:
      [
         {key: '1', name: 'orange', icon: '#', price: 2.40, quantity: 11},
         {key: '2', name: 'apple', icon: '#', price: 2.40, quantity: 3},
         {key: '3', name: 'grape', icon: '#', price: 1.90, quantity: 5},
         {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '6', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '7', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '8', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '9', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '10', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '11', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '12', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '13', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '14', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '15', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '16', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '17', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '18', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '19', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '20', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '21', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '22', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '23', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '24', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '25', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '26', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '27', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '28', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '29', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '30', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '31', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '32', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '33', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '34', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '35', name: 'sushi', icon: '#', price: 9240, quantity: 4},
         {key: '36', name: 'apple', icon: '#', price: 22.40, quantity: 3},
         {key: '37', name: 'sushi', icon: '#', price: 9240, quantity: 4},
       ],
      preventCheckout: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Scanner",
      headerLeft: (
        <Button
          onPress={() => navigation.popToTop()}
          title="Log Out"
        />
      ),
      headerRight: (
        <Button
          onPress={() => navigation.navigate('Checkout', {
            cartData: navigation.getParam('cartData'),
            user: navigation.getParam('user'),
          })}
          title="Checkout"
          disabled={ navigation.getParam('preventCheckout') }
        />
      )
    };
  };
  checkoutButton = JMButton();
  onBarcodeDetect(event) {
    Alert.alert(
      'Scanned Successfully',
      'Product scanned',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
    var newCartData = this.state.cart_data;
    var itemsCopy = JSON.parse(JSON.stringify(items));
    var item = itemsCopy[event.barcodeString];
    const newKey = (newCartData.length + 1).toString();
    var willAppendItem = true;
    for (var i = 0; i < newCartData.length; i++) {
      const grocery = newCartData[i];
      if (grocery["name"] == item["name"]) {
        grocery["quantity"] += 1;
        willAppendItem = false;
        break;
      }
    }
    if(willAppendItem) {
      item["key"] = newKey.toString();
      newCartData.push(item);
    }
    this.setState(
      { cart_data: newCartData,
        preventCheckout: false
      }
    );
    this.props.navigation.setParams(
      { cartData: this.state.cart_data,
        preventCheckout: false
      }
    );
  }

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  cartUpdateHandler = (new_cart_data) => {
    this.setState({cart_data: new_cart_data});
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ShoppingCart
            cart_data={this.state.cart_data}
            onUpdate={this.cartUpdateHandler}
            onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible); } }
          />
        </Modal>
        <View style={styles.body}>
        </View>
        <View style={styles.image}>
          <Image
            style={{width: width, height: (2*height)/3}}
            source={{uri: 'https://static.thenounproject.com/png/658616-200.png'}}
          />
        </View>
        <View style={styles.footer}>
          <View style ={{margin: 8}}>
            <Button
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              title="Cart"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  componentDidMount() {
    this.props.navigation.setParams({
     cartData: this.state.cart_data,
     preventCheckout: this.state.preventCheckout
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#abcdef'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#696969',
  },
  body: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbbbbb'
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#f7f7f7',
    },
  image: {
    position: 'absolute',
    top: (height / 3) - 150,
    left: 0,
    width: 0,
    height: 0,
  }
});

// cart_data:
// [
//    {key: '1', name: 'orange', icon: '#', price: 2.40, quantity: 11},
//    {key: '2', name: 'apple', icon: '#', price: 2.40, quantity: 3},
//    {key: '3', name: 'grape', icon: '#', price: 1.90, quantity: 5},
//    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '6', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '7', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '8', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '9', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '10', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '11', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '12', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '13', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '14', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '15', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '16', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '17', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '18', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '19', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '20', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '21', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '22', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '23', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '24', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '25', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '26', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '27', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '28', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '29', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '30', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '31', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '32', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '33', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '34', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '35', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//    {key: '36', name: 'apple', icon: '#', price: 22.40, quantity: 3},
//    {key: '37', name: 'sushi', icon: '#', price: 9240, quantity: 4},
//  ]
