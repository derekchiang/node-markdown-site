"use strict"

var marked = require('marked'),
    path = require('path'),
    fs = require('fs'),
    config = require('../config')

var sitePath = path.join(__dirname, '..' + path.sep, config.siteDir)

var siteConfig = require(path.join(sitePath, 'config'))

function commonRender(res, url) {
  var pagePath = path.join(config.siteDir, "pages", url) + '.md'

  if (fs.existsSync(pagePath)) {
    fs.readFile(pagePath, 'utf8', function(err, data) {
      if (err) throw err
      res.render(siteConfig.baseView, {
        content: marked(data)
      })
    })
  } else {
    var path404 = path.join(config.siteDir, "pages", '404.md')
    fs.readFile(path404, 'utf8', function(err, data) {
      if (err) throw err
      res.render(siteConfig.baseView, {
        content: marked(data)
      })
    })
  }
}

exports.index = function(req, res) {
  commonRender(res, siteConfig.indexPage || 'index')
}

exports.others = function(req, res) {
  dir = req.url.split('/').join(path.sep)
  commonRender(res, dir)
}