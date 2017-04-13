'use strict';

var config  = require('../config');
var http    = require('http');
var express = require('express');
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var morgan  = require('morgan');
var proxyMiddleware = require('http-proxy-middleware');

gulp.task('server', function() {

  var server = express();

//    server.set('trust proxy', true);

  // log all requests to the console
  server.use(morgan('dev'));

    var context = ["/frequencies/deploy"];

    var options = {
       // target: 'http://dsbgchop31.standardbank.co.za:443',
       //  target: 'https://dchop35.standardbank.co.za:443',
       target: 'http://demoncat.standardbank.co.za/',
        changeOrigin: false,
        secure: false,
        router :{}
//        proxyTable: {
            // when request.headers.host == 'dev.localhost:3000',
            // override target 'http://www.example.org' to 'http://localhost:8000'
            //'dev.localhost:3000' : 'http://localhost:8000',
            //'https://dchop35.standardbank.co.za:443': 'http://localhost:443'
//        }
    };
    var proxy = proxyMiddleware(context, options);

    //var proxy = proxyMiddleware('/di', {target: 'https://dchop35.standardbank.co.za:443/di'});

  server.use(express.static(config.dist.root));
    server.use(proxy);

  // Serve index.html for all routes to leave routing up to Angular
  server.all('/*', function(req, res) {
      res.sendFile('index.html', { root: 'build' });
  });

  // Start webserver if not already running
  var s = http.createServer(server);
  s.on('error', function(err){
    if(err.code === 'EADDRINUSE'){
      gutil.log('Development server is already started at port ' + config.serverPort);
    }
    else {
      throw err;
    }
  });

  s.listen(config.serverPort);

});