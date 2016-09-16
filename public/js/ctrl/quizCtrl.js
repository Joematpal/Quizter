(function() {
  'use strict';
    angular.module('quizter')
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



      }


}());
