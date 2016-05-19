var Firebase = require('firebase');
var { width, height } = Dimensions.get('window');

'use strict';
import React, { Component } from 'react';
import Separator from './Helpers/Separator'
import {
  StyleSheet,
  Text,
  ListView,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  Image,
  Dimensions
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    backgroundColor: '#cccccc',
    width: width,
    height: height
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
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    paddingVertical: 20,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'visible',
    borderWidth: 2,
    borderColor: 'white',
    opacity: .8
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rowText: {
    flex: 1,
    color: 'white',
  },
  spacer: {
    marginVertical: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});


class EventFeed extends Component{

  componentWillMount(){
    this.userFeedRef.on('value', function(snapshot) {
      var feedMessageArr = snapshot.val()
      if(feedMessageArr) {
        this.setState({
          dataSource: this.ds.cloneWithRows(feedMessageArr.reverse()),
        });
      }else {
        this.setState({
          dataSource: this.ds.cloneWithRows([{desc:'You have no notificiations'}]),
        });
      }
    }.bind(this));

  }

  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.userFeedRef = new Firebase('https://ralli.firebaseio.com/users/' + this.props.userId + '/feed')
    this.state = {
      dataSource: this.ds.cloneWithRows([{desc:'You have no notificiations'}]),
      error: '',
      user: this.props.userData
    }
  }


  renderRow(rowData){
    return (
      <View>
        <View style={styles.rowContainer}>
          <Image source={require('./Common/small-icon.png')} />
          <Text style={styles.rowText}> {rowData.desc} </Text>
        </View>

      </View>
    )
  }
  render(){
    console.log(this.props);
    return (
      <Image source={require('./Common/clouds.gif')} style={styles.container}>
        <Text style={styles.spacer}> </Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow} />
      </Image>
    )
  }
};


EventFeed.propTypes = {
  userData: React.PropTypes.object.isRequired,
  userId: React.PropTypes.string.isRequired
};

module.exports = EventFeed;
