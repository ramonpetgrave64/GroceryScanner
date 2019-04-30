// ScannerMarket
//
import {createStackNavigator, createAppContainer} from 'react-navigation';
//import ImageButton from 'react-native-img-button';
import Login from './Login';
import React, { Component } from 'react';
import CreateAccount from './CreateAccount';
import styles from './components/styles';
import {
        TouchableOpacity,
        Button,
        Image,
        View
} from 'react-native';


class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Welcome To ScannerMarket',
      headerLeft: (
        <TouchableOpacity onPress = { ()=> alert('Menu not implemented')}>
          <Image
            style={{ width: 35, height: 35 }}
            //onPress={() => alert('Menu not implemented')}
            source={require('./components/menuIcon.png')}
          />
        </TouchableOpacity >
    ),
  };
};

  render() {
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        style={ styles.frontButton }
        title="Login"
        onPress={() => this.props.navigation.navigate('Login') }
      />

      <Button
        style={ styles.frontButton }
        title="Create an Account"
        onPress={() => this.props.navigation.navigate('CreateAccount') }
      />
     </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    CreateAccount: CreateAccount,
    Login: Login
  }
);

const RootStack= createStackNavigator({
  Home: { screen: MainStack },
  //CreateAccount: {screen: CreateAccount },
  //HomeList: { screen: HomeList }
  },
{

    navigationOptions: {
      headerMode: 'screen' // enabling header mode for main screen
    },

    initialRouteName: 'Home',
    defaultNavigationOptions:
    {
      headerStyle: {
        height: 15,
        backgroundColor: '#708090',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
const AppContainer =  createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
