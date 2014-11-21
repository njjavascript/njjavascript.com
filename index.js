var Hapi = require("hapi");
var Path = require("path");
var Joi = require("joi");
var Mongo = require("mongodb");

var server = new Hapi.Server("8100");

// routes objects

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'views'),
		isCached: false
});

var routes = [
	{
		method: 'GET',
		path: '/index.html',
		handler: function (request, reply) {

			reply.view("index");
		}
	},
	{
		method: 'POST',
		path: '/subscribe',
		handler: function (request, reply) {

			var dbconnection = 'mongodb://njjs:mikemills1@ds053320.mongolab.com:53320/njjs';

			var mongo = Mongo.MongoClient;

			mongo.connect(dbconnection, function (err, database) {

				database.collection('emails', function (err, collection) {

					collection.insert({
						email: request.payload.email,
						subtime: new Date()
					}, function () {

						reply.redirect('/index.html');
					});
				});
			});
		},
	 	config: {
      validate: {
        params: {
        	email: Joi.string().email()
        }
      }
    }
	}

];

server.route(routes);

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'assets',
						listing: true
        }
    }
});

server.start(function () {

	console.log("server is started");
});
