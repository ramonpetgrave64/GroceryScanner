import PropTypes from 'prop-types';
import React from 'react';
import {requireNativeComponent} from 'react-native';

class Camera extends React.Component {
  _onBarcodeDetect = (event) => {
    if (!this.props.onBarcodeDetect) {
      return;
    }
    this.props.onBarcodeDetect(event.nativeEvent);
  }
  render() {
    return (<JMCamera {...this.props} onBarcodeDetect={this._onBarcodeDetect}/>);
  }
}

Camera.propTypes = {
  onBarcodeDetect: PropTypes.func
};
var JMCamera = requireNativeComponent('RNCameraiOs', Camera);

module.exports = Camera;
