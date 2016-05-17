var usersApi = require('../Utils/usersApi');

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
  Image,
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    marginBottom: 20,
    flex: 1,
    alignSelf: 'stretch',
    borderColor: '#bfbfbf',
    backgroundColor: '#d9d9d9'
  },
  label: {
    fontSize: 14
  },
  spacer: {
    marginVertical: 80
  },
  headerbar: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonFacebook: {
    backgroundColor: '#3e51b2',
    height: 36,
    borderColor: '#3e51b2',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  FacebookContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  FacebookImage: {
    height: 32
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
    // if (usersApi.getCurrentUser()) {
    //   return (<View onLayout={this.loggedInUserRedirect.bind(this)}></View>)
    // }else {
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
           <TouchableHighlight style={styles.buttonFacebook} onPress={console.log("YO")} underlayColor='#6878ca'>
           <View style={styles.FacebookContainer}>
             <Image style={styles.FacebookImage} source={require('./Common/Facebook-48.png')} />
             <Text style={styles.buttonText}>Sign in with Facebook</Text>
             </View>
           </TouchableHighlight>
           <Text style={styles.spacer}> </Text>
          <Text style={styles.label}>Not a member? Sign up here</Text>
          <TouchableHighlight style={styles.button} onPress={this.signupOnPress.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableHighlight>
        </View>
      )
    // }
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
            title: 'Rallies Nearby',
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

  // loggedInUserRedirect() {
  //   if(usersApi.getCurrentUser()) {
  //     usersApi.getCurrentUser().then((res) => {
  //         this.props.navigator.push({
  //         title: 'Map Page',
  //         component: GoogleMap,
  //         passProps: {response: res},
  //         rightButtonIcon: require('./Common/small-icon.png'),
  //         onRightButtonPress: this.gotoMarker.bind(this)
  //       })
  //     })
  //   }
  // }

  loggedInUserRedirect() {
    this.props.navigator.push({
      title: 'Map Page',
      component: GoogleMap,
      passProps: {response: usersApi.getCurrentUser()}


    })
  }

}
module.exports = LoginPage;
