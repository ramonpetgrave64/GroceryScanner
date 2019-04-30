// ScannerMarket
//
import {Dimensions, View} from 'react-native';

const React = require('react-native');
const { StyleSheet } = React;

var { height } = Dimensions.get('window');
var lineHeight = height / 70;

const styles = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'column',
      fontFamily: 'Arial',
      marginTop: 10,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 35,
      borderWidth: 5,
      //backgroundColor: '#696969',
      borderColor: '#1F618D',
      shadowOffset: {
        width: 0,
        height: 3
      },
    },

    spinner: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },

    title: {
      alignSelf: 'center',
      fontSize: 20,
      fontWeight: 'bold'
    },

    line: {
      //height: 30,
      flex: 1,
      color: '#8b0000',
    },

    input: {
      marginTop: 8,
      marginLeft: 8,
      marginRight: 8,
      width: 340,
      margin: 5,
      fontSize: 20,
      height: 35,
      //backgroundColor: '#f1ffff',
      backgroundColor: 'transparent',
      //shadowColor: '#708090',
      borderColor: '#1F618D',
      borderWidth: 2
    },

    secondRow: {
      flex: 1,
      backgroundColor: '#119da4',
    },

    footer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    },

    SignBottom: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 36,
      color: '#808000'
    },

    frontButton: {
      flex: 1,
      fontSize: 35,
      fontFamily: "arial",
      color: '#000000'
    }

  });
export default styles;
