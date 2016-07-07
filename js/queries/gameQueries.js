
app.factory('orderedGamesRefFactory', function (dbRefFactory) {
  return function () {
    return dbRefFactory().child('games').orderByChild('registration_date')
  }
})

app.factory('currentGameRefFactory', function (gamesRefFactory, gameRefFactory) {
  return function () {
    return new Promise((resolve, reject) => {
      var started = gamesRefFactory().orderByChild('status').equalTo('started')
      var registration = gamesRefFactory().orderByChild('status').equalTo('registration')

      new Promise((resolve, reject) => {
        started.once('value', (list) => {
          if (list.numChildren() > 0) {
            list.forEach((snapshot) => {
              if (snapshot.exists()) {
                resolve(snapshot.key)
              }
            })
          }
          registration.once('value', (list) => {
            if (list.numChildren() > 0) {
              list.forEach((snapshot) => {
                if (snapshot.exists()) {
                  resolve(snapshot.key)
                }
              })
            }
            resolve()
          })
        })
      }).then((result) => {
        resolve(gameRefFactory(result))
      }).catch(() => {
        resolve(null)
      })
    })
  }
})
