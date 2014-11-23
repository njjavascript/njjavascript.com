var Boom = require('boom');
var Joi = require("joi");
var Insync = require('insync');
var Mongo = require('mongodb');

module.exports = {
    validate: {
        params: {
            email: Joi.string().email()
        }
    },
    handler: function (request, reply) {

        var connectionString = 'mongodb://njjs:breanneeee@ds053320.mongolab.com:53320/njjs';

        var mongo = Mongo.MongoClient;

        var connect = function (next) {

            mongo.connect(connectionString, function (err, database) {

                return next(err, database);
            });
        }

        var getCollection = function (database, next) {

            database.collection('emails', function (err, collection) {

                return next(err, collection);
            });
        }

        var insertEmail = function (collection, next) {

            var obj = {
                email: request.payload.email,
                subtime: new Date()
            };

            collection.insert(obj, function (err) {

                next(err);
            });
        };

        Insync.waterfall([
            connect,
            getCollection,
            insertEmail
        ], function (err) {

            if (err) {
                return reply(Boom.internal());
            }

            reply.redirect('/thanks');
        });
    }
}
