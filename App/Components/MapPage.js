'use strict';

var Button = require('./Common/button');
var UserProfilePage = require('./UserProfilePage.js')
var SearchLocationPage = require('./SearchLocationPage.js')
var GroupsPage = require('./GroupsPage.js')
var GoogleMap = require('./GoogleMap.js')
var CreateMarker = require('./CreateMarker.js')

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
      selectedTab: 'GoogleMap'
    };
  }

  render() {
    this.rightButtonAssign
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}
      tintColor='red'>
        <TabBarIOS.Item
        selected={this.state.selectedTab === 'GoogleMap'}
        systemIcon='featured'
        style={styles.wrapper}
        onPress={() => {
          this.setState({
            selectedTab: 'GoogleMap'
          });
        }}>
        <GoogleMap />
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

    )}

    rightButtonAssign() {
      console.log("eagoheaoguh")
      this.props.navigator.push({
        onRightButtonPress: gotoMarker
      })
    }

    gotoMarker() {
      this.props.navigator.push ({
        title: 'Create Marker',
        Component: CreateMarker
      })
    }

};

module.exports = MapPage;
