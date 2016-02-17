Package.describe({
  name: 'dfischer:prerenderio',
  summary: "Node wrapper for prerenderio",
  version: "1.0.7",
  git: "https://github.com/dfischer/meteor-prerenderio"
});

Npm.depends({
  'prerender-node': '1.0.6',
  'send' : '0.10.1',
  'depd' : '1.0.0'
});


Package.onUse(function(api) {
  api.use(['templating'], 'client');
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('dfischer:prerenderio.js', 'server');
  api.addFiles('dfischer:prerender.html', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('dfischer:prerenderio');
  api.addFiles('dfischer:prerenderio-tests.js');
});
