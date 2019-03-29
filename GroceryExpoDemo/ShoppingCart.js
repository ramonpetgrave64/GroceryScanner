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
            flexBasis: '20%',
        },
        item_total: {
            textAlign: 'right',
            flexBasis: '30%',
        },
        cart_total: {
            textAlign: 'right',
            flexBasis: '30%',
            flexGrow: 1,
        }
    })

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
                renderItem={
                ({item}) =>
                    <View style={styles.item}>
                    {/* <Image source={{uri: '#'}}/> */}
                    <Text style={styles.item_name}>{item.name}</Text>
                    <Text style={styles.item_quantity}>{item.quantity}</Text>
                    <Text style={styles.item_total}>{(item.price * item.quantity).toFixed(2)}</Text>
                    </View>
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