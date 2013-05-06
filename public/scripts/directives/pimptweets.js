(function () {
    app.directive('ngPimpTweet', function () {
        return function (scope, elems, attrs) {
            console.log(scope);
            console.log(elems);

            var links = scope.tweet.entities.urls,
                media = scope.tweet.entities.media,
                user = parseFloat(attrs.user),
                symbols = parseFloat(attrs.symbols),
                hashtags = parseFloat(attrs.hashtags);

            console.log(media);
            
            if (links.length > 0) {
                for (var linksI = 0; linksI < links.length; linksI++) {
                    var newLink = '<a href="' + links[linksI].expanded_url +'" target="_blank">' + links[linksI].display_url +'</a>'
                    scope.tweet.text = scope.tweet.text.replace(links[linksI].url, newLink);
                }
            }
            
            if (media && media.length > 0) {
                for (var mediaI = 0; mediaI < media.length; mediaI++) {
                    console.log(media[mediaI]);
                    var newLink = '<a href="' + media[mediaI].expanded_url +'" target="_blank">' + media[mediaI].display_url +'</a>'
                    scope.tweet.text = scope.tweet.text.replace(media[mediaI].url, newLink);
                }
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