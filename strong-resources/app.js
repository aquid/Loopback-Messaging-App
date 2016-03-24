var http = require('http'),
httpProxy = require('http-proxy');

// Create a proxy server with custom application logic
var proxy = httpProxy.createProxyServer({});
proxy.on('error', function (err, req, res) {
	  res.writeHead(500, {
	    'Content-Type': 'text/plain'
	  });
	  res.end(err);
	}); 

// If "-pm" is at the end of the app/domain name, or PM_URL matches the route,
// proxy to the Process Manager. Otherwise, proxy to the application itself
var server = http.createServer(function(req, res) {
	if (req.headers.host.indexOf('-pm.') != -1){
		proxy.web(req, res, { target: 'http://127.0.0.1:8701' });
	}
	// specify something like myapp-pm.mybluemix.net
	else if (req.headers.host.indexOf(process.env.PM_URL) != -1){
		proxy.web(req, res, { target: 'http://127.0.0.1:8701' });
	}
	else
	{
		proxy.web(req, res, { target: 'http://127.0.0.1:3001' });
	}
});


console.log("listening on port " + process.env.PORT)
server.listen(process.env.PORT);
