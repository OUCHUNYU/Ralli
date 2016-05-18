var GoogleMap = require('./App/Components/GoogleMap');
var LoginPage = require('./App/Components/LoginPage');
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
})

class Ralli extends Component {

  render() {
    return (
      <NavigatorIOS
      style={styles.wrapper}
      initialRoute = {{
        title: 'Login',
        component: LoginPage,

      }} />
    );
  }
};


AppRegistry.registerComponent('Ralli', () => Ralli);
