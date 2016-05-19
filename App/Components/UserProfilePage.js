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
  container: {
    justifyContent: 'center',
    padding: 20,
    width: null,
    height: null,
    flex: 1
  },
  title: {
    fontSize: 30,
    alignSelf: 'flex-start',
    marginBottom: 30,
    marginTop: 48,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#6600ff',
    borderColor: '#6600ff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  label: {
    fontSize: 14,
    marginBottom: 20,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginTop: 25,

  },
  headerbar: {
    flexDirection: 'row',
    marginTop: -350,
    alignItems: 'center',

  }
});



class UserProfilePage extends Component {
  render() {
    return (

      <Image source={require('./Common/rally-loading-screen.png')} style={styles.container} >



        <View style={styles.headerbar}>
          <Image style={styles.image} source={{uri: this.props.userData.avatarUrl}} />
          <Text style={styles.title}>  {this.props.userData.username}</Text>
        </View>
        <Text style={styles.label}>Email: {this.props.userData.email}</Text>


        <TouchableHighlight style={styles.button} onPress={this.editUserInfo.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableHighlight>

      </Image>
    )
  }
  editUserInfo() {
    this.props.navigator.push({
    title: 'Edit User Profile',
    component: EditProfile
  })}
};

module.exports = UserProfilePage;
