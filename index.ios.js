var GoogleMap = require('./App/Components/GoogleMap');
var LoginPage = require('./App/Components/LoginPage');
import EventFeed from './App/Components/EventFeed';
import GroupsPage from './App/Components/GroupsPage';
import UserProfilePage from './App/Components/UserProfilePage';
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
        component: EventFeed
      }} />
    );
  }
};


AppRegistry.registerComponent('Ralli', () => Ralli);
