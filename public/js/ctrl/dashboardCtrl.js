(function() {
  'use strict';
    angular.module('quizter')
      .controller('dashboardCtrl', dashboardCtrl);

      function dashboardCtrl(mainFcty, quizFcty, userFcty, $state, $rootScope, $scope){
        var dashboard = this;
        var auth = firebase.auth();
        var db = firebase.database();
        firebase.auth().onAuthStateChanged(function(user){
          if (!user){
            $state.go('login');
          } else {

          }
        })

        var userId = dashboard.UID;


        dashboard.getGenreList = getGenreList;
        dashboard.getCategoryList = getCategoryList;
        dashboard.getDecadeList = getDecadeList;
        dashboard.getTropeList = getTropeList;

        dashboard.editUser = false;
        dashboard.editUserBtn = editUserBtn;
        dashboard.getUserFromModal = getUserFromModal;
        dashboard.currentUser = userFcty.currentUser;
        dashboard.logout = logout;



        dashboard.initGame = function(hash){
          quizFcty.publishTheQuestions(hash)
            .then(function(results){
              quizFcty.movieList = results;
              $state.go('game');
            })
            .catch(function(err){
              console.log(err);
            });

        }

        function logout(){
          auth.signOut();
        }

        function editUserBtn(){
          return dashboard.editUser = !dashboard.editUser;
        }

        function getUserFromModal(userModal){
          userFcty.updateUserProfile(userModal, dashboard.currentUser.uid);
          dashboard.editUser = false;
        }

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
          dashboard.tropeList = quizFcty.getTropeList();
        }

        function init(){
          dashboard.getDecadeList();
          dashboard.getGenreList();
          dashboard.getCategoryList();
          dashboard.getTropeList();

          userFcty.userProfile.email = userFcty.currentUser.email;
          dashboard.userProfile = userFcty.userProfile;

          function getProfile(uid){
            var profileUser = db.ref('profiles/' + uid);
            //watch on value of uid of profiles
            profileUser.on('value', snap => {
              userFcty.userProfile = snap.val();
              dashboard.userProfile = userFcty.userProfile;
              $scope.$apply();
            });
          }
          getProfile(dashboard.currentUser.uid);

        }

        init();
      }
}());
