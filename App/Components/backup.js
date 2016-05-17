import React, { Component } from 'react';
var Button = require('./Common/button');
var Marker = require('./Common/small-icon.png');
var GroupsPage = require('./GroupsPage');
var UserProfilePage = require('./UserProfilePage');
var GroupsInvitePage = require('./GroupsInvitePage');
var EventFeed = require('./EventFeed')
var CreateMarker =require('./CreateMarker')

'use strict';

import {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  NavigatorIOS,
  Image,
  TouchableHighlight,
  LinkingIOS

} from 'react-native';

var MapView = require('react-native-maps');
var PriceMarker = require('./PriceMarker');
var CustomCallout = require('./CustomCallout');

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

var createMarkerList = function(marker, index) {
  return
  <MapView.Marker
    ref="m3"
    image={Marker}
    coordinate={markers[index].coordinate}
    calloutAnchor={{ x: 0.5, y: 0.4 }}
    calloutOffset={{ x: -8, y: 28 }}
  >
    <MapView.Callout tooltip>
      <TouchableOpacity onPress={this.markerCenter.bind(this)}>
        <CustomCallout style={styles.calloutOpacity}>
          <Text style={styles.calloutHeader}>{markers[index].title}</Text>
          <Text style={styles.calloutText}>{markers[index].address}</Text>
          <Text style={styles.calloutText}>{markers[index].description}</Text>
          <Text style={styles.calloutText}>{markers[index].groups}</Text>
          <Button onPress={this.openMarker.bind(this)} text="I'm Going"></Button>
        </CustomCallout>
      </TouchableOpacity>
    </MapView.Callout>
  </MapView.Marker>
}
class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE + SPACE,
          },
          title: 'PUB CRAWL',
          address: '2020 folsom',
          description: 'We gonna party!',
          groups: 'Krispy Fresh',
        },
        {
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
          title: 'HAve fun',
          address: '633 folsom',
          description: 'We got the goods!',
          groups: 'Krispy Rotten',
        },
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE - SPACE,
          },
          title: 'Basketball',
          address: '2nd and Folsom',
          description: 'We gonna ball!',
          groups: 'Bball is Lyfe',
        },
      ],
    };
  }

  onMarkerPress() {
    console.log("wagueaggukea")
  }

  onPressGroups() {
    this.props.navigator.push ({
      title: 'Groups Page',
      component: GroupsPage
    })
  }
  onPressProfile() {
    this.props.navigator.push ({
      title: 'Profile Page',
      component: UserProfilePage
    })
  }
  onPressFeed() {
    this.props.navigator.push ({
      title: 'Feed',
      component: EventFeed
    })
  }
  onPressCreateMarker () {
    this.props.navigator.push ({
      title: 'Make a Rally',
      component: CreateMarker
    })
  }
  onPressNext() {
    console.log("NEXT PIN BITCH")
  }

  openMarker() {
    LinkingIOS.openURL('http://google.com')
  }

  onRegionChange(region) {
    this.state.region = region;
  }
  markerCenter() {
    console.log("I clicked amarker")
    this.state.region.latitude = this.state.markers[2].latitude
    this.state.region.longitude = this.state.markers[2].longitude
    this.state.region.latitudeDelta = 0.0922
    this.state.region.longitudeDelta = 0.0421

  }
  componentWillMount() {
    Firebase.enableLogging(true);
    this.ref = new Firebase(chatEndPoint);
    this.ref.on('value', function(snapshot) {
      var markers = [];
      snapshot.forEach(function(child) {
        markers.push(child.val());
      });
      this.setState({ markers: markers });
    }.bind(this));
  }

  render() {
    const { region, markers } = this.state;
      return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={region} >
        {this.state.markers.map(createMarkerList)}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.onPressGroups.bind(this)} style={[styles.bubble, styles.button]}>
            <Image source={require('./Common/usergroup.png')} style={styles.icongood} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressProfile.bind(this)} style={[styles.bubble, styles.button]}>
            <Image source={require('./Common/profile.png')} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressCreateMarker.bind(this)} style={[styles.bubble, styles.button]}>
            <Image source={require('./Common/Untitled.png')} style={styles.middleicon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressFeed.bind(this)} style={[styles.bubble, styles.button]}>
            <Image source={require('./Common/activityfeed.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Image source={require('./Common/next.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      );
  }
}
var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    height: height * .08,
    width: width * .20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',

  },
  calloutHeader: {
    fontSize: 30,
    color: '#fff'
  },
  calloutText: {
    color: '#fff'
  },
  calloutOpacity: {
    borderRadius: 8,
    opacity: .8
  },
  icon: {
    height: 35,
    width: 35,
  },
  icongood: {
  },
  middleicon: {
    height: 33,
    width: 33
  }
});

module.exports = GoogleMap;
