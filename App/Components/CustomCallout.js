var Button = require('./Common/button');
var Dimensions = require('Dimensions');
var {height, width} = Dimensions.get('window');


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  LinkingIOS
} from 'react-native';


class CustomCallout extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.bubble}>
          <View style={styles.amount}>
            {this.props.children}
          </View>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  
  bubble: {
    width: width * .75,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#6600ff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#6600ff',
    borderWidth: 0.5,
  },
  dollar: {

    //color: '#FFFFFF',
    //fontSize: 10,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#6600ff',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#6600ff',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = CustomCallout;
