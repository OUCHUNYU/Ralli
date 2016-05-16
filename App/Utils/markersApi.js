var usersApi = require('./usersApi');
var Firebase = require('firebase');
var FirebaseMarkersUrl = 'https://ralli.firebaseio.com/markers';
var MarkersRef = new Firebase(FirebaseMarkersUrl);


var markersApi = {
  createMarker: function() {

  }

}

module.exports = markersApi;