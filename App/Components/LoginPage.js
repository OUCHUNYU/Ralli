var usersApi = require('../Utils/usersApi');

var MapPage = require('./MapPage');
var SignUp = require('./SignUp');
var CreateMarker = require('./CreateMarker')
var GoogleMap = require('./GoogleMap')

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
    marginTop: 25,
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
    fontSize: 14
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
        <View style={styles.headerbar}>
        <Image style={styles.image} source={require('./Common/small-icon.png')} />
        <Text style={styles.title}> Log In</Text>

        </View>

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

         <TouchableHighlight style={styles.button} onPress={this.loginOnPress.bind(this)} underlayColor='#99d9f4'>
           <Text style={styles.buttonText}>Log In</Text>
         </TouchableHighlight>
         <Text style={styles.spacer}> </Text>
        <Text style={styles.label}>Not a member? Sign up here</Text>
        <TouchableHighlight style={styles.button} onPress={this.signupOnPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    )
  }
  gotoMarker() {
    console.log(this.props)
    this.props.navigator.push ({
      title: 'Create Marker',
      component: CreateMarker
    })
  }

  loginOnPress() {
    //Log the user in
      usersApi.loginUser(this.state.username, this.state.password)
        .then((res) => {
            console.log(res)
            this.props.navigator.push({
            title: 'Map Page',
            component: GoogleMap,
            passProps: {response: res}
          })
        });
      this.setState({
        username: '',
        password: ''
      });

  }
  signupOnPress() {
    this.props.navigator.push({
    title: 'Sign Up',
    component: SignUp
  })}

}
module.exports = LoginPage;
