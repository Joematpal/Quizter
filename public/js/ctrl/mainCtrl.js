(function() {
  'use strict';
  angular.module('quizter')
    .controller('mainCtrl', mainCtrl);

  function mainCtrl(mainFcty, quizFcty, userFcty, $state, $rootScope) {
    var main = this;
    init();

    // var plainRef = firebase.database().ref().child('object');
    // plainRef.on('value', snap => console.log(snap.val()));
    //
    main.clicky = function(){
      //$state.go('game');
      var usersRef = firebase.database().ref('users').child(userFcty.currentUser.uid);

      usersRef.update(userFcty.currentUser);
      //console.log(userFcty.currentUser);
      //userFcty.currentUser.name

    }

    var usersChildRef = firebase.database().ref('users/'+userFcty.currentUser.uid);
    console.log('userRef',usersChildRef);
    usersChildRef.on('value', snap => {

      main.usersNode = snap.val()
      //JSON.stringify(snap.val(), null, 3);
      console.log('What is this',main.usersNode);
    });


    function init(){
      userFcty.canIbeHere();

    }




  }


}());
