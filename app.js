"use strict"

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    config = require('./config')

var sitePath = path.join(__dirname, config.siteDir)

var siteConfig = require(path.join(sitePath, 'config'))

var app = express()

// all environments
app.set('port', process.env.PORT || config.port || 3000)
app.set('views', path.join(sitePath, 'views'))
app.set('view engine', siteConfig.viewEngine || 'jade')
app.use(express.favicon(path.join(sitePath, 'public', 'favicon.ico')))
app.use(express.static(path.join(sitePath, 'public')))

app.use(app.router)

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}

app.get('/', routes.index)
app.get('/*', routes.others)

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
})