var Firebase = require('firebase');
var FBUrl = 'https://ralli.firebaseio.com/'


var messagesApi = {
  chatRoomMessenger: function(newMemberId, groupName) {
    var feedMessage = "You have now been added to the group named: " + groupName;
    new Firebase(FBUrl + "users/" + newMemberId + "/feed").once("value").then((res) => {
      if(res.val()) {
        var feedArr = res.val();
        console.log(feedArr)
        feedArr.push({desc: feedMessage})
        new Firebase(FBUrl + "users/" + newMemberId).update({feed: feedArr})
      }else {
        new Firebase(FBUrl + "users/" + newMemberId).update({feed: [{desc: feedMessage}]})
      }
    })
  }
}

module.exports = messagesApi;


// messagesApi.chatRoomMessenger("-KI4AVqDgmxvxsmVo4dD", "Awesome group")