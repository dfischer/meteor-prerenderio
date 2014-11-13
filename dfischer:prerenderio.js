// Write your package code here!

var prerenderio = Npm.require('prerender-node');

if(typeof(Meteor.settings.PrerenderIO)=="object" && typeof(Meteor.settings.PrerenderIO.token)!="undefined") {
  console.info('Prerender Token:',Meteor.settings.PrerenderIO.token);
  prerenderio.set('prerenderToken', Meteor.settings.PrerenderIO.token);
}

var send = Npm.require('send');
var deprecate = Npm.require('depd')('express');

// adding in Npm.require('depd'); seems to be troublesome at this point..
var deprecate = function(msg) {
  return console.log(msg);
};


Meteor.startup(function() {
  WebApp.rawConnectHandlers.use(function(req, res, next) {

    req.get = function(param) {
      return req.headers[param.toLowerCase()];
    };

    res.req = req;

    res.status = function(code){
      this.statusCode = code;
      return this;
    };

      res.set =
    res.header = function header(field, val) {
      if (arguments.length === 2) {
        if (Array.isArray(val)) val = val.map(String);
        else val = String(val);
        if ('content-type' == field.toLowerCase() && !/;\s*charset\s*=/.test(val)) {
          var charset = send.mime.charsets.lookup(val.split(';')[0]);
          if (charset) val += '; charset=' + charset.toLowerCase();
        }
        this.setHeader(field, val);
      } else {
        for (var key in field) {
          this.set(key, field[key]);
        }
      }
      return this;
    };

    res.get = function(field){
      return this.getHeader(field);
    };

    res.send = function send(body) {
      var chunk = body;
      var encoding;
      var len;
      var req = this.req;
      var type;

      // settings
      var app = this.app;

      // allow status / body
      if (arguments.length === 2) {
        // res.send(body, status) backwards compat
        if (typeof arguments[0] !== 'number' && typeof arguments[1] === 'number') {
          deprecate('res.send(body, status): Use res.status(status).send(body) instead');
          this.statusCode = arguments[1];
        } else {
          deprecate('res.send(status, body): Use res.status(status).send(body) instead');
          this.statusCode = arguments[0];
          chunk = arguments[1];
        }
      }

      // disambiguate res.send(status) and res.send(status, num)
      if (typeof chunk === 'number' && arguments.length === 1) {
        // res.send(status) will set status message as text string
        if (!this.get('Content-Type')) {
          this.type('txt');
        }

        deprecate('res.send(status): Use res.sendStatus(status) instead');
        this.statusCode = chunk;
        chunk = http.STATUS_CODES[chunk];
      }

      switch (typeof chunk) {
        // string defaulting to html
        case 'string':
          if (!this.get('Content-Type')) {
            this.type('html');
          }
          break;
        case 'boolean':
        case 'number':
        case 'object':
          if (chunk === null) {
            chunk = '';
          } else if (Buffer.isBuffer(chunk)) {
            if (!this.get('Content-Type')) {
              this.type('bin');
            }
          } else {
            return this.json(chunk);
          }
          break;
      }

      // write strings in utf-8
      if (typeof chunk === 'string') {
        encoding = 'utf8';
        type = this.get('Content-Type');

        // reflect this in content-type
        if (typeof type === 'string') {
          this.set('Content-Type', 'utf-8');
        }
      }

      // populate Content-Length
      if (chunk !== undefined) {
        if (!Buffer.isBuffer(chunk)) {
          // convert chunk to Buffer; saves later double conversions
          chunk = new Buffer(chunk, encoding);
          encoding = undefined;
        }

        len = chunk.length;
        this.set('Content-Length', len);
      }

      // method check
      var isHead = req.method === 'HEAD';

      // freshness
      if (req.fresh) this.statusCode = 304;

      // strip irrelevant headers
      if (204 == this.statusCode || 304 == this.statusCode) {
        this.removeHeader('Content-Type');
        this.removeHeader('Content-Length');
        this.removeHeader('Transfer-Encoding');
        chunk = '';
      }

      // skip body for HEAD
      if (isHead) {
        this.end();
      }

      // respond
      this.end(chunk, encoding);

      return this;
    };

      return prerenderio(req, res, next);
  });
});
