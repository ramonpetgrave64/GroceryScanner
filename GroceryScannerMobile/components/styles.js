// ScannerMarket
//
import {Dimensions, View} from 'react-native';

const React = require('react-native');
const { StyleSheet } = React;

var { width,height } = Dimensions.get('window');
var lineHeight = height / 70;

const styles = StyleSheet.create({
  //const styles = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'column',
      marginTop: 35,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 35,
      //backgroundColor: '#a9a9a9'
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
      // height: 30,
      flex: 1,
      color: '#228b22',
    },

    input: {
      marginTop: 45,
      marginLeft: 15,
      width: 250,
      margin: 5,
      color: '#00008b',
      fontSize: 20,
      backgroundColor: '#eaedf2'
    },

    secondRow: {
      flex: 1,
      backgroundColor: '#119da4',
    },
    image1: {
      backgroundColor: 'white',
      marginLeft: 20,
      marginTop: 10,
      marginBottom: 10,
      opacity: 0.65,
    },
    image2: {
      width: 335,
      height: 300,
      marginTop: 80,
      marginLeft: 20,
      marginBottom: 20,
    },
    footer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    }

  });
export default styles;
