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
    borderColor: 'white',
    marginTop: 10,
    marginHorizontal: 30,
    alignSelf: 'center'
  },

  buttonText: {
    flex: 1,
    fontSize: 14,
    alignSelf: 'center',
    padding: 5,
    color: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  likebutton: {
    flex: 1,
    height: 28,
    width: 20,
    alignSelf: 'flex-start',
    marginTop: 1.5
  },
  buttonWrapper: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

class Button extends Component {
  render () {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor='#b499ff'
        onPress={this.props.onPress}>
        <View style={styles.buttonWrapper}>
        <Image style={styles.likebutton} source={require('./likebutton.png')}/>
        <Text style={styles.buttonText}>  {this.props.text} </Text>
        </View>
      </TouchableHighlight>
    )
  }
};

module.exports = Button;
