'use strict'

import React, { Component } from 'react';
var Button = require('./Common/button');
var t = require('tcomb-form-native');

import {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  AppRegistry
} from 'react-native';

var Form = t.form.Form;

// here we are: define your domain model
var NewUser = t.struct({
  username: t.String,              // a required string
  email: t.String,               // a required number
  password: t.String,
  rememberMe: t.Boolean
});

var options = {
  fields: {
    username: {
      error: 'Username incorrect'
    },
    email: {
      error: 'Insert a valid email'
    },
    password: {
      error: 'Password invalid'
    }
  }
};

class SignUp extends Component {

  onPress() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of NewUser
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create New User</Text>
        <Form
          ref="form"
          type={NewUser}
          options={options}/>
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Create User</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
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
  }
});

module.exports = SignUp;
