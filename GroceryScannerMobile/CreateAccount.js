// ScannerMarket
//
import {
  TextInput,
  StyleSheet,
  Button,
  View,
  ScrollView
} from 'react-native';
import styles from './components/styles';
import React, { Component } from 'react';
//import NumericInput from 'react-native-numeric-input';

export default class SignUp extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      creditcard: "",
      expdate: "",
      secCode: ""
    }
  }

  submit() {
    this.props.navigation.navigate('Scanner')
  }

  render(){
    return (

      <ScrollView style={ styles.container } >
          <TextInput
              style={[styles.line, styles.input]}
              onChangeText={(text) => this.setState({firstname: text})}
              placeholder="FirstName"
          />
          <TextInput
              style={[styles.line, styles.input]}
              onChangeText={(text) => this.setState({lastname: text})}
              placeholder="LastName"
          />
          <TextInput
              style={[styles.line, styles.input]}
              onChangeText={(text) => this.setState({username: text})}
              placeholder="userName"
          />
          <TextInput
              style={[styles.line, styles.input]}
              onChangeText={(text) => this.setState({email: text})}
              placeholder="e-mail"
          />
          <TextInput
              style={[styles.line, styles.input]}
              onChangeText={(text) => this.setState({password:text})}
              secureTextEntry={true}
              placeholder="Password"
          />
          <TextInput
              style={[styles.line, styles.input]}
              onChangeText={(text) => this.setState({streetAddress: text})}
              placeholder="address"
          />
          <TextInput
              style={[styles.line, styles.input]}
              onChangeText={(text) => this.setState({city: text})}
              placeholder="city"
          />
          <TextInput
              style={[styles.line, styles.input]}
              onChangeText={(text) => this.setState({zipCode: text})}
              placeholder="zipCode"
          />
          <TextInput
              style={[styles.line, styles.input]}
              onChangeText={(text) => this.setState({creditcard: text})}
              //<NumericInput type='up-down' onChange={value => console.log(value)} />
              placeholder="creditcard number"
          />
          <TextInput
              style={[styles.line, styles.input]}
              onChangeText={(text) => this.setState({secCode: text})}
              placeholder="ccv"
          />
          <TextInput
              style={[styles.line, styles.input]}
              onChangeText={(text) => this.setState({expdate: text})}
              placeholder="expiration date"
          />
          <Button
              onPress={this.submit.bind(this)}
              title="Submit"
              color="#841584"
          />
      </ScrollView>
    );
  }
}
