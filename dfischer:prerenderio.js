// Write your package code here!
console.info('Prerender Token:',Meteor.settings.PrerenderIO.token);
Meteor.startup(function() {
  var prerenderio = Npm.require('prerender-node').set('prerenderToken', Meteor.settings.PrerenderIO.token);

  // Feed it to middleware! (app.use)
  WebApp.connectHandlers.use(prerenderio);
});
