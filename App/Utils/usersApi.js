var Firebase = require('firebase');
var FirebaseUsersUrl = 'https://ralli.firebaseio.com/users';
var UsersRef = new Firebase(FirebaseUsersUrl);

// To check user login state:
// firebase provides function #getAuth(), you can invoke it
// one the firebase reference to get current user. This works
// like checking a session[:user_id], but firebase returns the
// current user object

// To log a user out, invoke #unAuth() on the firebase reference

// to see the logging info uncomment the code on the bottom and
// npm <FILENAME> to see


var usersApi = {
  createNewUser: function(userEmail, userPassword, userName) {
   return UsersRef.createUser({
            email    : userEmail,
            password : userPassword
          }, (err, newUserData) => {
            if (err) {
              console.log("Fail sigup");
            }
          })
  },

  loginUser: function(userEmail, userPassword) {
    return UsersRef.authWithPassword({
              email    : userEmail,
              password : userPassword
            }, function(error, authData) {
              if (error) {
                console.log("Login Failed");
              }else {
                console.log('success');
                return authData;
              }
            });
  },

  getUserByEmail: function(email) {
    return new Firebase('https://ralli.firebaseio.com').child('users').orderByChild('email').equalTo(email.toLowerCase()).once('value');
  },

  getCurrentUser: function() {
    return UsersRef.getAuth();
  }
}

module.exports = usersApi;





// var theUser;
// console.log(usersApi.loginUser('gum@gum.com', 'gumerlock').then((res) => {
//   theUser = UsersRef.getAuth();
//   console.log("*****************************************************");
//   console.log(theUser);
//   console.log("************************* LOGING OUT ****************************");
//   UsersRef.unauth();
//   console.log("*****************************************************");
//   console.log(UsersRef.getAuth());
// }));
// usersApi.loginUser("ouchunyu123@yahoo.com", "ouchunyu123").then((res) => {console.log(res)});
// console.log(usersApi.getUserByEmail("Ouchunyu123@yahoo.com").then((res) => {console.log(Object.keys(res.val())[0])}).catch((err) => {console.log("user not found")}))

// get the actuall user object
// var obj = { first: 'someVal' };
// obj[Object.keys(obj)[0]];
