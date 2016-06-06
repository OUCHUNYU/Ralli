var Firebase = require('firebase');
var FBUrl = 'https://ralli.firebaseio.com/'

var messagesApi = {
  chatRoomMessenger: function(newMemberId, groupName) {
    var feedMessage = "You have now been added to the group named: " + groupName;
    var userRef = new Firebase(FBUrl + "users/" + newMemberId);
    new Firebase(FBUrl + "users/" + newMemberId + "/feed").once("value").then((res) => {
      if(res.val()) {
        var feedArr = res.val();
        feedArr.push({desc: feedMessage})
        userRef.update({feed: feedArr})
      }else {
        userRef.update({feed: [{desc: feedMessage}]})
      }
    })
  },

  groupInvitationMessenger: function(idArray, eventName, startTime) {
    idArray.forEach((groupId) => {
      new Firebase(FBUrl + "groups/" + groupId).once("value").then((res) => {
        var userIdArr = res.val().members;
        userIdArr.forEach((userId) => {
          var feedMessage = "You are invited to join event: " + eventName + " , starts at " + startTime + "."
          new Firebase(FBUrl + "users/" + userId + "/feed").once("value").then((res) => {
            var userRef = new Firebase(FBUrl + "users/" + userId);
            if(res.val()) {
              var feedArr = res.val();
              feedArr.push({desc: feedMessage})
              userRef.update({feed: feedArr})
            }else {
              userRef.update({feed: [{desc: feedMessage}]})
            }
          })
        })
      })
    })
  },

  individualUserMessenger: function(userId, message) {
    new Firebase(FBUrl + "users/" + userId + "/feed").once("value").then((res) => {
      var userRef = new Firebase(FBUrl + "users/" + userId);
      if(res.val()) {
        var feedArr = res.val();
        feedArr.push({desc: message})
        userRef.update({feed: feedArr})
      }else {
        userRef.update({feed: [{desc: message}]})
      }
    })
  }
}

module.exports = messagesApi;
