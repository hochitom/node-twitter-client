(function () {
    app.directive('ngPimpTweet', function () {
        return function (scope, elems, attrs) {
            console.log(scope);
            console.log(elems);

            var links = scope.tweet.entities.urls,
                user = parseFloat(attrs.user),
                symbols = parseFloat(attrs.symbols),
                hashtags = parseFloat(attrs.hashtags);

                console.log(links);
            
            if (links.length > 0) {
                for (var linksI = 0; linksI < links.length; linksI++) {
                    console.log(links[linksI].url);
                    var newLink = '<a href="' + links[linksI].expanded_url +'" target="_blank">' + links[linksI].display_url +'</a>'
                    scope.tweet.text = scope.tweet.text.replace(links[linksI].url, newLink);
                }
                /*var link_exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                scope.tweet.text = scope.tweet.text.replace(link_exp,"<a href='$1' target='_blank'>$1</a>");*/
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
                var ctag_exp = /$([a-zA-Z0-9]+)/g;
                scope.tweet.text = scope.tweet.text.replace(ctag_exp,"<a href='https://twitter.com/search?q=$1&src=ctag' target='_blank'>#$1</a>");
            }
        };
    });
}());