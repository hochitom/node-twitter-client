var express = require('express'),
    OAuth = require('oauth').OAuth,
    twitter = require('ntwitter'),
    io = require('socket.io').listen(3001),
    mapper = require('../lib/model-mapper');


module.exports = function(app) {

    var user_key = "x9Zhz1JPXbGbq9UZhgScg",
        user_secret = "753rRNgVy0KXZh8OFNT2XCZek6RCFE4n2V5vpVY",
        access_token = "19526041-YcTQ9Thw8OzBnhlog6EPjKBdF5tc4oDn3Q3YHzvH0",
        access_token_secret = "Yx1xxc7jEV4VxCmUXGryZAjxyFtVBN1EwAkUHWAIg5o";
    
    app.get('/stream', function(req, res) {
        var twit = new twitter({
            consumer_key: user_key,
            consumer_secret: user_secret,
            access_token_key: access_token,
            access_token_secret: access_token_secret
        });

        twit.stream('user', function(stream, error) {
            if (error) console.error(error);
            io.sockets.on('connection', function (socket) {
                stream.on('data', function (data) {
                    socket.emit('tweet', data);
                });
            });
        });

        res.render('pages/stream');
    });
}