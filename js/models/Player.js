
/**
 * players: {
 *   $uid: {
 *     $game_name: {
 *       uid: { type: 'string', required: true }, // $uid
 *       game: { type: 'string', required: true }, // game_name
 *   
 *       // game mechanics
 *       secret: { type: 'string', default: 'generator()' },
 *       game_state: { type: 'string', enum ['human', 'zombie'] },
 *       revive_count: { type: 'number', default: 0 }
 *       revive_pending: { type: 'boolean', default: false },
 *       opt_out_oz: { type: 'boolean', default: false },
 *       opt_out_hvt: { type: 'boolean', default: false },
 *       punishment_level: { type: 'number', default: 0 },
 *       suspended_until: { 
 *         type: 'date', 
 *         default: 'now() + punishment_level * modifier' 
 *       },
 *       hvt_worth: 'number',
 *       hvt_until: 'date',
 *   
 *       // security stuff
 *       email_verified: { type: 'boolean', default: false },
 *       email_verification_code: { type: 'string', default: 'generator()' },
 *       attended_security_briefing: { type: 'boolean', default: false },
 *       last_event: 'string', // $event_id
 *   
 *       // player data
 *       display_name: { type: 'string', required: 'true' }
 *       picture: { type: 'string', default: '$uid.picture' }
 *       squad: 'string', // $squad_name
 *       hall: { type: 'string', enum: [ ... ] },
 *       residence: { type: 'string', enum: [ ... ] },
 *       last_words: 'string'
 *     }
 *   }
 * }
 */

app.factory('PlayerList', function ($firebaseArray, playersRefFactory) {
  return function (game) {
    return $firebaseArray(playersRefFactory(game))
  }
})

app.factory('Player', function ($firebaseObject, playerRefFactory) {
  return function (game, uid) {
    return $firebaseObject(playerRefFactory(game, uid))
  }
})

app.factory('getCurrentPlayer', function (Player, Auth) {
  var firebaseUser = Auth.$getAuth()
  return function (game) {
    return Player(game, firebaseUser.uid)
  }
})

app.factory('registerPlayer', function (playerRefFactory, getOrCreateProfile) {
  var profile = getOrCreateProfile()

  return function (game) {
    return playerRefFactory(game, profile.uid).set({
      uid: profile.uid,
      game: game,
      display_name: display_name,
      picture: picture
    })
  }
})

app.factory('displayNameService', function (playerRefFactory, $firebaseObject) {
  var players = {}

  return function (game, uid) {
    if (!players.game) {
      players.game = {}
    }
    if (!players.game.uid) {
      players.game.uid = $firebaseObject(playerRefFactory(game, uid))
    }
    return players.game.uid.$loaded().then(function (snapshot) {
      return snapshot.display_name
    })
  }
})

app.factory('playerStateToString', function () {
  return function (state) {
    switch (state) {
      case 'human':
        return 'Human'
      case 'zombie':
        return 'Zombie'
      case 'original-zombie':
        return 'Original Zombie'
      default:
        return 'None'
    }
  }
})
