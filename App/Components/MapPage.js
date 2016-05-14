'use strict';

var Button = require('./Common/button');
var TabBar = require('./Common/TabBar');
var UserProfilePage = require('./UserProfilePage.js')
var SearchLocationPage = require('./SearchLocationPage.js')
var GroupsPage = require('./GroupsPage.js')

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  Image,
  TabBarIOS
} from 'react-native';

var styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'black'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    flex: 1
  },
  label: {
    fontSize: 14
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  }
});



class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'UserProfilePage'
    };
  }

  render() {
    return (

      <TabBarIOS selectedTab={this.state.selectedTab}
      tintColor='red'>
        <TabBarIOS.Item
        selected={this.state.selectedTab === 'UserProfilePage'}
        systemIcon='featured'
        style={styles.wrapper}
        onPress={() => {
          this.setState({
            selectedTab: 'UserProfilePage'
          });
        }}>
        <UserProfilePage />
        </TabBarIOS.Item>

        <TabBarIOS.Item
        selected={this.state.selectedTab === 'GroupsPage'}
        systemIcon='contacts'
        style={styles.wrapper}
        onPress={() => {
          this.setState({
            selectedTab: 'GroupsPage'
          });
        }}>
        <GroupsPage />
        </TabBarIOS.Item>

        <TabBarIOS.Item
        selected={this.state.selectedTab === 'SearchLocationPage'}
        systemIcon='search'
        style={styles.wrapper}
        onPress={() => {
          this.setState({
            selectedTab: 'SearchLocationPage'
          });
        }}>
        <SearchLocationPage />
        </TabBarIOS.Item>



      </TabBarIOS>

    )
  }
};

module.exports = MapPage;
