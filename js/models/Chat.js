
/**
 * chat:
 *   $game_name: {
 *     room_metadata: {
 *       $room_name: {
 *         name: { type: 'string', required: true }, // $room_name
 *         admin: {
 *           $uid: true
 *         },
 *         restrict: {
 *           type: 'string',
 *           enum: [
 *             'human',
 *             'zombie',
 *             'admin'
 *           ]
 *         },
 *         squad: $squad_name,
 *         password: 'string',
 *         type: { 
 *           type: 'string', 
 *           enum: [
 *             'public',
 *             'private',
 *             'squad'
 *           ],
 *           required: 'true'
 *         }
 *       }
 *     },
 *     room_messages: {
 *       $room_name: {
 *         $message_id: {
 *           id: { type: 'string', default: 'generator()' }, // $message_id
 *           uid: { type: 'string', required: true }, // $uid
 *           room: { type: 'string', required: true }, // $room_name
 *           message: { type: 'string', required: true },
 *           timestamp: { type: 'date', default: 'now()' },
 *         }
 *       }
 *     }
 *   }
 * }
 */

app.factory('ChatRoomList', function ($firebaseArray, chatRoomsRefFactory) {
  return function (game) {
    return $firebaseArray(chatRoomsRefFactory(game))
  }
})

app.factory('ChatRoom', function ($firebaseObject, chatRoomRefFactory) {
  return function (game, room) {
    return $firebaseObject(chatRoomRefFactory(game, room))
  }
})

app.factory('ChatRoomMessages', function ($firebaseArray, limitedChatMessagesRefFactory) {
  return function (game, room) {
    return $firebaseArray(limitedChatMessagesRefFactory(game, room))
  }
})

app.factory('ChatMessage', function ($firebaseObject, chatMessageRefFactory) {
  return function (game, room, message) {
    return $firebaseObject(chatMessageRefFactory(game, room, message))
  }
})

app.factory('checkChatRoomRestriction', function () {
  return function (player, room) {
    switch (room.restrict) {
      case 'zombie':
        return player.game_state === 'zombie' || player.game_state === 'original-zombie'
      case 'human':
        return player.game_state === 'human'
    }
  }
})

app.factory('checkChatRoomType', function (Squad) {
  return function (player, room) {
    switch (room.type) {
      case 'public':
        return true
      case 'private':
        return ((room.members && room.members[player.uid]) 
          || (room.admin && room.admin[player.uid]))
      case 'squad':
        if (room.squad && room.game) {
          var squad = Squad(room.squad, room.game)
          return squad.members && squad.members[player.uid]
        }
        return false
    }
  }
})

app.factory('checkRoomPermission', function (checkChatRoomRestriction, checkChatRoomType) {
  return function (player, room) {
    return checkChatRoomRestriction(player, room) && checkChatRoomType(player, room)
  }
})
