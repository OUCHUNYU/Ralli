let Firebase = require('firebase');
let FBUrl = 'https://ralli.firebaseio.com/'

const messagesApi = {
  chatRoomMessenger(newMemberId, groupName) {
    let feedMessage = "You have now been added to the group named: " + groupName;
    let userRef = new Firebase(FBUrl + "users/" + newMemberId);
    new Firebase(FBUrl + "users/" + newMemberId + "/feed").once("value").then((res) => {
      if(res.val()) {
        let feedArr = res.val();
        feedArr.push({desc: feedMessage})
        userRef.update({feed: feedArr})
      }else {
        userRef.update({feed: [{desc: feedMessage}]})
      }
    })
  },

  groupInvitationMessenger(idArray, eventName, startTime) {
    idArray.forEach((groupId) => {
      new Firebase(FBUrl + "groups/" + groupId).once("value").then((res) => {
        let userIdArr = res.val().members;
        userIdArr.forEach((userId) => {
          let feedMessage = "You are invited to join event: " + eventName + " , starts at " + startTime + "."
          new Firebase(FBUrl + "users/" + userId + "/feed").once("value").then((res) => {
            let userRef = new Firebase(FBUrl + "users/" + userId);
            if(res.val()) {
              let feedArr = res.val();
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

  individualUserMessenger(userId, message) {
    new Firebase(FBUrl + "users/" + userId + "/feed").once("value").then((res) => {
      let userRef = new Firebase(FBUrl + "users/" + userId);
      if(res.val()) {
        let feedArr = res.val();
        feedArr.push({desc: message})
        userRef.update({feed: feedArr})
      }else {
        userRef.update({feed: [{desc: message}]})
      }
    })
  }
}

module.exports = messagesApi;
