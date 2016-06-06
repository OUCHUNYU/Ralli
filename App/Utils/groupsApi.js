import usersApi from './usersApi'
import Firebase from 'firebase'
import messagesApi from './messagesApi'

let FirebaseGroupsUrl = 'https://ralli.firebaseio.com/groups';
let GroupRef = new Firebase(FirebaseGroupsUrl);

const groupsApi = {
  createGroup(currentUser, newGroupName, currentUserId) {
    // push a new group to the database
    return GroupRef.push({
      groupName: newGroupName,
      creator: currentUser.email,
      members: [currentUserId]
    }).then((res) => {
      // updating the user group array
      let groupId = res.key();
      if (currentUser.groups) {
        currentUser.groups.push({name: newGroupName, id: groupId});
        (new Firebase(`https://ralli.firebaseio.com/users/${currentUserId}`)).update({groups: currentUser.groups.slice(0)});
      }else {
        (new Firebase(`https://ralli.firebaseio.com/users/${currentUserId}`)).update({groups: [{name: newGroupName, id: groupId}]});
      }
    });
  },

  destroyGroup() {

  },

  joinGroup(groupId, newMemberId, groupName) {
    return new Firebase(FirebaseGroupsUrl + '/' + groupId).once("value").then((res) => {
      // getting all members of the group
      let groupMembers = res.val().members;
      // checking if the person being added in the group already
      if (groupMembers.indexOf(newMemberId) !== -1) {
        throw new Error('this user is in the group')
      }else {
        groupMembers.push(newMemberId);
        new Firebase(FirebaseGroupsUrl + '/' + groupId).update({members: groupMembers.slice(0)})

        // creating user ref to update
        let userRef = new Firebase('https://ralli.firebaseio.com/users/' + newMemberId)
        // updating the user's joined group
        userRef.once("value").then((res) => {
          // get all the groups of the user
          let newMemberObject = res.val().groups.slice(0)
          if(newMemberObject) {
            newMemberObject.push({id: groupId, name: groupName})
            userRef.update({groups: newMemberObject})
          }else {
            userRef.update({groups: [{id: groupId, name: groupName}]})
          }
        })
        // sending the feed
        messagesApi.chatRoomMessenger(newMemberId, groupName);
      }
    })
  },

  leaveGroup(currentUserId, groupId) {
    // delete group from user's joined group
    new Firebase('https://ralli.firebaseio.com/users/' + currentUserId).once('value').then((res) => {
      let myGroups = res.val().joinedGroups;
      let newFormedGroup = myGroups.slice(0, myGroups.indexOf(groupId)).concat(myGroups.slice(myGroups.indexOf(groupId) + 1));
      new Firebase('https://ralli.firebaseio.com/users/' + currentUserId).update({joinedGroups: newFormedGroup});
    })

    // delete users from group's members
    new Firebase('https://ralli.firebaseio.com/groups/' + groupId).once('value').then((res) => {
      let thisGroupMembers = res.val().members;
      let newFormedMembers = thisGroupMembers.slice(0, thisGroupMembers.indexOf(currentUserId)).concat(thisGroupMembers.slice(thisGroupMembers.indexOf(currentUserId) + 1));
      new Firebase('https://ralli.firebaseio.com/groups/' + groupId).update({members: newFormedMembers});
    })

  },

  addMessage(message, userId, chatRoomRef) {
    chatRoomRef.push({userId: userId, message: message});
  }

};

module.exports = groupsApi;

