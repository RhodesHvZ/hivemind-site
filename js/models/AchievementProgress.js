
/**
 * achievements_progress: {
 *   $uid: {
 *     $achievement_name: {
 *       complete: { type: 'boolean', default: false },
 *       $data_item_name: {
 *         name: { type: 'string', required: true }, // $data_item_name
 *         title: { type: 'string', required: true },
 *         description: 'string',
 *         progress: { type: 'number', default: 0 },
 *         goal: { type: 'number', required: true },
 *       }
 *       // data dynamic per achievement
 *     }
 *   }  
 * }
 */

app.factory('AchievementProgressList', function ($firebaseArray, achievementsProgressRefFactory) {
  return function (uid) {
    return $firebaseArray(achievementsProgressRefFactory(uid))
  }
})

app.factory('AchievementProgress', function ($firebaseObject, achievementProgressRefFactory) {
  return function (uid, achievement) {
    return $firebaseObject(achievementProgressRefFactory(uid, achievement))
  }
})
