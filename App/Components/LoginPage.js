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

var Button = require('./Common/button');

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    console.log("gaegeagaeg")
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign In</Text>

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

        <Button text={'Sign In'} onPress={this.loginOnPress} />
        <Text style={styles.label}>Not a member? Sign up here</Text>
        <Button text={'Sign Up'} onPress={this.signupOnPress}/>
      </View>
    )
  }

  loginOnPress() {
    //Log the user in

  }
  signupOnPress() {

  }
};

module.exports = LoginPage;
