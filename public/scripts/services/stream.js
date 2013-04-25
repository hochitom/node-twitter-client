(function () {
    app.service('Push', ['$rootScope', function ($rootScope) {
        var socket = io.connect('http://127.0.0.1:3001');
        socket.emit('tweet');
        
        socket.on('new-tweet', function (msg) {
            $rootScope.$broadcast('new-tweet', msg);
        });
    }]);
}());