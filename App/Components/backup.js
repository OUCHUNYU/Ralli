var Button = require('./Common/button');
// var MapView = require('react-native-maps');
// var CustomCallout = require('./CustomCallout');
// var PriceMarker = require('./PriceMarker');


import React, { Component } from 'react';
import {
  StyleSheet,
  MapView,
} from 'react-native';

var styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'black'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    flex: 1
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
  }
});


class GoogleMap extends Component {
  render() {
    var pins = [
      {
        latitude: 37.78825,
        longitude: -122.4324,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
      },
      {
        latitude: 37.78825,
        longitude: -122.4424,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
      }
    ]
    return (
      <MapView

       style={styles.wrapper}
       showsUserLocation={true}
       followUserLocation={true}>
       <MapView.Marker coordinate={[{latitude: 36.78825,
       longitude: -121.4324}]}>
          <Marker />
       <MapView.Callout>
          <Marker />
       </MapView.Callout>
       </MapView.Marker>
       </MapView>
    );
  }
};

module.exports = GoogleMap;
