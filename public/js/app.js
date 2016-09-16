(function() {
  'use strict';
  angular
    .module('quizter', [
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
          data: {
            requireLogin: true
          },
          templateUrl: './views/partials/home.html'
        })
        .state('login', {
          name:'login',
          parent: "home",
          url:'login',
          controllerAs: 'au',
          controller: 'authCtrl',
          data: {
            requireLogin: false
          },
          templateUrl: './views/partials/login.html'
        })
        .state('game', {
          name:'game',
          parent: "home",
          url:'game',
          controllerAs: 'vm',
          controller: 'quizCtrl',
          data: {
            requireLogin: true
          },
          templateUrl: './views/partials/game.html'
        })
        .state('profile', {
          name:'profile',
          url:'profile',
          parent:'home',
          controllerAs: 'vm',
          controller: 'mainCtrl',
          data: {
            requireLogin: true
          },
          templateUrl: './views/partials/profile.html'
        })
      ;

    })
    .run(function($rootScope){
      console.log($rootScope);
      
    });


}());
