(function () {
    app.controller("StreamCtrl", function StreamCtrl ($scope, $rootScope, $http, Push) {
        $scope.tweets;

        $http
            .get('/stream')
            .then(function (res) {
                $scope.tweets = res.data;
            });

        $scope.addTweet = function (data) {
            $scope.tweets.push(data);
            $scope.$digest('tweets');
        };

        $scope.retweet = function(id) {
            console.log('retweet ' + id);
            $http.post('/retweet', {id: id});
        };

        $scope.fav = function(id) {
            console.log('fav ' + id);
            $http.post('/fav', {id: id});
        };

        $rootScope.$on('new-tweet', function (event, data) {
            if (data.friends) {
                $scope.friends = data.friends;
            } else {
                $scope.addTweet(data);
            }
        });
    });
}());