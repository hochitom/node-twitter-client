(function () {
    app.controller("StreamCtrl", function StreamCtrl ($scope, $rootScope, $http, Push) {
        $scope.tweets = [];

        $http
            .get('/stream')
            .success(function (data) {
                $scope.tweets = data.parse();
            });

        $scope.addTweet = function (data) {
            console.log('data');
            $scope.tweets.push(data);
            console.log($scope.tweets);
        };

        $rootScope.$on('new-tweet', function (event, data) {
            if (!data.friends) {
                $scope.addTweet(data);
            }
        });
    });
}());