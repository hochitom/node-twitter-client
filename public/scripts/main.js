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
        template += '<h4 class="media-heading username">@' + msg.user.screen_name + '</h4>';
        template += '<p>' + msg.text + '</p>';
        template += '</div>';
        template += '<div class="media-footer"><div class="btn-group">';
        template += '<a class="btn reply" href="#" data-id="' + msg.id + '">Reply</a>';
        template += '<a class="btn retweet" href="#" data-id="' + msg.id + '">Retweet</a>';
        template += '</div></div></div></li>';

    $('#stream').prepend(template);

    var item_height = $('#stream').find('li').eq(0).height();

    // update position
    position += item_height;

    $('html, body').css({
        scrollTop: position + 'px'
    });
});

$('#tweeting').on('submit', function(data) {
    $.post('/tweet', {msg: $('#tweet').val(), in_reply_to_status_id: $('#reply_to').val()}, function(data){
        console.log(data);

        if (data === 'OK') {
            $('#myModal').modal('hide');
            $('#reply_to').val('');
            $('#tweet').val('');
        }
    });
    return false;
});

function findPos(id) {
    var node = document.getElementById(id);     
    var curtop = 0;
    var curtopscroll = 0;
    if (node.offsetParent) {
        do {
            curtop += node.offsetTop;
            curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
        } while (node = node.offsetParent);

        return (curtop - curtopscroll);
    }
    return false;
}

/* fix tweet */
var last_read = $('#stream').find('li').eq(0).attr('id');
var position = findPos(last_read);

$('#stream')
    .on('click', 'li', function(){
        last_read = parseFloat($(this).attr('id'));
    })
    .on('click', '.reply', function(e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        $('#myModal').modal('show');
        $('#reply_to').val(id);
        $('#tweet').text($('li#'+id).find('.username').text() + ' ');
    })
    .on('click', '.retweet', function(e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        $.post('/retweet', {id: id}, function(data) {
            console.log(data);
        });
    });

console.log(last_read);