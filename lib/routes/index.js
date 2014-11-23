var Path = require('path');

var subscribe = require('./subscribe');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            reply.view('index');
        }
    },
    {
        method: 'GET',
        path: '/thanks',
        handler: function (request, reply) {

            reply.view('thanks');
        }
    },
    {
        method: 'POST',
        path: '/subscribe',
        config: subscribe
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '../../assets'),
                listing: false
            }
        }
    }
];
