import React, { Component } from 'react';
import PlusButton from '../Common/PlusButton';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#6600ff',
    paddingBottom: 30,
    marginBottom: -45
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 25,
    alignSelf: 'center'
  },
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
});

class Badge extends Component{
  saveResponse(promptValue) {
    this.setState({ promptValue: JSON.stringify(promptValue) });
  }

  render(){
    return(
      <View style={styles.container}>
          <Image style={styles.image} source={{uri: this.props.userData.avatarUrl}} />
        <Text style={styles.name}></Text>
      </View>
    )
  }
}

Badge.propTypes = {
  userData: React.PropTypes.object.isRequired,
};

module.exports = Badge;
