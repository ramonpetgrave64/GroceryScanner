import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Button } from 'react-native';

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
          borderRadius: 0,
          borderWidth: 0.5,
          borderColor: '#d6d7da',
          justifyContent: 'space-between',
        }, 
        item_name: {
            flexBasis: '50%',
        },
        item_quantity: {
            textAlign: 'right',
            flexBasis: '30%',
            display: 'flex',
            flexDirection:'row',
            justifyContent: 'space-between',
            // borderRadius: 4,
            // borderWidth: 0.5,
            // borderColor: '#d6d7da',
        },
        item_total: {
            textAlign: 'right',
            flexBasis: '20%',
        },
        cart_total: {
            textAlign: 'right',
            flexBasis: '30%',
            flexGrow: 1,
        },
        // incrementButton: {

        // }
    })

    cartItemTapHandler = (targetItem) => {
        const targetIndex = props.cart_data.findIndex(item => item.key === targetItem.key);
        const new_cart_data = [...props.cart_data]
        new_cart_data.splice(targetIndex, 1);
        // add delay the update, so that the TouchableHighlight has time to do its animation
        setTimeout(() => {
            props.onUpdate(new_cart_data);
        }, 100);
        // props.onUpdate(new_cart_data);
    }

    cartItemIncrementHandler = (targetItem, increment) => {
        const targetIndex = props.cart_data.findIndex(item => item.key === targetItem.key);
        const new_cart_data = [...props.cart_data];
        new_cart_data[targetIndex].quantity += increment;
        if(new_cart_data[targetIndex].quantity < 0) {
            new_cart_data[targetIndex].quantity = 0;
        }
        props.onUpdate(new_cart_data);
    }

    return (
        <View style={styles.container}>
            {/* Cart Heading */}
            <View style={styles.item}> 
                <Text style={styles.item_name}>Item Name</Text>
                <Text style={styles.item_quantity}>Quantity</Text>
                <Text style={styles.item_total}>Total Price</Text>
            </View>
            {/* Cart Contents */}
            <FlatList
                data={props.cart_data}
                renderItem={ ({item}) =>
                    // <TouchableHighlight onPress={() => cartItemTapHandler(item)} underlayColor='lightgrey'>
                        <View style={styles.item}>
                            {/* <Image source={{uri: '#'}}/> */}
                            <Text style={styles.item_name}>{item.name}</Text>
                            {/* Item Quatity */}
                            <View style={styles.item_quantity}>
                                <Button title='-' color={'#ff4d4d'}  onPress={() => cartItemIncrementHandler(item, -1)} />
                                <Text>{item.quantity}</Text>
                                <Button title='+' color={'#3366ff'} onPress={() => cartItemIncrementHandler(item, +1)} />
                            </View>
                            <Text style={styles.item_total}>{(item.price * item.quantity).toFixed(2)}</Text>
                        </View>
                    // </TouchableHighlight>
                }
            />
            {/* Cart Total */}
            <View style={styles.item}>
                <Text style={styles.cart_total}>Cart Total:</Text>
                <Text style={styles.item_total}>
                    {
                        props.cart_data.reduce( (total, item) => {
                            return total + item.price * item.quantity;
                        }, 0 ).toFixed(2)
                    }
                </Text>
            </View>
        </View>
    );
}

export default ShoppingCart;