'use strict';
import Separator from './Helpers/Separator';
import React, { Component } from 'react';
var Button = require('./Common/button');
var GoogleMap = require('./GoogleMap');

import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  Image,
  TabBarIOS,
  ScrollView,
  AlertIOS,
  Switch
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingVertical: 10
  },
  wrapper: {
    flex: 1
  },
  name: {
    color: '#666666',
    fontSize: 18,
    paddingBottom: 5,
    alignSelf: 'flex-start'
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
  },
  rowContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  },
  button: {
    height: 36,
    backgroundColor: '#6600ff',
    borderColor: '#6600ff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
});

class GroupsInvitePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTitle: '',
      address: '',
      description: '',
      groupsData: [
          {name: 'Group 1', users: ['Bobbert', 'Timmert', 'Kev']},
          {name: 'Group 2', users: ['Bobbert', 'Timmert', 'Kev']},
          {name: 'Group 3', users: ['Bobbert', 'Timmert', 'Kev']},
          {name: 'Group 4', users: ['Bobbert', 'Timmert', 'Kev']},
          {name: 'Group 5', users: ['Bobbert', 'Timmert', 'Kev']}
        ]
    };
  }
  onStartRally() {
    this.props.navigator.pop({
      title: 'Map Page',
      component: GoogleMap,
    })
  }
  onMakePublic() {
    this.props.navigator.pop({
      title: 'Map Page',
      component: GoogleMap,
    })
  }

  onSwitchPress () {

    console.log(this.groupsData[index])

  }

  render() {
    var userData = {username: 'Timmert', email: 'timmer@time.com', pic_url: 'http://plan59.com/images/JPGs/sunshine_1954_fresh_00.jpg', location: 'San Francisco, CA' };
    var groupsData = [
        {name: 'Group 1', users: ['Bobbert', 'Timmert', 'Kev']},
        {name: 'Group 2', users: ['Bobbert', 'Timmert', 'Kev']},
        {name: 'Group 3', users: ['Bobbert', 'Timmert', 'Kev']},
        {name: 'Group 4', users: ['Bobbert', 'Timmert', 'Kev']},
        {name: 'Group 5', users: ['Bobbert', 'Timmert', 'Kev']}
      ];
    var list = groupsData.map((item, index) => {
      return(
        <View key={index}>
          <TouchableHighlight onPress={this.onSwitchPress.bind(this)}>
            <View style={styles.rowContainer}>
                <Text style={styles.name}>{groupsData[index].name}</Text>
            </View>
          </TouchableHighlight>
          <Separator />
        </View>
      )
    });

    console.log(this.props.eventInfo)
    return(
      <ScrollView style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.onMakePublic.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}> Make Public Rally </Text>
        </TouchableHighlight>
        <Separator />
        {list}
        <TouchableHighlight style={styles.button} onPress={this.onStartRally.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}> Start Rally </Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
};

module.exports = GroupsInvitePage;
