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
  ScrollView,
  ListView,
  AlertIOS
} from 'react-native';

var styles = StyleSheet.create({
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

var userData = {username: 'Timmert', email: 'timmer@time.com', pic_url: 'http://plan59.com/images/JPGs/sunshine_1954_fresh_00.jpg', location: 'San Francisco, CA' };
var groupsData = [
    {name: 'Group 1'},
    {name: 'Group 2'},
    {name: 'Group 3'},
    {name: 'Group 4'},
    {name: 'Group 5'}
  ];

class GroupsPage extends Component {
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(groupsData)
    }
  }

  saveResponse(promptValue){
    // api call to create group with promptValue(the name is stored in prompt value)
    this.setState({ promptValue: promptValue })
    var group = this.state.promptValue
    console.log(group)
    groupsData.push({name: group})
    console.log(groupsData)
    this.setState({
      dataSource: this.ds.cloneWithRows(groupsData)
    })
  }

  addToGroup(groupName){
    AlertIOS.prompt('Add User Email', null, this.saveResponse.bind(this))
  };
  goToChat(groupName){
    this.props.navigator.push({
      component: ChatPage,
      title: groupName,
      passProps: {groupName: groupName, userData: userData},
      rightButtonIcon: require('./Common/Plus-button.png'),
      onRightButtonPress: this.addToGroup.bind(this, groupName)
    })
  };

  renderRow(rowData){
    console.log(this.state.promptValue);
    return (
      <View>
        <View style={styles.rowContainer}>
          <TouchableHighlight
          onPress={this.goToChat.bind(this, rowData.name)}
          underlayColor='black'>
          <Text style={styles.name}>{rowData.name}</Text>
          </TouchableHighlight>
        </View>
        <Separator />
      </View>
    )
  }

  render() {
    return(
      <ScrollView style={styles.container}>
        <Badge userData={userData} />
        <View
        style={styles.pluscontainer}>
          <TouchableHighlight
          style={styles.plusButton}
          onPress={() => AlertIOS.prompt('Enter Group Name', null, this.saveResponse.bind(this))}
          underlayColor='black'>
            <Text style={styles.buttonText}> + </Text>
          </TouchableHighlight>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </ScrollView>
    )
  }
};

module.exports = GroupsPage;
