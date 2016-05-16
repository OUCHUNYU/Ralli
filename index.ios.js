
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
<<<<<<< HEAD
        component: GoogleMap,
        backButtonTitle: 'Logout',
=======
        component: LoginPage,
        backButtonTitle: 'Logout'
>>>>>>> 8324e7867987929d57c3023f48c7f271edaae1ca
      }} />
    );
  }
};


AppRegistry.registerComponent('Ralli', () => Ralli);
