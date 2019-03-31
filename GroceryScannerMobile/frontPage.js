// ScannerMarket
//
import styles from './components/styles';
import React, { Component } from 'react';
import {
      AppRegistry,
      Platform,
      StyleSheet,
      Text,
      View,
      Alert,
      Image
      } from 'react-native';

export default class Home extends Component<{}> {
  render(){
    return (
      //< Menu/>
      <View style={ styles.container }>
          <Image source={require('./assets/images/menuIcon.png')} style={styles.image1} />
        <View style={{}}>
          <Image source={require('./assets/images/image1.jpg')} style={styles.image2}/>
        </View>
        <View style={{}}>
          <Text>  160 Convent Avenue {"\n"}  New York, New York</Text>
        </View>
      </View>
    );
  }
}
