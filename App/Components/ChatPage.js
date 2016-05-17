'use strict';

var groupsApi = require('../Utils/groupsApi.js');
var usersApi = require('../Utils/usersApi.js');

import Firebase from 'firebase'
import React, { Component } from 'react';
// import Separator from './Helpers/Separator'
import {
  StyleSheet,
  Text,
  AlertIOS,
  ListView,
  View,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    height: 60,
    backgroundColor: '#6600ff',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  },
  plusButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6600ff',
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
    paddingTop: 65,
    paddingBottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  messageStyle: {
    marginTop: 15,
    flex: 1,
  }
});


class ChatPage extends Component{
  constructor(props){
    super(props);
    this.chatRef = new Firebase('https://ralli.firebaseio.com/groups/' + this.props.groupData.id + "/chatroom");
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows([{username: "Ralli Robot", message: "No body has said anything yet, be the first one!", avatarUrl: "http://www.gravatar.com/avatar/04da6ee5653a27ae038bebcdff7ea49c?s=90&r=g"}]),
      items: [],
      message: '',
      error: '',
      userName: ''
    }
  }
  componentWillMount(){
    // Firebase.enableLogging(true);
    this.chatRef.on('value', function(snapshot) {
      if(snapshot.val()) {
        var messages = [];
        for(var i in snapshot.val()) {
          messages.push(snapshot.val()[i]);
        }
        this.setState({
          items: messages,
          dataSource: this.ds.cloneWithRows(messages),
          userName: this.props.userData.username
        });
      }else {
        this.setState({
          userName: this.props.userData.username
        });
      }
    }.bind(this));
  }

  saveResponse(promptValue){
    // api call to add user to current chat
    this.setState({ promptValue: promptValue })
    var personEmail = this.state.promptValue;
    // console.log(promptValue);
    usersApi.getUserByEmail(personEmail).then((res) => {
      // user id is Object.keys(res.val())[0]
      // group id is this.
      console.log(this.props.groupData.id)
      console.log(Object.keys(res.val())[0])

      groupsApi.joinGroup(this.props.groupData.id, Object.keys(res.val())[0], this.props.groupData.name);
    })
  }

  handleChange(e){
    this.setState({
      message: e.nativeEvent.text
    })
  }

  handleSubmit(){
    this.chatRef.push({ username: this.state.userName, message: this.state.message || '', avatarUrl: this.props.userData.avatarUrl });
    this.setState({
      message: ''
    })
  }
  renderRow(rowData){
    return (
        <View style={styles.rowContainer}>
          <Image style={styles.avatar} source={{uri: rowData.avatarUrl}} />
          <Text style={styles.messageStyle} > {rowData.username}: {rowData.message}</Text>
        </View>
    )
  }
  footer(){
    return (
      <View style={styles.footerContainer}>
        <TextInput
            style={styles.searchInput}
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            placeholder="Group Chat" />
        <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
      </View>
    )
  }
  render(){
    if (this.state.items.length > 0) {
      return (
        <View style={styles.container}>
          <View style={styles.pluscontainer}>
            <TouchableHighlight
            style={styles.plusButton}
            onPress={() => AlertIOS.prompt('Add a person by Email', null, this.saveResponse.bind(this))}
            underlayColor='black'>
              <Text style={styles.buttonText}> + </Text>
            </TouchableHighlight>
          </View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow} />
          {this.footer()}
        </View>
      )
    }else {
      return (
        <View style={styles.container}>
          <View style={styles.pluscontainer}>
            <TouchableHighlight
            style={styles.plusButton}
            onPress={() => AlertIOS.prompt('Add a person by Email', null, this.saveResponse.bind(this))}
            underlayColor='black'>
              <Text style={styles.buttonText}> + </Text>
            </TouchableHighlight>
          </View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
          {this.footer()}
        </View>
      )
    }
  }
};

ChatPage.propTypes = {
  groupData: React.PropTypes.object.isRequired,
  userData: React.PropTypes.object.isRequired
};

module.exports = ChatPage;

// scrollTo={0, 5}
// enableEmptySections={false}
