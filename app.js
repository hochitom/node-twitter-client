var path = require('path'),
    express = require('express.io'),
    http = require('http'),
    mongoose = require('mongoose'),
    config = require('./config');

var app = express();
app.http().io();

// Express settings
app.disable('x-powered-by');

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

app.listen(3001);

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });

    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

	app.use(express.cookieParser());
    app.use(express.session({
        secret: "skjghskdjfhbqigohqdiouk",
        cookie: {
            maxAge: 3600 * 60 * 60 * 60
        }
    }));

    app.use(app.router);

    app.use(express.static(path.join(__dirname, 'public')));
});

//mongoose.connect(config.db.url);

require('./helpers')(app);
require('./routes')(app);

http.createServer(app).listen(config.port, config.address, function() {
    console.log("Express server listening on %s:%d in %s mode", config.address, config.port, app.settings.env);
});
