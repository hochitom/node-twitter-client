var express = require('express.io'),
    OAuth = require('oauth').OAuth,
    twitter = require('ntwitter'),
    https = require('https'),
    config = require('../config'),
    mapper = require('../lib/model-mapper');

function auth () {
    return new OAuth(
        "https://twitter.com/oauth/request_token",
        "https://twitter.com/oauth/access_token", 
        config.twitteroAuth.key,
        config.twitteroAuth.secret, 
        "1.0A",
        "http://localhost:3000/",
        "HMAC-SHA1"
    );
}

module.exports = function(app) {

    app.io.route('tweet', function(req) {
        var access_token = req.session.oAuthVars.oauth_access_token,
            access_token_secret = req.session.oAuthVars.oauth_access_token_secret;

        var twit = new twitter({
            consumer_key: config.twitteroAuth.key,
            consumer_secret: config.twitteroAuth.secret,
            access_token_key: req.session.oAuthVars.oauth_access_token,
            access_token_secret: req.session.oAuthVars.oauth_access_token_secret
        });

        twit.stream('user', function(stream, error) {
            if (error) console.error(error);
            stream.on('data', function (data) {
                req.io.emit('new-tweet', data);
            });
        });
    });
    
    app.get('/', function(req, res) {
        if (!req.session.oAuthVars ||
            !req.session.oAuthVars.oauth_access_token ||
            !req.session.oAuthVars.oauth_access_token_secret)
        {
            res.redirect('/login');
        } else {
            res.render('pages/stream', {tweets: []});
        }
    });

    app.post('/tweet', function(req, res) {
        var access_token = req.session.oAuthVars.oauth_access_token,
            access_token_secret = req.session.oAuthVars.oauth_access_token_secret;

        var params = {};
        if (req.body.msg) params.status = req.body.msg;
        if (req.body.in_reply_to_status_id) params.in_reply_to_status_id = parseFloat(req.body.in_reply_to_status_id);

        oa = auth();
        oa.post('http://api.twitter.com/1/statuses/update.json', access_token, access_token_secret, params, function(err, data){
            if (err) {
                console.error(err);
                res.send(503);
            }
            res.send(200);
        });
    });

    app.post('/retweet', function(req, res) {
        var access_token = req.session.oAuthVars.oauth_access_token,
            access_token_secret = req.session.oAuthVars.oauth_access_token_secret;

        oa = auth();
        oa.post('https://api.twitter.com/1.1/statuses/retweet/' + req.body.id + '.json', access_token, access_token_secret, {id: parseFloat(req.body.id)}, function(err, data) {
            if (err) {
                console.error(err);
                res.send(503);
                res.end();
            }
            console.log(data);
            res.send(200);
        });
    });

    app.post('/fav', function(req, res) {
        var access_token = req.session.oAuthVars.oauth_access_token,
            access_token_secret = req.session.oAuthVars.oauth_access_token_secret;

        var params = {
            id: req.body.id
        };
        
        oa = auth();
        oa.post('https://api.twitter.com/1.1/favorites/create.json', access_token, access_token_secret, params, function(err, data) {
            if (err) {
                console.error(err);
                res.send(err.statusCode);
                res.end();
            }
            console.log(data);
            res.send(200);
        });
    });
}