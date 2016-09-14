(function() {
  'use strict';
  angular.module('themoviequizzer')
    .factory('mainFcty', mainFcty);

  function mainFcty($http, $q){


  return {
    doTheyNeedToLogIn: doTheyNeedToLogIn,
    doTheyNeedGameToStart: doTheyNeedGameToStart,
    needLogIn: false,
    needGameStart: true,
    //logInBool: logInBool


  }

  // function logInBool () {
  //   if( !!firebase.auth().currentUser.uid ) {
  //     this.needLogIn = true;
  //     $window.location.href = '/#/quizPage.html';
  //   } else {
  //     this.needLogIn = false;
  //   }
  // }

  function doTheyNeedToLogIn(value) {
    this.needLogIn = value;
  }

  function doTheyNeedGameToStart(value) {
    this.needGameStart = value;
  }


  var config = {
    apiKey: "AIzaSyC6zO6jRAwUZXZdLzkCaY8IpebKRCJ75fc",
    authDomain: "movie-quizzer.firebaseapp.com",
    databaseURL: "https://movie-quizzer.firebaseio.com",
    storageBucket: "movie-quizzer.appspot.com",
  };
  firebase.initializeApp(config);


  }
}());
