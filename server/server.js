var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.use(loopback.context());
app.use(loopback.token());

app.use(function setCurrentUser(req, res, next) {
  if (!req.accessToken) {
    return next();
  }
  app.models.Messenger.findById(req.accessToken.userId, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('No user with this access token was found.'));
    }
    var loopbackContext = loopback.getCurrentContext();
    var loopbackServerUrl = 'http://message-app.mybluemix.net';
    if (loopbackContext) {
      loopbackContext.set('currentUser', user);
    }
    if(loopbackServerUrl) {
      loopbackContext.set('loopbackServerUrl', loopbackServerUrl);
    }
    next();
  });
});

// boot scripts mount components like REST API
boot(app, __dirname);

app.start = function() {
  // start the web server
  var host = process.env.VCAP_APP_HOST || '0.0.0.0';
  var port = process.env.VCAP_APP_PORT || '3000';
  app.set('host', host);
  app.set('port', port);
  return app.listen(port, function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
