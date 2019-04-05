// Example taken from `https://docs.expo.io/versions/latest/sdk/bar-code-scanner/`

import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class MyBarcodeScanner extends Component {
  state = {
    hasCameraPermission: null
  };

  constructor(props) {
      super(props);
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
    // Alert.alert(
    //   'Scan successful!',
    //   JSON.stringify(data)
    // );
    // This object contains a barcodeString property for use in BarCodeScanner.js:83
    const event_thing = {barcodeString: data.data}
    this.props.onBarcodeDetect(event_thing);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{ height: 200, width: 200 }}
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'stretch',
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#ecf0f1',
  }
});
