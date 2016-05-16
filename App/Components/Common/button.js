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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    marginTop: 10,
    marginHorizontal: 30,
  },

  buttonText: {
    flex: 1,
    fontSize: 10,
    alignSelf: 'center',
    padding: 5,
    color: 'white'
  }
})


class Button extends Component {
  render () {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor='#b499ff'
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
};

module.exports = Button;
