(function () {
    app.controller("StreamCtrl", function StreamCtrl ($scope, $rootScope, $http, Push) {

        $http
            .get('/stream')
            .then(function (res) {
            });

        $scope.addTweet = function (data) {
            $scope.tweets.push(data);
            console.log($scope.tweets.length);
            console.log($scope.tweets);
        };

        $rootScope.$on('new-tweet', function (event, data) {
            if (!data.friends) {
            if (data.friends) {
                $scope.addTweet(data);
            }
        });
    });
}());