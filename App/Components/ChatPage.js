'use strict';
import Firebase from 'firebase'
import React, { Component } from 'react';
import Separator from './Helpers/Separator'
import {
  StyleSheet,
  Text,
  AlertIOS,
  ListView,
  View,
  TextInput,
  TouchableHighlight
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
    padding: 10,
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
  }
});

var items = [{name: 'Previousely on group chat', message: '' }]

const chatEndPoint = 'https://rallychats.firebaseio.com/chat/';

class ChatPage extends Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(items),
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
        dataSource: this.ds.cloneWithRows(items.reverse())
      });
    }.bind(this));
  }

  saveResponse(promptValue){
    // api call to add user to current chat
    this.setState({ promptValue: promptValue })
    console.log(promptValue);
  }

  handleChange(e){
    this.setState({
      message: e.nativeEvent.text
    })
  }

  handleSubmit(){
    this.ref.push({ name: this.state.userName, message: this.state.message || '' });
    this.setState({
      message: ''
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
    return (
      <View style={styles.container}>
        <View style={styles.pluscontainer}>
          <TouchableHighlight
          style={styles.plusButton}
          onPress={() => AlertIOS.prompt('Enter Group Name', null, this.saveResponse.bind(this))}
          underlayColor='black'>
            <Text style={styles.buttonText}> + </Text>
          </TouchableHighlight>
        </View>
        <ListView
          scrollTo={0, 5}
          enableEmptySections={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />
        {this.footer()}
      </View>
    )
  }
};


module.exports = ChatPage;
