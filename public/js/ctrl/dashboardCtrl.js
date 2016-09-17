(function() {
  'use strict';
    angular.module('quizter')
      .controller('dashboardCtrl', dashboardCtrl);

      function dashboardCtrl(mainFcty, quizFcty, userFcty, $state, $rootScope){
        var dashboard = this;

        dashboard.getGenreList = getGenreList;
        dashboard.getCategoryList = getCategoryList;
        dashboard.getDecadeList = getDecadeList;
        dashboard.getTropeList = getTropeList;
        // var plainRef = firebase.database().ref().child('object');
        // plainRef.on('value', snap => console.log(snap.val()));
        //
        dashboard.initGame = function(hash){
          console.log(hash);
          quizFcty.getData(hash);
          //$state.go('game');
          //var usersRef = firebase.database().ref('users').child(userFcty.currentUser.uid);

          //usersRef.update(userFcty.currentUser);
          //console.log(userFcty.currentUser);
          //userFcty.currentUser.name
        }

        var usersChildRef = firebase.database().ref('users/'+userFcty.currentUser.uid);
        //console.log('userRef',usersChildRef);
        usersChildRef.on('value', snap => {
          dashboard.usersNode = snap.val()
          //JSON.stringify(snap.val(), null, 3);
          //console.log('What is this',dashboard.usersNode);
        });

        function getGenreList(){
            quizFcty.getGenreList()
              .then(function(results){
                dashboard.genreList = results.data.genres;
              })
          }

        function getCategoryList(){
            dashboard.categoryList = quizFcty.getCategoryList();
          }

        function getDecadeList(){
          dashboard.decadeList = quizFcty.getDecadeList();
        }

        function getTropeList(){
          return
        }

        function init(){
          userFcty.canIbeHere();
          dashboard.currentUser = userFcty.currentUser;
          dashboard.getDecadeList();
          dashboard.getGenreList();
          dashboard.getCategoryList();
        }
        init();

      }
}());
