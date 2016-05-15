
var LoginPage = require('./App/Components/LoginPage');
import React, { Component } from 'react';
import GroupsPage from './App/Components/GroupsPage';
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
        title: 'Rally',
        component: GroupsPage,
        backButtonTitle: 'Logout'
        // react bitching about backbutton
      }} />
    );
  }
};


AppRegistry.registerComponent('Ralli', () => Ralli);
