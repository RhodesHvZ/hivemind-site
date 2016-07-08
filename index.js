var express = require('express')
var path = require('path')
var cwd = process.cwd()
var app = express()

app.use('/bower_components', express.static('bower_components'))
app.use('/css', express.static('css'))
app.use('/img', express.static('img'))
app.use('/js', express.static('js'))
app.use('/pages', express.static('pages'))
app.use('/img', express.static('img'))

app.get('*', function (req, res, next) {
  res.sendFile(path.join(cwd, 'index.html'))
})

//app.get('/', function (req, res, next) {
//  res.sendFile(path.join(cwd, 'index.html'))
//})

app.listen(3000)
