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

})

class SurpriseEvent extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: this.props.userData
    }
  }
}

module.exports = SurpriseEvent;
