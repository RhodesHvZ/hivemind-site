
/**
 * $game_name: {
 *   //meta
 *   name: { type: 'string', required: true }, // $game_name
 *   // relative uri of rules file.
 *   rules_document: { type: 'string', required: true },
 *   game_rules: {
 *     max_revive_count: { type: 'number', default: 1 }
 *   },
 *
 *   // dates
 *   registration_date: 'date',
 *   start_date: 'date',
 *   end_date: 'date',
 * 
 *   // flavour
 *   flavour_general: 'string',
 *   flavour_humans: 'string',
 *   flavour_zombies: 'string',
 * 
 *   // game data
 *   status: { 
 *     type: 'string', 
 *     enum: [
 *       'registration', 
 *       'in progress', 
 *       'finished', 
 *       'future'
 *     ] 
 *   },
 * 
 *   squads: {
 *     // for firebase indexing
 *     $squad_name: true
 *   },
 * 
 *   players: {
 *     $uid: true
 *   },
 * 
 *   map_config: {
 *     // map config
 *   }
 * }
 */

app.factory('GamesList', function ($firebaseArray, gamesRefFactory) {
  return $firebaseArray(gamesRefFactory())
})

app.factory('OrderedGamesList', function ($firebaseArray, orderedGamesRefFactory) {
  return $firebaseArray(orderedGamesRefFactory())
})

app.factory('Game', function ($firebaseObject, gameRefFactory) {
  return function (game) {
    return $firebaseObject(gameRefFactory(game))
  }
})

app.factory('gameStateToString', function () {
  return function (state) {
    switch (state) {
      case 'future':
        return 'Future'
      case 'registration':
        return 'Registration'
      case 'started':
        return 'In Progress'
      case 'finished':
        return 'Finished'
      default:
        return 'Future'
    }
  }
})

app.factory('getCurrentGame', function ($firebaseObject, currentGameRefFactory) {
  return currentGameRefFactory().then((gameRef) => {
    return gameRef ? $firebaseObject(gameRef) : null
  })
})
