import React, { Component } from 'react';
var Button = require('./Common/button');

var GroupsPage = require('./GroupsPage');
var UserProfilePage = require('./UserProfilePage');
var GroupsInvitePage = require('./GroupsInvitePage');
var EventFeed = require('./EventFeed');
var CreateMarker =require('./CreateMarker');
var markersApi = require('../Utils/markersApi');
var messagesApi = require('../Utils/messagesApi');
var Firebase = require('firebase');
var QuestionBox = require('./QuestionBox')
'use strict';

import {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  NavigatorIOS,
  AlertIOS,
  Image,
  TouchableHighlight,
  LinkingIOS,
  Animated

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

class GoogleMap extends Component {
 componentWillMount(){
    this.markerRef.on("value", function(res) {
      var allMarkers = [];
      for(var i in res.val()) {
        allMarkers.push(res.val()[i])
      }
      this.setState({
        markers: allMarkers
      })
      this.render()
    }.bind(this))
   }
  constructor(props) {
    super(props);
    this.markerRef = new Firebase('https://ralli.firebaseio.com/markers');
    this.state = {
      bounceValue: new Animated.Value(0),
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: ["placeholder"]
    };
  }
  onMarkerPress() {

  }
  onPressGroups() {
    this.props.navigator.push ({
      title: 'Groups Page',
      component: GroupsPage,
      passProps: {userData: this.props.userData, userId: this.props.userId}
    })
  }
  onPressProfile() {
    this.props.navigator.push ({
      title: 'Profile Page',
      component: UserProfilePage,
      passProps: {userData: this.props.userData, userId: this.props.userId}
    })
  }
  onPressFeed() {
    this.props.navigator.push ({
      title: 'Feed',
      component: EventFeed,
      passProps: {userData: this.props.userData, userId: this.props.userId}
    })
  }
  onPressCreateMarker () {
    this.props.navigator.push ({
      title: 'Make a Rally',
      component: CreateMarker,
      passProps: {
        userId: this.props.userId,
        userData: this.props.userData
      }
    })
  }

  onPressSurprise() {
    // function to get a a random number between range because js
    console.log(this.props.userData);
    if (this.props.userData.markers) {
      function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      // need latest array of user markers (realtime)
      var len = this.props.userData.markers.length
      var eventIndex = getRandomIntInclusive(0, len)
      var randEventId = this.props.userData.markers[eventIndex]
      console.log('random event ID', randEventId);

      new Firebase('https://ralli.firebaseio.com/markers/' + randEventId)
        .once("value")
        .then((res) =>
        this.props.navigator.push ({
          title: 'Surprise',
          component: QuestionBox,
          passProps: {
            userId: this.props.userId,
            userData: this.props.userData,
            eventInfo: res.val()
          }
        })
      )
    } else {
      AlertIOS.alert(
       'Sorry ' + this.props.userData.username,
       "Looks like you've not been invited to any events."
      )
    }
  }

  iAmGoingButton(item) {
    var eventOwnerId = item.creator;
    var message = this.props.userData.username + " is going to your event: " + item.title
    messagesApi.individualUserMessenger(eventOwnerId, message)
  }

  onRegionChange(region) {
    this.state.region = region;
  }
  onLikeButton() {
    this.state.bounceValue.setValue(1.5);
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 0.8,
        friction: 1,
      }
    ).start();
  }
  markerCenter() {
    console.log("I clicked a marker")
  }
  render() {
    const { region, markers } = this.state;
    var markersList = this.state.markers.map((item, index) => {
    return (
      <MapView.Marker
        ref="m3"
        key={index}
        image={this.state.iconLoaded ? 'markerLoaded' : 'marker'}
        showsUserLocation={true}
        followUserLocation={true}
        coordinate={markers[index].coordinate}
        calloutAnchor={{ x: 0.1, y: 0.1 }}
        calloutOffset={{ x: -8, y: 29 }}
      >
        <Image source={require('./Common/other-small-icon.png')} onLoadEnd={() => {if (!this.state.iconLoaded) this.setState({iconLoaded: true});}}/>
        <MapView.Callout tooltip>
          <TouchableOpacity onPress={this.markerCenter.bind(this)}>
            <CustomCallout style={styles.calloutOpacity}>
              <View style={styles.wrapper}>
                <Text style={styles.calloutHeader}>{markers[index].title}</Text>
              </View>
              <Text style={styles.calloutText}> {markers[index].address}</Text>
              <Text style={styles.calloutText}> {markers[index].description}</Text>
              <Text style={styles.calloutText}> {markers[index].timeStart}</Text>
              <Text style={styles.calloutText}> Group: {markers[index].groups}</Text>
              <Image style={styles.calloutImage} source={require('./Common/sbpete.png')}/>
              <Button onPress={this.iAmGoingButton.bind(this, item)} text="I'm Going"></Button>
            </CustomCallout>
          </TouchableOpacity>
        </MapView.Callout>
      </MapView.Marker>

      )
    });
      return (
        <View style={styles.container}>
          <MapView style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
          followUserLocation={true}>
          {markersList}
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
            <TouchableOpacity onPress={this.onPressSurprise.bind(this)} style={[styles.bubble, styles.button]}>
              <Image source={require('./Common/question.png')} style={styles.icon} />
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
    fontSize: 24,
    color: '#fff',
    marginBottom: 5,
    flex: 1
  },
  calloutText: {
    color: '#fff',
    flex: 1
  },
  calloutOpacity: {
    borderRadius: 8,
    opacity: .8
  },
  icon: {
    height: 25,
    width: 25,
  },
  icongood: {
    height: 32,
    width: 32,
  },
  middleicon: {
    height: 33,
    width: 33
  },
  calloutImage: {
    height: height * .15,
    width: width * .25,
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 3,
    borderWidth: 1,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  likebutton: {
    marginTop: -10,
    flex: 1,
    height: 32,
    width: 22
  }


});

GoogleMap.propTypes = {
  userData: React.PropTypes.object.isRequired,
  userId: React.PropTypes.string.isRequired
};

module.exports = GoogleMap;
