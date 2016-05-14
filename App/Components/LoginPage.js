var usersApi = require('../Utils/usersApi');
var Button = require('./Common/button');
var MapPage = require('./MapPage');

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  Image
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



class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Log In</Text>

        <Text style={styles.label}>Username:</Text>

        <TextInput
         style={styles.input}
         value={this.state.username}
         onChangeText={(text) => this.setState({username: text})}/>

        <Text style={styles.label}>Password:</Text>

        <TextInput
         secureTextEntry={true}
         style={styles.input}
         value={this.state.password}
         onChangeText={(text) => this.setState({password: text})}/>

        <Button text={'Log In'} onPress={this.loginOnPress.bind(this)} />
        <Text style={styles.label}>Not a member? Sign up here</Text>
        <Button text={'Sign Up'} onPress={this.signupOnPress.bind(this)}/>
      </View>
    )
  }

  loginOnPress() {
    //Log the user in
    usersApi.loginUser(this.state.username, this.state.password)
      .then((res) => {
          console.log(res)
          this.props.navigator.push({
          title: 'Map Page',
          component: MapPage,
          passProps: {response: res}
        })
      });
    this.setState({
      username: '',
      password: ''
    });


  }
  signupOnPress() {
  }
};

module.exports = LoginPage;
