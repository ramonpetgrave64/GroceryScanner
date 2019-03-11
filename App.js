/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Button, Text, SafeAreaView, View, Image} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
      }, err => console.log(err));

  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style ={{margin: 8}}>
            <Button
              title="Back"
              color="white"
            />
          </View>
          <View style ={{margin: 8}}>
            <Button
              title="Coupons"
              color="white"
            />
          </View>
        </View>
        <View style={styles.body}>
          <Image
            style={{width: 400, height: 400}}
            source={{uri: 'https://static.thenounproject.com/png/658616-200.png'}}
          />
          <Text style={{fontSize: 20}}>Point camera at barcode to add to cart </Text>
        </View>
        <View style={styles.footer}>
          <View style ={{margin: 8}}>
            <Button
              title="Cart"
              color="white"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

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
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#696969',
    },
});
