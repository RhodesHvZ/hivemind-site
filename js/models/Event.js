
/**
 * events: {
 *   $game_name: {
 *     $event_id: {
 *       id: { type: 'string', required: true } // $event_id
 *       type: { type: string, enum: 
 *         [
 *           // Fill as needed
 *           'kill', // register kill
 *           'revive', // redeem a revive
 *           'redeem', // redeem a point voucher
 *           'ticket', // create/reply to a ticket
 *           'mark_hvt', // mark a new high_value target
 *           'distress', // create a distress marker on the map (h)
 *           'horde', // create a horde marker on the map (z)
 *           'announce',
 *           // etc.
 *           // 
 *           // this list is extendable and functionality for
 *           // additional events can be added dynamically.
 *           //
 *           // event feed is listened to by a server and logic is executed 
 *           // per event.
 *         ]
 *       },
 *       subject: { type: 'string', required: true }, // $uid
 *       timestamp: { type: 'date', default: 'now()' },
 *       secret: 'string',
 *       player_notes: 'string',
 *       geo: 'string' // gps location
 *       data: { ... } // per event type
 *     }
 *   }
 * }
 */

app.factory('EventList', function ($firebaseArray, eventsRefFactory) {
  return function (game) {
    return $firebaseArray(eventsRefFactory(game))
  }
})

app.factory('Event', function ($firebaseObject, eventRefFactory) {
  return function (game, event) {
    return $firebaseObject(eventRefFactory(game, event))
  }
})
