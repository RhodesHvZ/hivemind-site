
/**
 * tickets: {
 *   $game_name: {
 *     $ticket_id: {
 *       id: { type: 'string', required: true },
 *       owner: { type: 'string', required: true }, // $uid
 *       status: { 
 *         type: 'string', 
 *         enum: [
 *           'new', 
 *           'open', 
 *           'closed', 
 *           'to_review'
 *         ], 
 *         default: 'new' 
 *       },
 *       category: { type: 'string', enum: [ ... ] }, // TODO enum
 *       // most tickets should be publicly visible.
 *       private: { type: 'boolean', default: false },
 *       assigned: {
 *         $uid: true // uid of admins assigned
 *       },
 *       messages: {
 *         uid: { type: 'string', required: true }, // $uid
 *         title: 'string',
 *         message: 'string',
 *         attachments: {
 *           $attachment_title: 'string' // attachment URI
 *         }
 *       }
 *     }
 *   }
 * }
 */

app.factory('TicketList', function ($firebaseArray, ticketsMetaRefFactory) {
  return function (game) {
    return $firebaseArray(ticketsRefFactory(game))
  }
})

app.factory('TicketMessages', function ($firebaseArray, ticketMessagesRefFactory) {
  return function (game, ticket) {
    return $firebaseArray(ticketMessagesRefFactory(game, ticket))
  }
})

app.factory('TicketMessage', function ($firebaseObject, ticketMetaRefFactory) {
  return function (game, ticket, message) {
    return $firebaseObject(ticketMessageRefFactory(game, ticket, message))
  }
})

app.factory('Ticket', function ($firebaseObject, ticketMetaRefFactory) {
  return function (game, ticket) {
    return $firebaseObject(ticketMetaRefFactory(game, ticket))
  }
})
