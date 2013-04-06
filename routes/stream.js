var express = require('express'),
    OAuth = require('oauth').OAuth,
    twitter = require('ntwitter'),
    io = require('socket.io').listen(3001),
    https = require('https'),
    mapper = require('../lib/model-mapper');


module.exports = function(app) {

    var user_key = "x9Zhz1JPXbGbq9UZhgScg",
        user_secret = "753rRNgVy0KXZh8OFNT2XCZek6RCFE4n2V5vpVY",
        access_token = "19526041-YcTQ9Thw8OzBnhlog6EPjKBdF5tc4oDn3Q3YHzvH0",
        access_token_secret = "Yx1xxc7jEV4VxCmUXGryZAjxyFtVBN1EwAkUHWAIg5o";
    
    app.get('/', function(req, res) {
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

                socket.on('disconnect', function () {
                    io.sockets.emit('user disconnected');
                });
            });
        });

        oa = new OAuth("https://twitter.com/oauth/request_token",
                 "https://twitter.com/oauth/access_token", 
                 user_key, user_secret, 
                 "1.0A", "http://localhost:3000/", "HMAC-SHA1");

        oa.get("http://api.twitter.com/1/statuses/home_timeline.json", access_token, access_token_secret, function(error, data) {
            res.render('pages/stream', {tweets: JSON.parse(data)});
        });
    });

    app.post('/tweet', function(req, res) {
        var twit = new twitter({
            consumer_key: user_key,
            consumer_secret: user_secret,
            access_token_key: access_token,
            access_token_secret: access_token_secret
        });

        twit
            .verifyCredentials(function (err, data) {
                console.log(data);
            }).updateStatus(req.body.msg, function (err, data) {
                if (err) {
                    console.error(err);
                    res.send(415);
                }
                console.log(data);
            });
    });
}