'use strict';
var Firebase = require('firebase');
var groupsApi = require('../Utils/groupsApi.js');
var GoogleMap = require('./GoogleMap')

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
  ScrollView,
  ListView,
  AlertIOS,
  Dimensions,
  Switch,
} from 'react-native';

var groupIDS = []

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc',
  },
  wrapper: {
    flex: 1
  },
  name: {
    color: '#666666',
    fontSize: 18,
    paddingBottom: 5,
    fontWeight: 'bold'
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
    padding: 5
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#4700b3',
    borderWidth: 1.5,
    width: width * .30,
    height: 30,
    borderRadius: 8,
    marginBottom: 10
  },
  buttonText: {
    color: '#6600ff'
  },
  pluscontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },
  rowContainer: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 20,
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'visible',
    borderWidth: 2,
    borderColor: '#bfbfbf'
  },
  listviewbox: {
    paddingHorizontal: 10
  },
  arrow: {
    fontSize: 25,
    color: '#b3b3b3',
  },
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

// var passedUser = {username: 'ouchunyu', email: 'ouchunyu@yahoo.com', avatarUrl: "https://secure.gravatar.com/avatar/47fc607a6ee96a95f4a431b810dffbe2?d=retro"};

var groupsData = [
    {name: 'Group 1', invited: false},
    {name: 'Group 2', invited: false},
    {name: 'Group 3', invited: false},
    {name: 'Group 4', invited: false},
    {name: 'Group 5', invited: false},
  ]

class GroupsInvitePage extends Component {
  // componentWillMount() {
  //   // when a group is added
  //   this.userRef.on('value', ((dataSnapshot) => {
  //     if (dataSnapshot && dataSnapshot.val().groups) {
  //       this.setState({
  //         groups : dataSnapshot.val().groups,
  //         dataSource: this.ds.cloneWithRows(dataSnapshot.val().groups),
  //         userData: dataSnapshot.val()
  //       });
  //     }else {
  //       this.setState({
  //         groups : [],
  //         dataSource: this.ds.cloneWithRows(this.state.groups),
  //         userData: dataSnapshot.val()
  //       });
  //     }
  //   }));
  // }

  constructor(props){
    console.log("constructor first")
    super(props);
    // this.userRef = new Firebase('https://ralli.firebaseio.com/users/-KHqf2KiolbegdEhXHuy');
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      groups: [],
      dataSource: this.ds.cloneWithRows(groupsData),
      userData: '',
    }
  }
  onStartRally() {

    this.props.navigator.pop({
      title: 'Map Page',
      component: GoogleMap,
      passProps: 
    })
  }
  onMakePublic() {
    this.props.navigator.pop({
      title: 'Map Page',
      component: GoogleMap,
    })
  }

  componentWillMount() {
    this._pressData = {};
  }

  _pressData ({}: {[key: number]: boolean}){}

  _genRows(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  }

  _pressRow(sectionID: number) {
    console.log(sectionID)
    this.state.groups.push(sectionID)
    console.log(this.state.groups)
  }

  renderRow(rowData, rowID, sectionID){
    return (
        <View>
          <TouchableHighlight onPress={() => this._pressRow(sectionID)}>
          <View style={styles.rowContainer}>
            <Image style={styles.groupImage} source={require('./Common/usergroup.png')} />
            <Text style={styles.name}>    {rowData.name}</Text>
          </View>
          </TouchableHighlight>
        </View>

    )
  }

  render() {
    console.log(this.props.eventInfo)
    return(
      <ScrollView style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.onMakePublic.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}> Make Public Rally </Text>
        </TouchableHighlight>
        <View style={styles.listviewbox}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
          </View>
        <TouchableHighlight style={styles.button} onPress={this.onStartRally.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}> Start Rally </Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

module.exports = GroupsInvitePage;
