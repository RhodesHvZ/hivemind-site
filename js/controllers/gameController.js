
app.controller('gameListController', function ($scope, $location, OrderedGamesList, gameStateToString) {
  $scope.loading_complete = false
  $scope.games = OrderedGamesList

  $scope.games.$loaded().then(function () {
    $scope.loading_complete = true
  })

  $scope.gameState = function (game) {
    return gameStateToString(game.status)
  }

  $scope.viewGame = function (game) {
    $location.path('/game/' + game.name)
  }
})

app.controller('gameController', function (
  $scope, 
  $routeParams, 
  Game, 
  getCurrentPlayer, 
  gameStateToString, 
  registerPlayer
) {
  $scope.loading_complete = false
  $scope.player = getCurrentPlayer($routeParams.game_name)
  $scope.game = Game($routeParams.game_name)

  Promise.all([
    $scope.player.$loaded,
    $scope.game.$loaded
  ]).then(function () {
    $scope.loading_complete = true
  })

  // mockup Player Stats data
  $scope.game_stats = [
    {
      title: 'Total Players',
      data: 9001
    },
    {
      title: 'Humans',
      data: 1
    }
  ]

  $scope.registerForGame = function () {
    registerPlayer($scope.game.name)
  }

  $scope.gameState = function () {
    return gameStateToString($scope.game.status)
  }
})
