(function(){
  "use strict";
  /**
   * Module dependencies.
   */

  var express = require('express'),
      routes = require('./routes'),
      user = require('./routes/user'),
      schemas = require("./app/schemas.js"),
      http = require('http'),
      capsulate = require("../../main.js"),
      path = require('path');

  var app = express();

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/templates');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express["static"](path.join(__dirname, 'public')));

  // development only
  if ('development' === app.get('env')) {
    app.use(express.errorHandler());
  }

  /*app.get('/', routes.index);
  app.get('/users', user.list);*/

  var middleware = [];
  middleware.push(function(req, res, next){
    req.schemas = schemas;
    next();
  });

  capsulate.init(app, routes, middleware);

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
}());
