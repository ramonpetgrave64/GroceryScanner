import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

const ShoppingCart = (props) => {
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

    return (
        <View style={styles.container}>
          <FlatList
            data={props.cart_data}
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

export default ShoppingCart;