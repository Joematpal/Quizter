(function() {
  'use strict';
  angular
    .module('themoviequizzer', [
      'firebase',
      'ui.router'
    ])
    .config(function($stateProvider){

      var quizPageState = {
        name:'quizPage',
        url:'/quizPage',
        controller: 'quizCtrl',
        controlerAs: 'vm',
        templateUrl:'views/partials/quizPage.html'
      }

      $stateProvider.state(quizPageState);

    });


}());
