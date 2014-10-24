// Write your package code here!
console.info(Meteor.settings.PrerenderIO.token);
console.info('wtf bro');
Meteor.startup(function() {
  var prerenderio = Npm.require('prerender-node').set('prerenderToken', Meteor.settings.PrerenderIO.token);

  // Feed it to middleware! (app.use)
  WebApp.connectHandlers.use(prerenderio);
});
