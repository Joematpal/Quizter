(function() {
  'use strict';
  angular.module('quizter')
    .controller('authCtrl', authCtrl);

  function authCtrl ($state, userFcty) {
    var au = this;
    // var auth = firebase.auth();
    // var db = firebase.database();

    //have factory call this.



    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        $state.go('login');
        userFcty.currentUser = {};
      } else {

        userFcty.currentUser = {
          uid: firebase.auth().currentUser.uid,
          email: firebase.auth().currentUser.email
        };
console.log(userFcty.currentUser);
        if(userFcty.currentUser){
          $state.go('dashboard');
        }
      }
     });


    au.login = function() {
      userFcty.signIn();
      };

    au.logout = function(){
      userFcty.signOut();
    };




  }

}());
