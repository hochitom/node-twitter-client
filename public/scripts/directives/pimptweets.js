(function () {
    app.directive('ngPimpTweet', function () {
        return function (scope, elems, attrs) {
            console.log(scope);
            console.log(elems);

            var tweet = scope.tweet.text,
                links = parseFloat(attrs.links),
                user = parseFloat(attrs.user_mentions),
                symbols = parseFloat(attrs.symbols),
                hashtags = parseFloat(attrs.hashtags);

            console.log(tweet);
            
            if (links > 0) {
                var link_exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                scope.tweet.text = tweet.replace(link_exp,"<a href='$1' target='_blank'>$1</a>");
            }
            
            if (user > 0) {
                console.log('user: ' + user);
            }
            
            if (hashtags > 0) {
                var hashtag_exp = /#([a-zA-Z0-9]+)/g;
                scope.tweet.text = tweet.replace(hashtag_exp,"<a href='https://twitter.com/search?q=$1&src=hash' target='_blank'>#$1</a>");
            }
            
            if (symbols > 0) {
                console.log('symbols: ' + symbols);
            }
        };
    });
}());