var Button = require('./Common/button');
var { width, height } = Dimensions.get('window');

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  Image,
  TabBarIOS,
  Dimensions
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    width: width,
    height: height,
    flex: 1,
    marginTop: 40
  },
  title: {
    fontSize: 30,
    alignSelf: 'flex-start',
    marginBottom: 30,
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
  label: {
    fontSize: 14,
    marginBottom: 20,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  image: {
    height: height * .30,
    width: width * .50,
    marginBottom: 30,
    borderRadius: 8

  },
  headerbar: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  body: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(0,0,0,.4)',
    paddingTop: 30,
    paddingLeft: 40,
    paddingBottom: 100,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1
  }
});



class QuestionBox extends Component {
  render() {
    console.log(this.props.userData.markers);
    return (

      <Image source={require('./Common/rally-loading-screen.png')} style={styles.container} >

        <View style={styles.body}>
          <Text style={styles.title}>{this.props.eventInfo.title}</Text>
          <Image style={styles.image} source={require('./Common/sbpete.png')} />
          <Text style={styles.label}>{this.props.eventInfo.address}</Text>
          <Text style={styles.label}>{this.props.eventInfo.description}</Text>
          <Text style={styles.label}>{this.props.eventInfo.timeStart}</Text>
        </View>

      </Image>
    )
  }

};

module.exports = QuestionBox;
