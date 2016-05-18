var UserProfilePage = require('./UserProfilePage')

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



class EditProfile extends Component {
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
        <Text style={styles.title}> Edit Information</Text>

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

        <Text style={styles.label}>Change Password:</Text>

        <TextInput
         secureTextEntry={true}
         style={styles.input}
         value={this.state.password}
         onChangeText={(text) => this.setState({password: text})}/>

         <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
           <Text style={styles.buttonText}>Save Details</Text>
         </TouchableHighlight>
         <Text style={styles.spacer}> </Text>
      </View>
    )
  }
}

module.exports = EditProfile;
