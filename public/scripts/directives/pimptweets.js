(function () {
    app.directive('ngPimpTweet', function () {
        return function (scope, elems, attrs) {
            console.log(scope);
            console.log(elems);

            var links = parseFloat(attrs.links),
                user = parseFloat(attrs.user_mentions),
                symbols = parseFloat(attrs.symbols),
                hashtags = parseFloat(attrs.hashtags);
            
            if (links > 0) {
                var link_exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                scope.tweet.text = scope.tweet.text.replace(link_exp,"<a href='$1' target='_blank'>$1</a>");
            }
            
            if (user > 0) {
                var user_exp = /@([a-zA-Z0-9]+)/g;
                scope.tweet.text = scope.tweet.text.replace(user_exp,"<a href='https://twitter.com/$1' target='_blank'>@$1</a>");
            }
            
            if (hashtags > 0) {
                var hashtag_exp = /#([a-zA-Z0-9]+)/g;
                scope.tweet.text = scope.tweet.text.replace(hashtag_exp,"<a href='https://twitter.com/search?q=$1&src=hash' target='_blank'>#$1</a>");
            }
            
            if (symbols > 0) {
                console.log('symbols: ' + symbols);
            }
        };
    });
}());