
app.factory('scrollToBottom', function () {
  return function (elem) {
    elem.scrollTop = elem.scrollHeight
  }
})

app.controller('chatController', function(
  $scope, 
  $routeParams, 
  Game, 
  getCurrentPlayer,
  displayNameService,
  ChatRoomList, 
  ChatRoom, 
  ChatRoomMessages,
  ChatMessage,
  scrollToBottom,
  checkRoomPermission
) {
  $scope.loading_complete = false
  $scope.chat_loading_complete = false
  $scope.chat = {
    room: null,
    messages: null
  }
  $scope.game = Game($routeParams.game_name)
  $scope.player = getCurrentPlayer($routeParams.game_name)
  $scope.rooms = ChatRoomList($routeParams.game_name)
  $scope.message_owners = {}
  $scope.chat_message = ''

  Promise.all([
    $scope.game.$loaded,
    $scope.player.$loaded,
    $scope.rooms.$loaded
  ]).then(function () {
    $scope.loading_complete = true
    $scope.viewPublicChat()
  })

  function scrollChatToBottom () {
    var elem = document.getElementById('chat_messages')
    scrollToBottom(elem)
  }

  $scope.viewRoom = function (room) {
    if (!room) { return }
    $scope.chat_loading_complete = false
    $scope.chat = {
      room: ChatRoom($scope.game.name, room),
      messages: ChatRoomMessages($scope.game.name, room)
    }
    Promise.all([
      $scope.chat.room.$loaded(),
      $scope.chat.messages.$loaded(),
    ]).then(function () {
      $scope.chat_loading_complete = true
      $scope.$apply()
      scrollChatToBottom()
    })
  }

  $scope.viewPublicChat = function () {
    var room
    if ($scope.player.game_state === 'human') {
      room = 'human-public'
    } else if ($scope.player.game_state === 'zombie') {
      room = 'zombie-public'
    }
    $scope.viewRoom(room)
  }

  $scope.lastRoom = function (room) {
    var last = $scope.rooms.pop()
    $scope.rooms.push(last)

    return room.name === last.name
  }

  $scope.getPlayerDisplayName = function (uid) {
    displayNameService($scope.game.name, uid).then(function (result) {
      $scope.message_owners[uid] = result
    })
  }

  $scope.checkRoomPermission = function (room) {
    var permission = checkRoomPermission($scope.player, room)
    return permission
  }

  $scope.sendMessage = function () {
    $scope.chat.messages.$add({
      game: $scope.game.name,
      message: $scope.chat_message,
      room: $scope.chat.room.name,
      timestamp: new Date().valueOf(),
      uid: $scope.player.uid
    }).then(function (ref) {
      var index = $scope.chat.messages.$indexFor(ref.key)
      $scope.chat.messages[index].id = ref.key
      $scope.chat.messages.$save(index)
      scrollChatToBottom()
    })
    $scope.chat_message = ''
  }
})
