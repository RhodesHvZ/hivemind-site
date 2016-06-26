
app.factory('limitedChatMessagesRefFactory', function (chatMessagesRefFactory) {
  return function (game, room) {
    return chatMessagesRefFactory(game, room).limitToLast(25)
  }
})
