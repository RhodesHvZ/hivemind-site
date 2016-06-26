
/**
 * achievements: {
 *   $achievement_name: {
 *     name: { type: 'string', required: true },
 *     title: { type: 'string', required: true },
 *     description: { type: 'string', required: true },
 *     picture: { type: 'string', required: true },
 *     owners: {
 *       $uid: true
 *     }
 *   }
 * }
 */

app.factory('AchievementList', function ($firebaseArray, achievementsRefFactory) {
  return function () {
    return $firebaseArray(achievementsRefFactory())
  }
})

app.factory('Achievement', function ($firebaseObject, achievementRefFactory) {
  return function (achievement) {
    return $firebaseObject(achievementRefFactory(achievement))
  }
})
