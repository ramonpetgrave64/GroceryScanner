// ScannerMarket
//
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Button,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  Keyboard
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
      secCode: "",
      spinLoadingWheel: false
    }
  }

  submit() {
      this.setState({spinLoadingWheel: true});
      Keyboard.dismiss();
      const url = 'https://superdupermarketscanner.herokuapp.com/api/signup';

      const data = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }

      console.warn("data: ",data);
      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => {
        if(response.auth == true) {
          // Get user in database and set to userObj
          const userObj =
          {
            cards: [
              {key: "1", last4: "4242", expirationDate: "04/20"},
              {key: "2", last4: "4242", expirationDate: "04/20"},
              {key: "3", last4: "4242", expirationDate: "04/20"}
            ],
          };
          userObj['token'] = response.token;
          this.props.user = userObj;
          this.props.navigation.navigate('Scanner', {user: userObj});
        } else {
          Alert.alert(JSON.stringify(response))
        }
      })
      .catch(error => {
        Alert.alert(JSON.stringify(response))
      })
      .finally(() => this.setState({spinLoadingWheel: false}));
    }

  render(){
    return (
    // KeyboardAvoidingView to avoid the keyboard to block the inp
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView >
          <TextInput
              style={[styles.line, styles.input]}
              onChangeText={(text) => this.setState({firstname: text})}
              placeholder="FirstName"
          />
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({lastname: text})}
              placeholder="LastName"
          />
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({username: text})}
              placeholder="userName"
          />
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({email: text})}
              placeholder="e-mail"
          />
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({password:text})}
              secureTextEntry={true}
              placeholder="Password"
          />
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({streetAddress: text})}
              placeholder="address"
          />
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({city: text})}
              placeholder="city"
          />
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({zipCode: text})}
              placeholder="zipCode"
          />
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({creditcard: text})}
              //<NumericInput type='up-down' onChange={value => console.log(value)} />
              placeholder="creditcard number"
          />
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({secCode: text})}
              placeholder="cvv"
          />
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({expdate: text})}
              placeholder="expiration date"
          />
          <Button
              onPress={this.submit.bind(this)}
              title="Submit"
              color= '#87ceeb'
              fontWeight = "bold"
          />
      </ScrollView>
    </KeyboardAvoidingView>
    );
  }
}
