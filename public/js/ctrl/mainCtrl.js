(function() {
  'use strict';
  angular.module('themoviequizzer')
    .controller('mainCtrl', mainCtrl);

  function mainCtrl(mainFcty, quizFcty, $firebaseObject, $firebaseArray, $firebaseAuth, firebaseRoot) {
    var vm = this;

    //mainFcty.logInBool();

    ///mainFcty.doTheyNeedToLogIn(true)
    vm.areTheyLoggedIn = mainFcty.needLogIn;
    vm.isGameStarted = mainFcty.needGameStart;
    vm.logIn = logIn;
    vm.goToGamePage = goToGamePage;

    function logIn() {
      mainFcty.doTheyNeedToLogIn(false)
      vm.areTheyLoggedIn = mainFcty.needLogIn;
      mainFcty.doTheyNeedGameToStart(true)
      vm.isGameStarted = mainFcty.needGameStart;
    }

    function goToGamePage() {
      vm.isGameStarted = mainFcty.doTheyNeedGameToStart(false);
      //initalize a function to find start th get data


    }



    //var storage = firebase.storage();
    //var storageRef = storage.ref();


  }


}());
