import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

import ShoppingCart from './ShoppingCart'

export default class App extends Component {
  cart_data = [
    {key: '1', name: 'orange', icon: '#', price: 2.40, quantity: 11},
    {key: '2', name: 'apple', icon: '#', price: 2.40, quantity: 3},
    {key: '3', name: 'grape', icon: '#', price: 1.90, quantity: 5},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4},
  ]

  render() {
    return(
      <ShoppingCart cart_data={this.cart_data} />
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => App);