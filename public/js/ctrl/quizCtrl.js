(function() {
  'use strict';
    angular.module('quizter')
      .controller('quizCtrl', quizCtrl);

      function quizCtrl(quizFcty, mainFcty, $state) {
        //Local Variables=======================================================
        var vm = this;

        getData();

        vm.test = function(){
            console.log('something', mainFcty.currentUser);
        }


        // vm.clicky = function(){
        //   //console.log('clicky')
        //   //$state.go('game');
        // }


        //======================================================================



        //====================================================================

        function getData() {
          quizFcty.getData();

        }



      }


}());
