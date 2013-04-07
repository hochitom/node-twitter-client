var express = require('express'),
    OAuth = require('oauth').OAuth,
    config = require('../config'),
    mapper = require('../lib/model-mapper');

function makeOAuth() {
    //twitter oAuth.
    var oa = new OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        config.twitteroAuth.key,
        config.twitteroAuth.secret,
        '1.0',
        null,
        'HMAC-SHA1');
    return oa;
}

module.exports = function(app) {
    
    app.get('/login', function(req, res) {
        var oa;
        function getOAuthRequestTokenFunc(error, oauth_token, oauth_token_secret,results) {
            if (error) return console.log('getOAuthRequestToken Error', error);
            req.session.callmade = true;
            req.session.oAuthVars = {};
            req.session.oAuthVars.oauth_token = oauth_token;
            req.session.oAuthVars.oauth_token_secret = oauth_token_secret;
            res.redirect('https://api.twitter.com/oauth/authenticate?oauth_token=' + oauth_token);
        }
        //We could store all this in a DB but for another time
        oa = makeOAuth();
        oa.getOAuthRequestToken(getOAuthRequestTokenFunc);

    });

    app.get('/auth', function(req, res) {
        if (req.session.hasOwnProperty('callmade')) {
            var oa = makeOAuth();
            oa.getOAuthAccessToken(
                req.session.oAuthVars.oauth_token,
                req.session.oAuthVars.oauth_token_secret,
                req.param('oauth_verifier'),
                function(error, oauth_access_token, oauth_access_token_secret, tweetRes) {
                if (error) {
                    console.error('getOAuthAccessToken error: ', error);
                    //do something here UI wise
                    return;
                }
                req.session.oAuthVars.oauth_access_token = oauth_access_token;
                req.session.oAuthVars.oauth_access_token_secret = oauth_access_token_secret;
                req.session.oAuthVars.oauth_verifier = req.param('oauth_verifier');
                
                console.log(req.session.oAuthVars);

                //
                var obj = {};
                obj.user_id = tweetRes.user_id;
                obj.screen_name = tweetRes.screen_name;
                obj.oauth_access_token = oauth_access_token;
                obj.oauth_access_token_secret = oauth_access_token_secret;
                obj.profile_image_url = tweetRes.profile_image_url;
                
                // Here we add the 'obj' contain the details to a DB and user this to get the users access details.
                // ToDo: save user Details to db

                res.redirect('/');
            });
        }
        else {
            res.redirect('/login');
        }
    });
}