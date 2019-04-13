// ScannerMarket
//
import React, { Component } from 'react';
import styles from './components/styles';
import {
  TextInput,
  StyleSheet,
  Button,
  View,
  Text,
  Alert,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import Scanner from './Scanner.js';
import ScannerNoCamera from './ScannerNoCamera.js';
import Checkout from './Checkout.js';
import SignUp from './CreateAccount.js';
import Receipt from './Receipt.js';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      spinLoadingWheel: false,
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Log In",
    };
  };

  submit() {
    this.setState({spinLoadingWheel: true});
    Keyboard.dismiss();
    const url = 'https://superdupermarketscanner.herokuapp.com/api/login';
    var data = {
      username: this.state.username,
      password: this.state.password,
    };

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
      if(response.auth == true) {
        const userObj = {
          token: response.token,
          cards: [],
          // cards: [
            //     {key: "1", last4: "4242", expirationDate: "04/20"},
            //     {key: "2", last4: "4242", expirationDate: "04/20"},
            //     {key: "3", last4: "4242", expirationDate: "04/20"}
            //   ],
        }
        // Get cards from the database
        const url_credit = 'https://superdupermarketscanner.herokuapp.com/api/credit';
        fetch(url_credit, 
          {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + userObj.token
            }
          }
        )
        .then(res => res.json())
        .then(response => {
          userObj.cards = response;
          this.props.user = userObj;
          this.props.navigation.navigate('Scanner', {user: userObj});
          console.warn(userObj);
        })
      } else {
        Alert.alert('Incorrect username or password.')
      }
    })
    .catch(error => {
      Alert.alert(JSON.stringify(response))
    })
    .finally(() => this.setState({spinLoadingWheel: false}));
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
          {this.state.spinLoadingWheel &&
            <View style={styles.spinner}>
              <ActivityIndicator
                animating={true}
                color="#000000"
                size="large"
              />
            </View>
          }
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
    Scanner: ScannerNoCamera,
    Checkout: Checkout,
    SignUp: SignUp
  }
);

export default createAppContainer(AppNavigator);

// const MainStack = createStackNavigator(
//   {
//     Home: App,
//     // Scanner: Scanner,
//     Scanner: ScannerNoCamera,
//     Checkout: Checkout,
//     SignUp: SignUp
//   }
// );
// const RootStack = createStackNavigator(
//   {
//     Main: {
//       screen: MainStack,
//     },
//     MyModal: {
//       screen: Receipt,
//     },
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none',
//   }
// );
// export default createAppContainer(RootStack);
