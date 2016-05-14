var Firebase = require('firebase');

var FirebaseUsersUrl = 'https://ralli.firebaseio.com';

var UsersRef = new Firebase(FirebaseUsersUrl);


var usersApi = {
  createNewUser: function(userEmail, userPassword) {
   return UsersRef.createUser({
      email    : userEmail,
      password : userPassword
    }, (err, newUserData) => {
      if (err) {
        console.log("Fail sigup");
        return err;
      } else {
        // login new user upon creation
        UsersRef.authWithPassword({
          email: userEmail,
          password: userPassword
        }, (err, authData) => {
          if (err) {
            console.log("Login Failed");
            return err;
          }else {
            console.log("Login");
            return authData;
          }
        }, {remember: "sessionOnly"});
      }
    });
  },

  loginUser: function(userEmail, userPassword) {
    return UsersRef.authWithPassword({
      email    : userEmail,
      password : userPassword
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed");
        return error;
      }else {
        console.log('success');
        return authData;
      }
    }, {
      remember: "sessionOnly"
    });
  }
}

module.exports = usersApi;

