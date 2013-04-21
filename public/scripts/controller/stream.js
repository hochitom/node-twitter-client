(function () {
    app.controller("StreamCtrl", function StreamCtrl ($scope, $rootScope) {
        $scope.tweets = [];

        $rootScope.$on('new-tweet', function (data) {
            $scope.push(data);
        });
    });
}());