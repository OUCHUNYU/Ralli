var usersApi = require('./usersApi');
var Firebase = require('firebase');
var FirebaseGroupsUrl = 'https://ralli.firebaseio.com/groups';
var GroupRef = new Firebase(FirebaseGroupsUrl);
var messagesApi = require('./messagesApi');


var groupsApi = {
  createGroup: function(currentUser, newGroupName) {
    // var currentUser = usersApi.getCurrentUser();
    // var currentUserObj = usersApi.getUserByEmail(currentUser.password.email);
    return GroupRef.push({
      groupName: newGroupName,
      creator: currentUser.email
    }).then((res) => {
      var groupId = res.key();
      if (currentUser.groups) {
        usersApi.getUserByEmail(currentUser.email).then((res) => {
          currentUser.groups.push({name: newGroupName, id: groupId});
          var userId = Object.keys(res.val())[0];

          (new Firebase('https://ralli.firebaseio.com/users/' + userId)).update({groups: currentUser.groups.slice(0)});
        })
      }else {
        usersApi.getUserByEmail(currentUser.email).then((res) => {
          var userId = Object.keys(res.val())[0];
          (new Firebase('https://ralli.firebaseio.com/users/' + userId)).update({groups: [{name: newGroupName, id: groupId}]});
        })
      }

    });
  },

  destroyGroup: function() {

  },

  joinGroup: function(groupId, newMemberId, groupName) {
    return new Firebase(FirebaseGroupsUrl + '/' + groupId).once("value").then((res) => {
      var targetGroup = res.val().members;
      if (targetGroup) {
        if (targetGroup.indexOf(newMemberId) !== -1) {
          throw new Error('this user is in the group')
        }
        targetGroup.push(newMemberId);
        new Firebase(FirebaseGroupsUrl + '/' + groupId).update({members: targetGroup.slice(0)})
      }else {
        new Firebase(FirebaseGroupsUrl + '/' + groupId).update({members: [newMemberId]})
      }


      new Firebase('https://ralli.firebaseio.com/users/' + newMemberId).once("value").then((res) => {
        var newMemberObject = res.val().groups.slice(0)
        if(newMemberObject) {
          newMemberObject.push({id: groupId, name: groupName})
          new Firebase('https://ralli.firebaseio.com/users/' + newMemberId).update({groups: newMemberObject.slice(0)})
        }else {
          new Firebase('https://ralli.firebaseio.com/users/' + newMemberId).update({groups: [{id: groupId, name: groupName}]})
        }
      })

      messagesApi.chatRoomMessenger(newMemberId, groupName);
    })
  },

  leaveGroup: function(currentUserId, groupId) {
    // delete group from user's joined group
    new Firebase('https://ralli.firebaseio.com/users/' + currentUserId).once('value').then((res) => {
      var myGroups = res.val().joinedGroups;
      var newFormedGroup = myGroups.slice(0, myGroups.indexOf(groupId)).concat(myGroups.slice(myGroups.indexOf(groupId) + 1));
      new Firebase('https://ralli.firebaseio.com/users/' + currentUserId).update({joinedGroups: newFormedGroup});
    })

    // delete users from group's members
    new Firebase('https://ralli.firebaseio.com/groups/' + groupId).once('value').then((res) => {
      var thisGroupMembers = res.val().members;
      var newFormedMembers = thisGroupMembers.slice(0, thisGroupMembers.indexOf(currentUserId)).concat(thisGroupMembers.slice(thisGroupMembers.indexOf(currentUserId) + 1));
      new Firebase('https://ralli.firebaseio.com/groups/' + groupId).update({members: newFormedMembers});
    })

  },

  addMessage: function(message, userId, chatRoomRef) {
    chatRoomRef.push({userId: userId, message: message});
  }

};


module.exports = groupsApi;

// console.log(groupsApi.createGroup());

// var theUser;
// console.log(usersApi.loginUser('ouchunyu@yahoo.com', 'ouchunyu').then((res) => {
//   usersApi.getUserByEmail("ouchunyu@yahoo.com").then((res) => {theUser = res.val(); console.log(theUser); console.log(groupsApi.leaveGroup('-KHqf2KiolbegdEhXHuy', '-KHqnEDOZooM73dbntxm'))})

//   console.log("*****************************************************");
//   // console.log();
// }));

// new Firebase('https://ralli.firebaseio.com/users/-KHqf2KiolbegdEhXHuy').once("value").then((res) => {
//       groupsApi.createGroup(res.val(), "asdfjlsdfsafssdafdasdsafsad");
//     })
