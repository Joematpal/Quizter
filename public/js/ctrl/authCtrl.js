(function() {
  'use strict';
  angular.module('quizter')
    .controller('authCtrl', authCtrl);

  function authCtrl ($state, userFcty) {
    var au = this;
    //

    var usersRef = firebase.database().ref('users');

    // Listen for auth state changes
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        $state.go('login');
      } else {
        userFcty.currentUser = {
          name: '',
          email: firebase.auth().currentUser.email,
          uid:firebase.auth().currentUser.uid,
        };

        if(userFcty.currentUser){
          $state.go('home');
        }


      }

     });


    au.login = function() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);

      };

    au.tester = function(){
    console.log(userFcty.currentUser);
    }




  }

}());
