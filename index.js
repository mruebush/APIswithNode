const restify = require('restify');
const restifyPlugins = require('restify').plugins;

const config = require('./config');

const server = restify.createServer({
    name: config.name,
    version: config.version,
});

// Load some standard Restify plugins to auto wire some things for you
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

// Start the server
server.listen(config.port, () => {
    require('./routes')(server);  
    console.log('%s is listening at %s', server.name, server.url);
});