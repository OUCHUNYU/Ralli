'use strict';
var Firebase = require('firebase');
var groupsApi = require('../Utils/groupsApi.js');


import markersApi from '../Utils/markersApi'
import GoogleMap from './GoogleMap'

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
  button: {
     height: 36,
     backgroundColor: '#6600ff',
     borderColor: '#6600ff',
     borderWidth: 1,
     borderRadius: 8,
     marginVertical: 10,
     marginHorizontal: 10,
     alignSelf: 'stretch',
     justifyContent: 'center'
   },
   buttonText: {
     fontSize: 18,
     color: 'white',
     alignSelf: 'center'
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
  spacer: {
    marginVertical: 20
  }
});


class GroupsInvitePage extends Component {
  componentWillMount() {
    new Firebase('https://ralli.firebaseio.com/users/' + this.props.userId).once("value")
      .then((res) => {
        if(res.val().groups) {
          this.setState({
            dataSource: this.ds.cloneWithRows(res.val().groups),
            groupsInfo: res.val().groups
          })
        }
      })
  }

  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      groupIDs: [],
      dataSource: this.ds.cloneWithRows([]),
      userData: '',
      groupsInfo: false
    }
  }

  _inviteChange(val, index){
    this.state.groupsInfo[index].invited = val
    this.setState({
      dataSource: this.ds.cloneWithRows(this.state.groupsInfo)
    })
  }

  _grabGroupIds(groups){
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].invited === true) {
        this.state.groupIDs.push(groups[i].id)
      }
    }
  }
  onStartRally() {
     this._grabGroupIds(this.state.groupsInfo)
     var groupIds = this.state.groupIDs
     var dateString = this.props.eventInfo.date.toLocaleDateString() + ' ' + this.props.eventInfo.date.toLocaleTimeString();

     markersApi.createMarker(this.props.userId, this.props.eventInfo.eventTitle, this.props.eventInfo.address, this.props.eventInfo.description, dateString, groupIds, false).then((res) => {console.log("Create marker")}).catch((err) => {console.log("Failed creation")})

     this.props.navigator.pop({
       title: 'Map Page',
       component: GoogleMap,
       passProps: {
        userId: this.props.userId,
        userData: this.props.userData
       }
     })
   }
   onMakePublic() {
     this._grabGroupIds(this.state.groupsInfo)
     var groupIds = this.state.groupIDs
     var dateString = this.props.eventInfo.date.toLocaleDateString() + ' ' + this.props.eventInfo.date.toLocaleTimeString();

     markersApi.createMarker(this.props.userId, this.props.eventInfo.eventTitle, this.props.eventInfo.address, this.props.eventInfo.description, dateString, groupIds, true).then((res) => {console.log("Create marker")}).catch((err) => {console.log("Failed creation")})

     this.props.navigator.pop({
       title: 'Map Page',
       component: GoogleMap,
       passProps: {
        userId: this.props.userId,
        userData: this.props.userData
       }
     })
   }

  renderRow(rowData, rowID ,sectionID){
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.name}>{rowData.name}</Text>
          <Switch
            onValueChange={(value) => this._inviteChange(value, sectionID)}
            style={{marginBottom: 10}}
            value={rowData.invited}
          />
        </View>
      </View>
    )
  }

  render() {
    var contentOffset = {x: 0, y: 0}
    if(this.state.groupsInfo) {
      return(
        <ScrollView style={styles.container} contentOffset={contentOffset}>
          <Text style={styles.spacer}></Text>
          <TouchableHighlight style={styles.button} onPress={this.onMakePublic.bind(this)} underlayColor='#99d9f4'>
             <Text style={styles.buttonText}> Make a Public Rally </Text>
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
    }else {
      return(
        <ScrollView style={styles.container} contentOffset={contentOffset}>
          <Text style={styles.spacer}></Text>
          <TouchableHighlight style={styles.button} onPress={this.onMakePublic.bind(this)} underlayColor='#99d9f4'>
             <Text style={styles.buttonText}> Make a Public Rally </Text>
          </TouchableHighlight>
          <View style={styles.listviewbox}>
          </View>
        </ScrollView>
      )
    }
  }
}

GroupsInvitePage.propTypes = {
  userData: React.PropTypes.object.isRequired,
  userId: React.PropTypes.string.isRequired,
  eventInfo: React.PropTypes.object.isRequired
};


module.exports = GroupsInvitePage;
