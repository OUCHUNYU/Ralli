import Firebase   from 'firebase'
import groupsApi  from '../Utils/groupsApi.js'
import Badge      from './Helpers/Badge'
import ChatPage   from './ChatPage'

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
  Dimensions
} from 'react-native';

let styles = StyleSheet.create({
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
    borderWidth: 1.5,
    width: width * .30,
    height: 30,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: 'white'
  },
  buttonText: {
    color: '#666666'
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
  }
});

class GroupsPage extends Component {
  componentWillMount() {
    // when a group is added
    this.userRef.on('value', ((dataSnapshot) => {
      if (dataSnapshot && dataSnapshot.val().groups) {
        this.setState({
          groups : dataSnapshot.val().groups,
          dataSource: this.ds.cloneWithRows(dataSnapshot.val().groups),
          userData: dataSnapshot.val()
        });
      }else {
        this.setState({
          groups : [],
          dataSource: this.ds.cloneWithRows(this.state.groups),
          userData: dataSnapshot.val()
        });
      }
    }));
  }

  constructor(props){
    super(props);
    this.userRef = new Firebase('https://ralli.firebaseio.com/users/' + this.props.userId);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      groups: [],
      dataSource: '',
      userData: ''
    }
  }

  saveResponse(promptValue){
    // api call to create group with promptValue(the name is stored in prompt value)
    this.setState({ promptValue: promptValue })
    let group = this.state.promptValue
    groupsApi.createGroup(this.props.userData, group, this.props.userId);
  }

  addToGroup(groupName){
    AlertIOS.prompt('Add User Email', null, this.saveResponse.bind(this))
  }

  goToChat(row){
    this.props.navigator.push({
      component: ChatPage,
      title: row.name,
      passProps: {groupData: row, userData: this.state.userData}
    })
  }

  renderRow(rowData){
    return (
      <View>
        <TouchableHighlight
        onPress={this.goToChat.bind(this, rowData)}
        underlayColor='#48BBEC'>
        <View style={styles.rowContainer}>
          <Text style={styles.name}>{rowData.name}</Text>
          <Text style={styles.arrow}> > </Text>
        </View>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    let listViewData = (this.state.groups.length > 0) ? <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} /> : <Text></Text>
    return(
      <ScrollView style={styles.container}>
        <Badge userData={this.state.userData} />
        <View
        style={styles.pluscontainer}>
          <TouchableHighlight
          style={styles.plusButton}
          onPress={() => AlertIOS.prompt('Enter Group name:', null, this.saveResponse.bind(this))}
          underlayColor='gray'>
            <Text style={styles.buttonText}>Create Group</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.listviewbox}>
          {listViewData}
        </View>
      </ScrollView>
    )
  }
};

GroupsPage.propTypes = {
  userData: React.PropTypes.object.isRequired,
  userId: React.PropTypes.string.isRequired
};



module.exports = GroupsPage;
