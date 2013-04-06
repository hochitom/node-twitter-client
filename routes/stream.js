var express = require('express'),
    OAuth = require('oauth').OAuth,
    mapper = require('../lib/model-mapper');


module.exports = function(app) {
    
    app.get('/stream', function(req, res) {
        res.render('pages/stream');
    });

    app.get('/login', function(req, res) {

        var oa = new OAuth(
            "https://api.twitter.com/oauth/request_token",
            "https://api.twitter.com/oauth/access_token",
            "x9Zhz1JPXbGbq9UZhgScg",
            "753rRNgVy0KXZh8OFNT2XCZek6RCFE4n2V5vpVY",
            "1.0",
            "http://127.0.0.1:3000/stream",
            "HMAC-SHA1"
        );

        oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
            if(error) {
                console.error(error);
            }
            else { 
                // store the tokens in the session
                req.session.oa = oa;
                req.session.oauth_token = oauth_token;
                req.session.oauth_token_secret = oauth_token_secret;

                // redirect the user to authorize the token
                res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
          }
        })

    });
}
