var Button = require('./Common/button');
var DatePicker = require('./Common/DatePicker');
var GroupsInvitePage = require('./GroupsInvitePage');

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  Image,
  DatePickerIOS,
  ScrollView
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
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
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

class CreateMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTitle: '',
      address: '',
      description: ''
    };
  }
  onInviteButton() {
    this.props.navigator.replace({
      title: 'Invite Groups',
      component: GroupsInvitePage,
      rightButtonIcon: require('./Common/small-icon.png')
    })
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.headerbar}>
        <Image style={styles.image} source={require('./Common/small-icon.png')} />
        <Text style={styles.title}> Start a Rally</Text>

        </View>

        <Text style={styles.label}>Event Title:</Text>

        <TextInput
         style={styles.input}
         value={this.state.eventTitle}
         onChangeText={(text) => this.setState({eventTitle: text})}/>

        <Text style={styles.label}>Address:</Text>

        <TextInput
         style={styles.input}
         value={this.state.address}
         onChangeText={(text) => this.setState({address: text})}/>

         <Text style={styles.label}>What are we up to?</Text>

         <TextInput
          style={styles.input}
          value={this.state.description}
          onChangeText={(text) => this.setState({description: text})}/>

         <DatePicker />

         <TouchableHighlight style={styles.button} onPress={this.onInviteButton.bind(this)} underlayColor='#99d9f4'>
           <Text style={styles.buttonText}> Invite Groups </Text>
         </TouchableHighlight>

      </ScrollView>
    )
  }

      // usersApi.createMarker(this.state.eventTitle, this.state.address, this.state.description)
      //   .then((res) => {
      //       console.log(res)
      //       this.props.navigator.push({
      //       title: 'Map Page',
      //       component: MapPage,
      //       passProps: {response: res},
      //       rightButtonIcon: require('./Common/small-icon.png'),
      //       onRightButtonPress: this.gotoMarker.bind(this)
      //     })
      //   });
      // this.setState({
      //   eventTitle: '',
      //   address: '',
      //   description: ''
      // });



};
module.exports = CreateMarker;
