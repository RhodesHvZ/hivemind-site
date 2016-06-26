
/**
 * missions: {
 *   $game_name: {
 *     $mission_name: {
 *       name: { type: 'string', required: true }, // $mission_name
 *       geo: { type: 'string', required: true }, // gps location for marker
 *       start_date: { type: 'date', required: true },
 *       end_date: { type: 'date', required: true },
 *       default_points: { type: 'number', default: 1 },
 *       default_redeem_limit: { type: 'number', default: 1},
 *       default_redeem_type: { 
 *         type: 'string', 
 *         enum: [
 *           'human', 
 *           'zombie', 
 *           'all'
 *         ], 
 *         default: 'all' 
 *       }
 *     }
 *   }
 * }
 */

app.factory('MissionList', function ($firebaseArray, missionsRefFactory) {
  return function (game) {
    return $firebaseArray(missionsRefFactory(game))
  }
})

app.factory('Mission', function ($firebaseObject, missionRefFactory) {
  return function (game, mission) {
    return $firebaseObject(missionRefFactory(game, mission))
  }
})
