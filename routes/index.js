"use strict"

var marked = require('marked'),
    path = require('path'),
    fs = require('fs'),
    config = require('../config'),
    Fiber = require('fibers'),
    Future = require('fibers/future')

var sitePath = path.join(__dirname, '..' + path.sep, config.siteDir)

var siteConfig = require(path.join(sitePath, 'config'))

function simpleClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// Wrap functions in Future
var exists = function(path) {
  return Future.wrap(function(ret) {
    fs.exists(path, function(res) {
      ret(null, res)
    })
  }).call()
}

var readFile = Future.wrap(fs.readFile)

function commonRender(res, url) {
  var pagePath = path.join(config.siteDir, "pages", url) + '.md'

  Fiber(function() {
    if (exists(pagePath).wait()) {
      var data = readFile(pagePath, 'utf8').wait()
      var siteParams = simpleClone(siteConfig.siteParams) || {}
      siteParams.content = marked(data)
      res.render(siteConfig.baseView, siteParams)
    } else {
      var path404 = path.join(config.siteDir, "pages", '404.md')
      var data = readFile(path404, 'utf8').wait()
      var siteParams = siteConfig.siteParams || {}
      siteParams.content = marked(data)
      res.render(siteConfig.baseView, siteParams)
    }
  }).run()
}

exports.index = function(req, res) {
  commonRender(res, siteConfig.indexPage || 'index')
}

exports.others = function(req, res) {
  var dir = req.url.split('/').join(path.sep)
  commonRender(res, dir)
}