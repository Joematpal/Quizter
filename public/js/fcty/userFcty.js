(function() {
  'use strict';
    angular.module('quizter')
      .factory('userFcty', userFcty);

      function userFcty($state){
        var auth = firebase.auth();
        var db = firebase.database();

        return {
          currentUser: 'undefined',
          signIn: signIn,
          signOut: signOut,
          userProfile: {},
          getUserProfile: getUserProfile,
          updateUserProfile: updateUserProfile,

        }

        function signIn(){
          var provider = new firebase.auth.GoogleAuthProvider();
          auth.signInWithRedirect(provider);
        }

        function signOut(){
          auth.signOut();
        }

        function getUserProfile(uid){
          // var userProfilesRef = db.ref('profiles/' + uid);
          // userProfilesRef.on('value', snap => {
          //   this.usersProfile = snap.val();
          //   console.log(this.userProfile)
          //   //$scope.$apply();
          // });
        }

        function updateUserProfile(obj, uid){
           console.log('fcty', obj);
          console.log('update', uid)
          var profilesRef = db.ref('profiles/' + uid);
          profilesRef.update(obj);
        }

      }
}());
