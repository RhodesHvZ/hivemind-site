
/**
 * squads: {
 *   $game_name: {
 *     $squad_name: {
 *       name: { type: 'string', required: true }, // $squad_name
 *       game: { type: 'string', required: true }, // $game_name
 * 
 *       members: {
 *         $uid: {
 *           rank: 'string',
 *           rank_order: 'number',
 *           admin: 'boolean',
 *           dead: { type: 'boolean', default: false },
 *         }
 *       },
 * 
 *       requests: {
 *         $uid: true
 *       },
 * 
 *       squad_points: { type: 'number', default: 0 },
 *       squad_bonus_redeemed: { type: 'number', default: 0 }
 *     }
 *   }
 * }
 */

app.factory('SquadList', function ($firebaseArray, squadsRefFactory) {
  return function (game) {
    return $firebaseArray(squadsRefFactory(game))
  }
})

app.factory('Squad', function ($firebaseObject, squadRefFactory) {
  return function (game, squad) {
    return $firebaseObject(squadRefFactory(game, squad))
  }
})
