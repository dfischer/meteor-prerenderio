Package.describe({
  summary: "Node wrapper for prerenderio",
  version: "1.0.1",
  git: "git@github.com:dfischer/meteor-prerenderio.git"
});

Npm.depends({
  'prerender-node': '1.0.6',
  'send' : '0.10.1',
  'depd' : '1.0.0'
});


Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('dfischer:prerenderio.js', 'server');
  api.addFiles('dfischer:prerender.html', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('dfischer:prerenderio');
  api.addFiles('dfischer:prerenderio-tests.js');
});
