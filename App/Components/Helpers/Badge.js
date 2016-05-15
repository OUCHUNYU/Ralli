import React, { Component } from 'react';
import PlusButton from '../Common/PlusButton'
import {
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});

class Badge extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.props.userData.pic_url}} />
        <Text style={styles.name}> My Groups </Text>
        <PlusButton />
      </View>
    )
  }
}

Badge.propTypes = {
  userData: React.PropTypes.object.isRequired
};

module.exports = Badge;
