// Write your package code here!
console.info('Prerender Token:',Meteor.settings.PrerenderIO.token);

var prerenderio = Meteor.npmRequire('prerender-node').set('prerenderToken', Meteor.settings.PrerenderIO.token);
WebApp.rawConnectHandlers.use(function(req, res, next) {

    req.get = function(param) {
      return req.headers[param.toLowerCase()];
    };

    return prerenderio(req, res, next);		        
});
