"use strict";

let koa = require("koa"),
    views = require("co-views"),
    fs = require("co-fs"),
    route = require("koa-route"),
    request = require('co-request'),
    send = require('koa-send'),
    cors = require('koa-cors'),
    serve = require('koa-static');

let app = koa();
require('koa-qs')(app, 'extended');
let render = views(__dirname + "/assets", { map: { html: 'jade' }});

app.use(cors({
  maxAge: 1000,
  credentials: true,
  methods: 'GET, HEAD, OPTIONS, PUT, POST, DELETE',
  headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));

app.use(serve('public'));

app.use(route.get("/", function *() {
  let body, data;
  body = yield render('index.jade', { locale: process.env.LOCALE , title: "Google Phone Gallery"});
  this.status = 201;
  this.body = body;
}));

app.use(route.get("/api/phones/:phoneId", function *(phoneId) {
  try{
    let file;
    file = yield fs.readFile(`${__dirname}/app/models/phones/${phoneId}`, 'utf8');
    this.status = 201;
    this.body = JSON.parse(file)
  } catch (err) {
    this.status = err.status || 500;
    this.body = { mesage: err.message, status: this.status}
  }
}));

var sendOpts = {root: 'client', maxage: 1000};
app.use(function *(next) {
  if (this.path.substr(0, 5).toLowerCase() === '/api/') {
    yield next;
    return;
  } else if (yield send(this, this.path, sendOpts)) {
    return;
  } else if (this.path.indexOf('.') !== -1) {
    return;
  } else {
    this.status = 201;
    this.body = yield render('index.jade', { locale: process.env.LOCALE });
  }
});

app.use(function *serverErrors(next) {
  try {
    yield next;
  } catch (err) {
    err.status = err.status || 500;
    err.message = err.expose ? err.message : 'Kaboom!';
    this.status = err.status;
    this.body = {code: err.status, message: err.message};
    this.app.emit('error', err, this);
  }
});

app.listen(process.env.PORT);
console.log('listening on port ' + process.env.PORT);