var socket = io.connect('http://127.0.0.1:3001');

socket.on('connect', function () {
    
});

socket.on('tweet', function (msg) {
    console.log(msg);
    var template = '<li id="' + msg.id + '"><div class="media">';
        template += '<a class="pull-left" href="#">';
        template += '<img class="media-object" src="' + msg.user.profile_image_url +'" data-src="holder.js/64x64">';
        template += '</a>';
        template += '<div class="media-body">';
        template += '<h4 class="media-heading">@' + msg.user.screen_name + '</h4>';
        template += '<p>' + msg.text + '</p>';
        template += '</div></div></li>';

    $('#stream').prepend(template);
});

$('#tweeting').on('submit', function(data) {
    $.post('/tweet', {msg: $('#tweet').val()}, function(data){
        $('#myModal').modal('hide');
    });
    return false;
});