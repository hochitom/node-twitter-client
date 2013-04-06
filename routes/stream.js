var express = require('express'),
    mapper = require('../lib/model-mapper');


module.exports = function(app) {

    app.param('streamId', function(req, res, next, id) {
        Stream.findOne({ _id : id }, function(err, stream) {
            if (err) {
                next(err);
            } else {
                res.locals.stream = stream;
                next();
            }
        });
    });
    
    app.get('/stream', function(req, res) {
        res.render('pages/stream');
        /*Stream.find({}, function(err, streams) {
            res.render('stream/index', { streams : streams });
        });*/
    });
}
