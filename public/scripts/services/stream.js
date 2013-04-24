(function () {
    app.service('Push', ['$rootScope', function ($rootScope) {
        socket.on('new-tweet', function (msg) {
            $rootScope.$broadcast('new-tweet', msg);
        });
    }]);
}());