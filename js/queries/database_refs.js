
app.factory('dbRefFactory', function () {
  return function () {
    return firebase.database().ref()
  }
})

app.factory('gamesRefFactory', function (dbRefFactory) {
  return function () {
    return dbRefFactory().child('games')
  }
})

app.factory('usersRefFactory', function (dbRefFactory) {
  return function () {
    return dbRefFactory().child('users')
  } 
})

app.factory('achievementsRefFactory', function (dbRefFactory) {
  return function () {
    return dbRefFactory().child('achievements')
  }
})

app.factory('squadsRefFactory', function (dbRefFactory) {
  return function (game) {
    return dbRefFactory().child('squads').child(game)
  } 
})

app.factory('achievementRefFactory', function (achievementsRefFactory) {
  return function (achievement) {
    return achievementsRefFactory().child(achievement)
  }
})

app.factory('achievementsProgressRefFactory', function (dbRefFactory) {
  return function (uid) {
    return dbRefFactory().child('achievements_progress').child(uid)
  }
})

app.factory('playersRefFactory', function (dbRefFactory) {
  return function (game) {
    return dbRefFactory().child('players').child(game)
  } 
})

app.factory('chatRefFactory', function (dbRefFactory) {
  return function (game) {
    return dbRefFactory().child('chat').child(game)
  } 
})

app.factory('gameRefFactory', function (gamesRefFactory) {
  return function (game) {
    return gamesRefFactory().child(game)
  }
})

app.factory('eventsRefFactory', function (dbRefFactory) {
  return function (game) {
    return dbRefFactory().child('events').child(game)
  }
})

app.factory('missionsRefFactory', function (dbRefFactory) {
  return function (game) {
    return dbRefFactory().child('missions').child(game)
  }
})

app.factory('markersRefFactory', function (dbRefFactory) {
  return function (game) {
    return dbRefFactory().child('markers').child(game)
  }
})

app.factory('ticketsRefFactory', function (dbRefFactory) {
  return function (game) {
    return dbRefFactory().child('tickets').child(game)
  }
})

app.factory('playerRefFactory', function (playersRefFactory) {
  return function (game, uid) {
    return playersRefFactory(game).child(uid)
  } 
})

app.factory('userRefFactory', function (usersRefFactory) {
  return function (uid) {
    return usersRefFactory().child(uid)
  }
})

app.factory('markerRefFactory', function (markersRefFactory) {
  return function (game, marker) {
    return markersRefFactory(game).child(marker)
  }
})

app.factory('achievementProgressRefFactory', function (achievementsProgressRefFactory) {
  return function (uid, achievement) {
    return achievementsProgressRefFactory(uid).child(achievement)
  }
})

app.factory('missionRefFactory', function (missionsRefFactory) {
  return function (game, mission) {
    return missionsRefFactory(game).child(mission)
  }
})

app.factory('squadRefFactory', function (squadsRefFactory) {
  return function (game, squad) {
    return squadsRefFactory(game).child(squad)
  } 
})

app.factory('eventRefFactory', function (eventsRefFactory) {
  return function (game, event) {
    return eventsRefFactory(game).child(event)
  }
})

app.factory('awardsRefFactory', function (dbRefFactory) {
  return function (game, mission) {
    return dbRefFactory().child('awards').child(game).child(mission)
  }
})

app.factory('awardRefFactory', function (awardsRefFactory) {
  return function (game, mission, award) {
    return awardsRefFactory(game, mission).child(award)
  }
})

app.factory('chatRoomsRefFactory', function (chatRefFactory) {
  return function (game) {
    return chatRefFactory(game).child('room_metadata')
  }
})

app.factory('chatRoomRefFactory', function (chatRoomsRefFactory) {
  return function (game, room) {
    return chatRoomsRefFactory(game).child(room)
  }
})

app.factory('chatMessagesRefFactory', function (chatRefFactory) {
  return function (game, room) {
    return chatRefFactory(game).child('room_messages').child(room)
  }
})

app.factory('chatMessageRefFactory', function (chatMessagesRefFactory) {
  return function (game, room, message) {
    return chatMessagesRefFactory(game, room).child(message)
  }
})

app.factory('ticketsMetaRefFactory', function (ticketsRefFactory) {
  return function (game) {
    return ticketsRefFactory(game).child('ticket_metadata')
  }
})

app.factory('ticketMessagesRefFactory', function (ticketsRefFactory) {
  return function (game, ticket) {
    return ticketsRefFactory(game).child('ticket_messages').child(ticket)
  }
})

app.factory('ticketMetaRefFactory', function (ticketsMetaRefFactory) {
  return function (game, ticket) {
    return ticketsMetaRefFactory(game).child(ticket)
  }
})

app.factory('ticketMessageRefFactory', function (ticketMessagesRefFactory) {
  return function (game, ticket, message) {
    return ticketMessagesRefFactory(game, ticket).child(message)
  }
})
