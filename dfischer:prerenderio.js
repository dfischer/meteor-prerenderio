// Write your package code here!
console.info('Prerender Token:',Meteor.settings.PrerenderIO.token);

Meteor.startup(function() {
  var Fiber = Npm.require('fibers');
  var prerenderio = Npm.require('prerender-node').set('prerenderToken', Meteor.settings.PrerenderIO.token);

  Fiber(function() { // run in a fiber so it won't screw with the current request object
		WebApp.rawConnectHandlers.use(function(req, res, next) { // rawConnectHandlers so it loads before any default handlers.
		        // req.get - quick compatibility fix for connect req object to express req object
		        req.get = function(param) {
		          return req.headers[param.toLowerCase()];
		        };
            // send request to prerender.io
		        prerenderio(req, res, next);
		        return next();
		});
	});
});
