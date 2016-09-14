(function() {
  'use strict';
  angular.module('themoviequizzer')
    .controller('authCtrl', authCtrl);

  function authCtrl () {
    var lg = this;

    lg.clicker = function( ) {
      console.log('What is this email?', lg.user.email)
    }

    lg.login = function(email, password) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
      
      };



  }

}());
