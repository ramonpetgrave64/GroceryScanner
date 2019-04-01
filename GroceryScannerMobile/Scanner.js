/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Button, SafeAreaView, View, Image, Modal, Text, TouchableHighlight, Alert} from 'react-native';
import {NativeModules} from 'react-native';
import Camera from './components/Camera.js';
import Checkout from './Checkout.js';
import ShoppingCart from './components/Cart.js';
// import Home from './frontPage.js'
import {createStackNavigator, createAppContainer} from 'react-navigation';

// Camera.addEvent('Birthday Party', '4 Privet Drive, Surrey');

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

export default class Scanner extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      someString: "hello",
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
    };
  }
  static navigationOptions = ({ navigation }) => {
    const user = navigation.getParam('user',"")
    return {
      headerTitle: "Scanner",
      headerRight: (
        <Button
          onPress={() => navigation.navigate('Checkout', {
            cartData: navigation.state.params.cartData,
            user: user,
          })}
          title="Checkout"
          disabled={ false }
        />
      ),
    };
  };
  checkoutButton = JMButton();
  onBarcodeDetect(event) {
    this.setState(
      { someString: event.barcodeString }
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
        <Camera
        style={styles.body}
        onBarcodeDetect={this.onBarcodeDetect.bind(this)}
        />
        <View style={styles.footer}>
          <View style ={{margin: 8}}>
            <Button
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              title="Cart"
              color="white"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  componentDidMount() {
    this.props.navigation.setParams({
     cartData: this.state.cart_data,
     canCheckout: false
    })
  }
}

// const AppNavigator = createStackNavigator(
//   {
//     Home: App,
//     Details: SignIn
//   }
// );
// <Image
//   style={{width: 400, height: 400}}
//   source={{uri: 'https://static.thenounproject.com/png/658616-200.png'}}
// />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flex: 1,
    backgroundColor: '#aaa'
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
    backgroundColor: '#696969',
    },
});

// export default createAppContainer(AppNavigator);
