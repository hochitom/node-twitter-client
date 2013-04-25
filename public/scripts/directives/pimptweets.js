(function () {
    app.directive('ngPimpTweet', function () {
        return function (scope, elems, attrs) {
            console.log(scope);
            console.log(elems);

            var tweet = elems[0].innerHTML,
                links = parseFloat(attrs.links),
                user = parseFloat(attrs.user_mentions),
                symbols = parseFloat(attrs.symbols),
                hashtags = parseFloat(attrs.hashtags);

            console.log(tweet);
            
            if (links > 0) {
                console.log('links: ' + links);
                var link_exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                tweet = tweet.replace(link_exp,"<a href='$1' target='_blank'>$1</a>");
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