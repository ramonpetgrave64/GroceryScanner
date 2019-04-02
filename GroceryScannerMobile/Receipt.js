import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class Receipt extends Component<Props> {
  render() {
    return(
      <View>
        <Text>Receipt</Text>
        <Button
          title="Start New Order"
          onPress={() => this.props.navigation.navigate('Scanner')}
        />
      </View>
    );
  }
}
