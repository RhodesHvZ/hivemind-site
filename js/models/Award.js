
/**
 * awards: {
 *   $award_secret: {
 *     secret: { type: 'string', default: 'generator()' },
 *     points: { type: 'number', default: '$parent.default_points' },
 *     redeem_limit: { 
 *       type: 'number', 
 *       default: '$parent.default_redeem_limit' 
 *     },
 *     redeem_type: { 
 *       type: 'string', 
 *       enum: [
 *         'human', 
 *         'zombie', 
 *         'all'], 
 *       default: '$parent.default_redeem_type' 
 *     }
 *   }
 * }
 **/

app.factory('AwardList', function ($firebaseArray, awardsRefFactory) {
  return function (game, mission) {
    return $firebaseArray(awardsRefFactory(game, mission))
  }
})

app.factory('Award', function ($firebaseObject, awardRefFactory) {
  return function (game, mission, award) {
    return $firebaseObject(awardRefFactory(game, mission, award))
  }
})
