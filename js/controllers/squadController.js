
app.controller('squadController', function (
  $scope,
  $routeParams,
  getCurrentPlayer,
  Game,
  SquadList
) {
  $scope.loading_complete = false
  $scope.game = Game($routeParams.game_name)
  $scope.player = getCurrentPlayer($routeParams.game_name)
  $scope.squads = SquadList($routeParams.game_name)

  Promise.all([
    $scope.game.$loaded(),
    $scope.player.$loaded(),
    $scope.squads.$loaded()
  ]).then(function () {
    $scope.loading_complete = true
    $scope.$apply()
  })


})