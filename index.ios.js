
var GoogleMap = require('./App/Components/GoogleMap');


import GroupsPage from './App/Components/GroupsPage'

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
        title: 'Rally',
        component: GoogleMap,
        backButtonTitle: 'Logout',
      }} />
    );
  }
};


AppRegistry.registerComponent('Ralli', () => Ralli);
