var usersApi = require('./usersApi');
var Firebase = require('firebase');
var FirebaseMarkersUrl = 'https://ralli.firebaseio.com/markers';
var MarkersRef = new Firebase(FirebaseMarkersUrl);


var markersApi = {
  createMarker: function(currentUserId, eventTitle, eventAddress, eventLat, eventLong, eventDescription, eventTime, invitedGroupId, publicEvent) {

    if(publicEvent) {
      MarkersRef.push({
        creator: currentUserId,
        title: eventTitle,
        address: eventAddress,
        latitude: eventLat,
        longitude: eventLong,
        description: eventDescription,
        timeStart: eventTime,
        isPublic: true
      }).then((res) => {
        this.updateUserMarker(res.key(), currentUserId);
      })

    }else {
      MarkersRef.push({
        creator: currentUserId,
        title: eventTitle,
        address: eventAddress,
        latitude: eventLat,
        longitude: eventLong,
        description: eventDescription,
        timeStart: eventTime,
        isPublic: false,
        groupId: invitedGroupId
      }).then((res) => {
        this.updateUserMarker(res.key(), currentUserId);
      })
    }

  },

  updateUserMarker: function(markerId, currentUserId) {
    new Firebase('https://ralli.firebaseio.com/users/' + currentUserId).once('value').then((res) => {
      var userMarkers = res.val().markers;
      if(userMarkers) {
        userMarkers.push(markerId)
        new Firebase('https://ralli.firebaseio.com/users/' + currentUserId)
          .update({markers: userMarkers.slice(0)})

      }else {
        new Firebase('https://ralli.firebaseio.com/users/' + currentUserId)
          .update({markers: [markerId]})
      }
    })
  },

  getAllMarkers: function() {
    return MarkersRef.once('value').then((res) => res.val());
  },

  getMarkerLatlng: function(address) {
    address = address.toLowerCase().trim();
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBbHAonhDpbIIjc7a7qx5xJZRLrKAIksY0"
    return fetch(url).then((res) => res.json());
    // when using this method chain with this code to get the laglng in an object
    // then((res) => console.log(res.results[0].geometry.location))
  }
}

module.exports = markersApi;


// markersApi.createMarker("-KHqf2KiolbegdEhXHuy")
// console.log(markersApi.getAllMarkers().then((res) => {console.log(res)}))

// console.log(markersApi.getMarkerLatlng("633 folsom san francisco").then((res) => {console.log(res)}));





