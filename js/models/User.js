
/**
 * users: {
 *   $uid: {
 *     username: { type: 'string', required: true },
 *     name: { type: 'string', required: true }, // from google auth
 *     email: { type: 'string', required: true }, // from google auth
 *     picture: { type: 'string', required: true }, // from google auth
 *     student_email: 'string',
 *     date_joined: { type: 'date', default: 'now()' },
 *     phone_number: 'string',
 *     android_id: 'string',
 * 
 *     // Security stuff
 *     email_verified: { type: 'boolean', default: false },
 *     email_verification_code: 'string',
 *     is_superuser: { type: 'boolean', default: false },
 *     is_admin: {
 *       $game_name: true
 *     }
 *   }
 * }
 */

app.factory('User', function ($firebaseObject, userRefFactory) {
  return function (uid) {
    return $firebaseObject(userRefFactory(uid))
  }
})
