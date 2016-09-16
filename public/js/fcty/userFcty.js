(function() {
  'use strict';
    angular.module('quizter')
      .factory('userFcty', userFcty);

      function userFcty($state){

        return {
          currentUser: 'undefined',
          canIbeHere: canIbeHere
        }

        function canIbeHere(){
          if (this.currentUser == 'undefined'){
            $state.go('login');
          }
        }


      }
}());
