import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

import ShoppingCart from './ShoppingCart'

export default class App extends Component {
  state = {
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
  }

  cartUpdateHandler = (new_cart_data) => {
    this.setState({cart_data: new_cart_data});
  }

  render() {
    return(
      <ShoppingCart cart_data={this.state.cart_data} onUpdate={this.cartUpdateHandler}/>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => App);