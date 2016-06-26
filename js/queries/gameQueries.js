
app.factory('orderedGamesRefFactory', function (dbRefFactory) {
  return function () {
    return dbRefFactory().child('games').orderByChild('registration_date')
  }
})
