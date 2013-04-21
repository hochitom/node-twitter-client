(function () {
    app.factory('Push', ['$rootScope', function ($rootScope) {
        socket.on('new-tweet', function (msg) {
            console.log(msg);
            $rootScope.$broadcast('new-tweet', msg);
        });
    }]);
}());