(function () {
    app.directive('ngPimpTweet', function () {
        return function (scope, elems, attrs) {
            var links = parseFloat(attrs.links),
                user = parseFloat(attrs.user_mentions),
                symbols = parseFloat(attrs.symbols),
                hashtags = parseFloat(attrs.hashtags);
            
            if (links > 0) {
                console.log('links: ' + links);
            }
            
            if (user > 0) {
                console.log('user: ' + user);
            }
            
            if (hashtags > 0) {
                console.log('hashtags: ' + hashtags);
            }
            
            if (symbols > 0) {
                console.log('symbols: ' + symbols);
            }
        };
    });
}());