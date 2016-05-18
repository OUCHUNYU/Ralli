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
  Image
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class SurpriseEvent extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: this.props.userData
    }
  }
  render(){
    console.log(this.props.eventInfo, 'From the surprise event page props');
    return(
      <View style={styles.container}>
        <Text > The event page not title {this.props.eventInfo.title} </Text>
      </View>
    )
  }
}

module.exports = SurpriseEvent;
