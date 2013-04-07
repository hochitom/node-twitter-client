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
        template += '</div>';
        template += '<div class="media-footer"><div class="btn-group">';
        template += '<a class="btn reply" href="#" onclick="javascript:reply(' + msg.id +');">Reply</a>';
        template += '<a class="btn retweet" href="#" onclick="javascript:retweet(' + msg.id +');">Retweet</a>';
        template += '</div></div></div></li>';

    $('#stream').prepend(template);
});

$('#tweeting').on('submit', function(data) {
    console.log($('#reply_to').val());
    console.log($('#tweet').val());
    $.post('/tweet', {msg: $('#tweet').val(), in_reply_to_status_id: $('#reply_to').val()}, function(data){
        console.log(data);

        if (data === 'OK') {
            $('#myModal').modal('hide');
        }
    });
    return false;
});

$('a').on('click', '.retweet', function(e) {
    e.preventDefault();
    console.log('retweet tweet #' + $(this).attr('data-id'));
    $.post('/retweet', {id: $(this).attr('data-id')}, function(data) {
        console.log(data);
    });
});

function reply(id) {
    $('#myModal').modal('show');
    $('#reply_to').val(id);
    $('#tweet').text($('li#'+id).find('.username').text());
}

function retweet(id) {
    console.log('retweet tweet #' + id);
    $.post('/retweet', {id: id}, function(data) {
        console.log(data);
    });
}