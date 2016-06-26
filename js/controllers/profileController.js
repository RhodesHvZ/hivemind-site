
app.factory('getOrCreateProfile', function (Auth, User, userRefFactory) {
  var firebaseUser = Auth.$getAuth()
  var profile = User(firebaseUser.uid)

  function createProfile() {
    return userRefFactory(firebaseUser.uid).set({
      uid: firebaseUser.uid,
      name: firebaseUser.displayName,
      username: firebaseUser.displayName,
      email: firebaseUser.email,
      picture: firebaseUser.photoURL,
      date_joined: firebase.database.ServerValue.TIMESTAMP
    })
  }

  return function () {
    return profile.$loaded().then(function (snapshot) {
      if (snapshot.$value === null) {
        return createProfile().then(function () {
          return profile
        })
      } else {
        return profile
      }
    })
  }
})

app.controller('profileController', function ($scope, getOrCreateProfile) {
  $scope.loading_complete = false

  var unbind = getOrCreateProfile().then(function (profile) {
    profile.$bindTo($scope, 'profile')
    $scope.loading_complete = true
  })
})
