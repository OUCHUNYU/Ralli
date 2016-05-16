var Button = require('./Common/button');
import Badge from './Helpers/Badge';
var EditProfile = require('./EditProfile')

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
  wrapper: {
    flex: 1
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'flex-start',
    marginBottom: 30,
    marginTop:50,
    color: '#4320df'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    marginBottom: 20,
    flex: 1,
    alignSelf: 'stretch',
    borderColor: "lightsteelblue"
  },
  label: {
    fontSize: 14,
    marginBottom: 20
  },
  spacer: {
    marginVertical: 100
  },
  headerbar: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  }
});



class UserProfilePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerbar}>
        <Image style={styles.image} source={require('./Common/small-icon.png')} />
        <Text style={styles.title}> Username </Text>

        </View>

        <Text style={styles.label}>Email</Text>

        <Text style={styles.label}>Groups</Text>

        <TouchableHighlight style={styles.button} onPress={this.editUserInfo.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableHighlight>
      </View>
    )
  }
  editUserInfo() {
    this.props.navigator.push({
    title: 'Edit User Profile',
    component: EditProfile
  })}
};

module.exports = UserProfilePage;
