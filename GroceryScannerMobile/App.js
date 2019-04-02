// ScannerMarket
//
import React, { Component } from 'react';
import styles from './components/styles';
import {
  TextInput,
  StyleSheet,
  Button,
  View,
  Text
} from 'react-native';
import Scanner from './Scanner.js';
import Checkout from './Checkout.js';
import SignUp from './CreateAccount.js';
import Receipt from './Receipt.js';
import {createStackNavigator, createAppContainer} from 'react-navigation';

class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      //email: "",
      password: ""
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Log In",
    };
  };

  submit() {
    // Get user in database
    const userObj =
    {
      cards: [
        {key: "1", last4: "4242", expirationDate: "04/20"},
        {key: "2", last4: "4242", expirationDate: "04/20"},
        {key: "3", last4: "4242", expirationDate: "04/20"}
      ]
    };
    this.props.user = userObj;
    this.props.navigation.navigate('Scanner', {user: userObj});
  }

  render(){
    return (
      <View style={ styles.container }>
          <Text style={styles.title}>Grocery Scanner App</Text>
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({username: text})}
              placeholder="Email"
          />
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({password:text})}
              secureTextEntry={true}
              placeholder="Password"
          />
          <Button
              onPress={this.submit.bind(this)}
              title="Submit"
              color="#841584"
          />
          <View style={ styles.footer }>
            <Button
                onPress={() => this.props.navigation.navigate('SignUp')}
                title="New to Grocery Scanner? Sign up"
                color="#841584"
            />
          </View>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Scanner: Scanner,
    Checkout: Checkout,
    SignUp: SignUp,
    Receipt: Receipt
  }
);

export default createAppContainer(AppNavigator);
