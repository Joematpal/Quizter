(function() {
  'use strict';
    angular.module('quizter')
      .controller('quizCtrl', quizCtrl);

      function quizCtrl(quizFcty, mainFcty, $state) {
        //Global Variables=======================================================
        var vm = this;
        var inc = 0;


        vm.questionView = function(){
          vm.movieitem = quizFcty.movieList[inc];
          console.log(quizFcty.movieList[inc])
          //vm.movieitem[0];

        };

        vm.questionView();

        vm.gameManager = function() {
          console.log(quizFcty.movieList[1], typeof inc, inc);
          inc++;
          console.log(quizFcty.movieList[1], typeof inc, inc);
          vm.movieitem = quizFcty.movielist[inc];

          console.log(quizFcty.movieList[1], typeof inc, inc);
        }


      }


}());
