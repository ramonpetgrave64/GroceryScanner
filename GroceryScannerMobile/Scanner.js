/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Button, SafeAreaView, View, Image, Modal, Text, TouchableHighlight, Alert} from 'react-native';
import {NativeModules} from 'react-native';
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

export default class Scanner extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      cart_data: [],
      preventCheckout: true
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
    this.fetchProduct(event.barcodeString);
    // Alert.alert(
    //   'Scanned Successfully',
    //   'Product scanned',
    //   [
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ],
    //   {cancelable: false},
    // );
    // var newCartData = this.state.cart_data;
    // var itemsCopy = JSON.parse(JSON.stringify(items));
    // var item = itemsCopy[event.barcodeString];
    // const newKey = (newCartData.length + 1).toString();
    // var willAppendItem = true;
    // for (var i = 0; i < newCartData.length; i++) {
    //   const grocery = newCartData[i];
    //   if (grocery["name"] == item["name"]) {
    //     grocery["quantity"] += 1;
    //     willAppendItem = false;
    //     break;
    //   }
    // }
    // if(willAppendItem) {
    //   item["key"] = newKey.toString();
    //   newCartData.push(item);
    // }
    // this.setState(
    //   { cart_data: newCartData,
    //     preventCheckout: false
    //   }
    // );
    // this.props.navigation.setParams(
    //   { cartData: this.state.cart_data,
    //     preventCheckout: false
    //   }
    // );
  }

  fetchProduct(barcodeString) {
    const url = 'https://superdupermarketscanner.herokuapp.com/api/products/'+barcodeString;
    const user = this.props.navigation.getParam('user');
    fetch(url, {
      method: 'GET', // or 'PUT'
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }
    }).then(res => res.json())
    .then(response => {
      const scannedItem = response["Product"];
        if(scannedItem == null) {
          Alert.alert("Product not recognized")
        }
        else {
          Alert.alert(
            'Scanned Successfully',
            'Product scanned',
            [
              {text: 'OK'},
            ],
            {cancelable: false},
          );
        }

        // Simpler code here
        // const new_cart_data = [...this.state.cart_data]
        // const targetItem = newCartData.filter(item => item.productName == scannedItem.productName)[0];
        // if (targetItem) {
        //   targetItem.quantity += 1;
        // } else {
        //   new_item = {
        //     productName: scannedItem.productName,
        //     key: (newCartData.length + 1).toString(),
        //     quantity: 1,
        //     price: scannedItem.price_per_unit
        //   }
        //   new_cart_data.push(new_item);
        // }

        var newCartData = this.state.cart_data;
        const newKey = (newCartData.length + 1).toString();
        var willAppendItem = true;
        for (var i = 0; i < newCartData.length; i++) {
          const grocery = newCartData[i];
          if (grocery["productName"] == scannedItem["productName"]) {
            grocery["quantity"] += 1;
            willAppendItem = false;
            break;
          }
        }
        if(willAppendItem) {
          const newGrocery = {
            productName: scannedItem["productName"],
            key: newKey.toString(),
            quantity: 1,
            price: +(scannedItem["price_per_unit"])
          };
          newCartData.push(newGrocery);
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
    })
    .catch(error => {
      Alert.alert("An error occured when scanning");
    });
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
          <Camera
            style={styles.camera}
            onBarcodeDetect={this.onBarcodeDetect.bind(this)}
          />
          <Image
            style={[styles.image,{width: width, height: (2*height)/3}]}
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
    this.state = {
      modalVisible: false,
      cart_data: [],
      preventCheckout: true
    };

    this.props.navigation.setParams({
     cartData: this.state.cart_data,
     preventCheckout: this.state.preventCheckout
    })
  }
}

// <Image
//   style={[styles.image,{width: width, height: (2*height)/3}]}
//   source={{uri: 'https://static.thenounproject.com/png/658616-200.png'}}
// />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
    backgroundColor: '#bbbbbb',
    borderWidth: 5
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#f7f7f7',
    },
  camera: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
