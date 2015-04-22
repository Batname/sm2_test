"use strict";

let koa = require("koa"),
    views = require("co-views"),
    fs = require("co-fs"),
    route = require("koa-route"),
    request = require('co-request'),
    serve = require('koa-static');

let app = koa();
require('koa-qs')(app, 'extended');
let render = views(__dirname + "/assets", { map: { html: 'jade' }});

app.use(serve('public'));

app.use(route.get("/", function *() {
  let body, data;
  body = yield render('index.jade', { locale: process.env.LOCALE });
  this.status = 201;
  this.body = body;
}));

app.use(route.get("/phones", function *() {
  try{
    let file;
    if(!this.query.file) {
      this.throw(401, 'file not presante in query, ?file=sm');
    }
    file = yield fs.readFile(`${__dirname}/app/models/phones/${this.query.file}`, 'utf8');
    this.status = 201;
    this.body = { mesage: "success", responce: JSON.parse(file)}
  } catch (err) {
    this.status = err.status || 500;
    this.body = { mesage: err.message, status: this.status}
  }
}));


app.use(function *pageNotFound(next){
  yield next;
  if (404 != this.status) return;
  this.redirect('/');
  this.status = 301;
})

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