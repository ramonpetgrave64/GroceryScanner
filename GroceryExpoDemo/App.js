import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
  cart_data = [
    {key: '1', name: 'orange', icon: '#', price: 2.40, quantity: 11},
    {key: '2', name: 'apple', icon: '#', price: 2.40, quantity: 3},
    {key: '3', name: 'grape', icon: '#', price: 1.90, quantity: 5},
    {key: '4', name: 'apple', icon: '#', price: 22.40, quantity: 3},
    {key: '5', name: 'sushi', icon: '#', price: 9240, quantity: 4}
  ]

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.cart_data}
          renderItem={
            ({item}) =>
              <View style={styles.item}>
                {/* <Image source={{uri: '#'}}/> */}
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
                <Text>{item.quantity}</Text>
              </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => App);