'use strict'

var firebase_config = {
  apiKey: 'AIzaSyCuase_Lxjipta7V2u3i_lk_BwXRuxGdrM',
  authDomain: 'project-4182143701827200211.firebaseapp.com',
  databaseURL: 'https://project-4182143701827200211.firebaseio.com',
  storageBucket: 'project-4182143701827200211.appspot.com'
}
firebase.initializeApp(firebase_config)

var app = angular.module('mainApp', 
  [ // Angular dependencies
    'ngRoute', 
    'firebase', 
    'ngMaterial', 
    'ngMdIcons'
  ]
)

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/pages/home.html',
    controller: 'homeController'
  })
  .when('/other', {
    templateUrl: '/pages/other.html',
    controller: 'otherController'
  })
  .when('/profile', {
    templateUrl: '/pages/profile.html',
    controller: 'profileController'
  })
  .when('/games', {
    templateUrl: '/pages/games.html',
    controller: 'gameListController'
  })
  .when('/game/:game_name', {
    templateUrl: '/pages/game.html',
    controller: 'gameController'
  })
  .when('/toc', {
    templateUrl: '/pages/toc.html'
  })
  .when('/game/:game_name/chat', {
    templateUrl: '/pages/chat.html',
    controller: 'chatController'
  })
  .when('/game/:game_name/player', {
    templateUrl: '/pages/player.html',
    controller: 'playerController'
  })
  .when('/game/:game_name/squad', {
    templateUrl: '/pages/squad.html',
    controller: 'squadController'
  })
  .otherwise({ redirectTo: '/' })

  $locationProvider.html5Mode(true)
})

app.factory ('Auth', function ($firebaseAuth) {
  return $firebaseAuth()
})

app.controller('mainAppController', function (
    $scope,
    $mdSidenav,
    $mdDialog,
    $location,
    $route,
    getCurrentGame,
    Auth
  ) {
  $scope.$route = $route
  $scope.isLoggedIn = false
  $scope.userDisplayName = 'Firstname Lastname'
  $scope.userEmail = 'person@example.com'
  $scope.userProfileUrl = ''
  $scope.auth = Auth

  $scope.toggleNav = function () {
    $mdSidenav('sidenav').toggle();
  }

  $scope.showNavButton = function () {
    var sidenav = $mdSidenav('sidenav')
    return !(sidenav.isLockedOpen() || sidenav.isOpen()) && $scope.isLoggedIn
  }

  $scope.viewUserProfile = function () {
    $location.path('profile')
  }

  $scope.viewPlayerProfile = function (game_name) {
    $location.path('game/' + game_name + '/player' )
  }

  $scope.auth.$onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser) {
      $scope.userDisplayName = firebaseUser.displayName
      $scope.userEmail = firebaseUser.email
      $scope.userProfileUrl = firebaseUser.photoURL

      getCurrentGame().then((game) => {
        if (game) {
          $scope.currentGame = game
          $scope.$apply()
        }
      })
    }
    $scope.isLoggedIn = firebaseUser != null
  })

  $scope.redirect = function (path) {
    $location.path(path)
  }

  $scope.openMenu = function ($mdOpenMenu, ev) {
    $scope.originEvent = ev
    $mdOpenMenu(ev)
  }
})

app.controller('otherController', function() {

})