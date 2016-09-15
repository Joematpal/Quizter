(function() {
  'use strict';
  angular
    .module('themoviequizzer', [
      'firebase',
      'ui.router'
    ])
    .config(function( $stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise("/");

      $stateProvider
        .state('home', {
          name:'home',
          url:'/',
          controlerAs: 'vm',
          controller: 'mainCtrl',
          templateUrl: './views/partials/home.html'
      })
        .state('login', {
          name:'login',
          url:'login',
          controllerAs: 'vm',
          controler: 'authCtrl',
          templateUrl: './views/parials/login.html'
        })
        .state('game', {
          name:'game',
          url:'game',
          controllerAs: 'vm',
          controler: 'quizCtrl',
          templateUrl: './views/parials/game.html'
        })
      ;

    });


}());
