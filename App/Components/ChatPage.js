'use strict';
import Firebase from 'firebase'
import React, { Component } from 'react';
import Separator from './Helpers/Separator'
import {
  StyleSheet,
  Text,
  ListView,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
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
    padding: 10,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

var groupChat = {messages: [{username: 'Timmert', message: 'Hello there'}]}

const chatEndPoint = 'https://rallychats.firebaseio.com/chat/';

class ChatPage extends Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(groupChat.messages),
      items: [],
      message: '',
      error: '',
      userName: 'Bobbert'
    }
  }

  componentWillMount(){
    Firebase.enableLogging(true);
    this.ref = new Firebase(chatEndPoint);
    this.ref.on('value', function(snapshot) {
      var items = [];
      snapshot.forEach(function(child) {
        items.push(child.val());
      });
      console.log(items);
      this.setState({
        items: items,
        dataSource: this.ds.cloneWithRows(this.state.items)
      });
    }.bind(this));
  }

  handleChange(e){
    this.setState({
      message: e.nativeEvent.text
    })
  }

  handleSubmit(){
    this.ref.push({ name: this.state.userName, message: this.state.message || '' });
    this.setState({
      message: '',
      dataSource: this.ds.cloneWithRows(this.state.items)
    })
  }
  renderRow(rowData){
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text> {rowData.name}: {rowData.message} </Text>
        </View>
        <Separator />
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
            placeholder="Type stuff" />
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
    return (
      <View style={styles.container}>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow} />
        {this.footer()}
      </View>
    )
  }
};


module.exports = ChatPage;
