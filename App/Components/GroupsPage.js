'use strict';
import Separator from './Helpers/Separator';
import Badge from './Helpers/Badge';
import ChatPage from './ChatPage';
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
  ScrollView
} from 'react-native';

var styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'black'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    flex: 1
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
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
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

class GroupsPage extends Component {

  goToChat(groupName){
    this.props.navigator.push({
      component: ChatPage,
      title: groupName,
      passProps: {groupName: groupName}
    })
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
          <View style={styles.rowContainer}>
            <TouchableHighlight
            onPress={this.goToChat.bind(this, groupsData[index].name)}
            underlayColor='black'>
            <Text style={styles.name}>{groupsData[index].name}</Text>
            </TouchableHighlight>
          </View>
          <Separator />
        </View>
      )
    });
    return(
      <ScrollView style={styles.container}>
        <Badge
        userData={userData}
      />
        {list}
      </ScrollView>
    )
  }
};

// GroupsPage.propTypes = {
//   userData: React.PropTypes.object.isRequired,
//   groupsData: React.PropTypes.object.isRequired
// };

module.exports = GroupsPage;
