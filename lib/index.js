var Hapi = require("hapi");
var Handlebars = require('handlebars');
var Path = require("path");

var server = new Hapi.Server("8100");

var viewOptions = {
    engines: {
        html: Handlebars
    },
    path: Path.join(__dirname, '../views'),
    isCached: false
};

server.views(viewOptions);

var routes = require('./routes');
server.route(routes);

server.start(function () {

    console.log("server is started");
});
