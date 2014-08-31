var app = require('express')();
var hbs = require('express-hbs');
var routeLoader = require('express4-route-loader');
var helperLoader = require('../../');

app.engine('hbs', hbs.express3({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts',
  defaultLayout: __dirname + '/views/layouts/index'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

routeLoader(app, __dirname + '/routes');
helperLoader(hbs, __dirname + '/helpers');

module.exports = app;