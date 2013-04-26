(function () {}(
    app.directive('ngPrettyDate', function() {
        return function (scope, elems) {
            // pass in the 'created_at' string returned from twitter //
            // stamp arrives formatted as Tue Apr 07 22:52:51 +0000 2009 //
            function parseTwitterDate($stamp) {       
                // convert to local string and remove seconds and year //       
                var date = new Date(Date.parse($stamp)).toLocaleString().substr(0, 16);
                // get the two digit hour //
                var hour = date.substr(-5, 2);
                // convert to AM or PM //
                var ampm = hour<12 ? ' AM' : ' PM';
                if (hour>12) hour-= 12;
                if (hour==0) hour = 12;
                // return the formatted string //
                return date.substr(0, 11)+' • ' + hour + date.substr(13) + ampm;
            };

            function prettyDate (time) {
                var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
                    diff = (((new Date()).getTime() - date.getTime()) / 1000) - 3600,
                    day_diff = Math.floor(diff / 86400);

                if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
                    return;

                return day_diff == 0 && (
                    diff < 60 && "just now" ||
                        diff < 120 && "1 minute ago" ||
                        diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
                        diff < 7200 && "1 hour ago" ||
                        diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
                    day_diff == 1 && "Yesterday" ||
                    day_diff < 7 && day_diff + " days ago" ||
                    day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
            }

            scope.tweet.created_at = parseTwitterDate(scope.tweet.created_at);
        };
    })
));