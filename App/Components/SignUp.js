var usersApi = require('../Utils/usersApi');
var GoogleMap = require('./GoogleMap');
var Firebase = require('firebase');


import React, { Component } from 'react';
import {
  StyleSheet,
  PropTypes,
  View,
  TextInput,
  Text,
  Dimensions,
  TouchableHighlight,
  Image,
  AppRegistry
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
    width: null,
    height: null
  },
  title: {
    fontSize: 30,
    alignSelf: 'flex-start',
    marginBottom: 30,
    marginTop: 25,
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
  input: {
    padding: 4,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    marginBottom: 20,
    flex: 1,
    color: 'white',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  label: {
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
  spacer: {
    marginVertical: 100,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  headerbar: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.db = new Firebase('https://ralli.firebaseio.com/users');
    this.state = {
      username: '',
      email:    '',
      password: ''
    };
  }

  signupOnPress() {
    usersApi.createNewUser(this.state.email, this.state.password, this.state.username).then((res) => {
      usersApi.loginUser(this.state.email, this.state.password).then((res) => {
          this.db.push({
            username: this.state.username,
            email: this.state.email.toLowerCase(),
            avatarUrl: res.password.profileImageURL,
          })
        usersApi.getUserByEmail(this.state.email.toLowerCase()).then((res) => {
          this.props.navigator.push({
            title: 'Rallies Nearby',
            component: GoogleMap,
            passProps: {userData: res.val()[Object.keys(res.val())[0]], userId: Object.keys(res.val())[0]}
          })
        })
        this.setState({
          username: '',
          email:    '',
          password: ''
        });
      })
  })
}

  render() {
    return (
      <Image source={require('./Common/bokeh-lights.png')} style={styles.container}>
        <View>
          <View style={styles.headerbar}>
          <Image style={styles.image} source={require('./Common/small-icon.png')} />
          <Text style={styles.title}> Create Rally Account</Text>

          </View>

          <Text style={styles.label}>Username:</Text>

          <TextInput
           style={styles.input}
           value={this.state.username}
           onChangeText={(text) => this.setState({username: text})}/>

           <Text style={styles.label}>Email:</Text>

           <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}/>

          <Text style={styles.label}>Password:</Text>

          <TextInput
           secureTextEntry={true}
           style={styles.input}
           value={this.state.password}
           onChangeText={(text) => this.setState({password: text})}/>

           <TouchableHighlight style={styles.button} onPress={this.signupOnPress.bind(this)} underlayColor='#99d9f4'>
             <Text style={styles.buttonText}>Create Account</Text>
           </TouchableHighlight>
           <Text style={styles.spacer}> </Text>
        </View>
      </Image>
    )
  }
}

module.exports = SignUp;
