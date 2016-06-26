
app.controller('playerController', function (
  $scope,
  $routeParams,
  Game,
  getCurrentPlayer,
  playerStateToString,
  rhodesResidences,
  rhodesHalls
) {
  $scope.show_secret = false
  $scope.loading_complete = false
  $scope.player = getCurrentPlayer($routeParams.game_name)
  $scope.game = Game($routeParams.game_name)
  $scope.rhodesResidences = rhodesResidences
  $scope.rhodesHalls = rhodesHalls

  Promise.all([
    $scope.player.$loaded(),
    $scope.game.$loaded()
  ]).then(function () {
    $scope.player.$bindTo($scope, 'player')
    $scope.loading_complete = true
    $scope.$apply()
  })

  $scope.playerState = function () {
    return playerStateToString($scope.player.game_state)
  }
})
