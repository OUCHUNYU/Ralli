var Firebase = require('firebase');
var FirebaseUrl = `https://rallychats.firebaseio.com/`;

var miqueasTestApi ={
  getUserEvents(){
    username = username.toLowerCase().trim();
    var url = `https://rallychats.firebaseio.com/userEvents/.json`;
    return fetch(url).then((res) => res.json());
  }
}

module.exports = miqueasTestApi;
