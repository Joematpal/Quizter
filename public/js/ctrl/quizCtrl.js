(function() {
  'use strict';
    angular.module('quizter')
      .controller('quizCtrl', quizCtrl);

      function quizCtrl(quizFcty, mainFcty, $state) {
        //Local Variables=======================================================
        var vm = this;

        getData();

        vm.test = "does this work";

        vm.clicky = function(){
          console.log('clicky')
          //$state.go('game');
        }


        //======================================================================



        //====================================================================

        function getData() {
          quizFcty.getData();

        }



      }


}());
