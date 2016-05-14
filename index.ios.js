
var LoginPage = require('./App/Components/LoginPage');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
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
      tintColor= 'blue'
      barTintColor= 'blue'
      titleTextColor = 'white'
      backButtonTitle = 'Back to login'
      rightButtonTitle = 'Search location'
      initialRoute = {{
        title: 'Rally',
        component: LoginPage
      }} />
    );
  }
};


AppRegistry.registerComponent('Ralli', () => Ralli);
