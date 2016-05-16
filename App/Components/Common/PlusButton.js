import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

var styles = StyleSheet.create({
  plusButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1.5
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  pluscontainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
})

class PlusButton extends Component{
  constructor(props) {
    super(props);
    this.state = {
      promptValue: ''
    };
  }
  saveResponse(promptValue) {
    this.setState({ promptValue: JSON.stringify(promptValue) });
    console.log(this.state.promptValue);
  }
  render(){
    return(
      <View
      style={styles.pluscontainer}>
      <TouchableHighlight
      style={styles.plusButton}
      onPress={() => AlertIOS.prompt('Enter Group Name', null, this.saveResponse.bind(this))}
      underlayColor='black'>
        <Text style={styles.buttonText}> + </Text>
      </TouchableHighlight>
      </View>
    )
  }
}

module.exports = PlusButton;
