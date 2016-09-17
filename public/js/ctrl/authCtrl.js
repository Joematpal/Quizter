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
        userFcty.currentUser = firebase.auth().currentUser;
        console.log('authCtrl, currentUser', userFcty.currentUser);
        if(userFcty.currentUser){
          $state.go('dashboard');
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
