(function() {
  'use strict';
    angular.module('themoviequizzer')
      .controller('quizCtrl', quizCtrl);

      function quizCtrl(quizFcty, mainFcty) {
        //Local Variables=======================================================
        var vm = this;
        init();
        getData();

        vm.test = "does this work";


        //======================================================================



        //====================================================================

        function getData() {
          quizFcty.getData();
    
        }

        function init() {
          mainFcty.doTheyNeedToLogIn(false)
          vm.areTheyLoggedIn = mainFcty.needLogIn;
          mainFcty.doTheyNeedGameToStart(false)
          vm.isGameStarted = mainFcty.needGameStart;

        }


      }


}());
