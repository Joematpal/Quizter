(function() {
  'use strict';
  angular.module('quizter')
    .controller('authCtrl', authCtrl);

  function authCtrl ($state, userFcty) {
    var au = this;
    //


    // Listen for auth state changes
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {

      }
     });


    au.login = function() {

      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);

      };

    au.tester = function(){
    //  $rootScope.currentUser = firebase.auth().currentUser.uid;
      console.log(au.currentUser)
    }




  }

}());
