var socket = io.connect('http://127.0.0.1:3001');

socket.on('tweet', function (msg) {
    
    console.log(msg);

    var tweet = msg.text;

    /*function grabLink(link) {
        var link;

        if (msg.entities.urls.length > 0) {
            link = msg.entities.urls[0].display_url;
            msg.entities.urls.splice(1,1);
        }

        return link;
    }*/

    var link_exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    tweet = tweet.replace(link_exp,"<a href='$1' target='_blank'>$1</a>");

    var hashtag_exp = /#([a-zA-Z0-9]+)/g;
    tweet = tweet.replace(hashtag_exp,"<a href='https://twitter.com/search?q=$1&src=hash' target='_blank'>#$1</a>");
    
    var user_exp = /@([a-zA-Z0-9]+)/g;
    tweet = tweet.replace(user_exp,"<a href='https://twitter.com/$1' target='_blank'>@$1</a>");

    var template = '<li id="' + msg.id + '"><div class="media">';
        template += '<a class="pull-left" href="#">';
        template += '<img class="media-object" src="' + msg.user.profile_image_url +'" data-src="holder.js/64x64">';
        template += '</a>';
        template += '<div class="media-body">';
        template += '<h4 class="media-heading username">@' + msg.user.screen_name + '</h4>';
        template += '<p>' + tweet + '</p>';
        template += '</div>';
        template += '<div class="media-footer"><div class="btn-group">';
        template += '<a class="btn reply" href="#" data-id="' + msg.id + '"><i class="icon-share-alt"></i></a>';
        template += '<a class="btn fav" href="#" data-id="' + msg.id + '"><i class="icon-star-empty"></i></a>';
        template += '<a class="btn retweet" href="#" data-id="' + msg.id + '"><i class="icon-retweet"></i></a>';
        template += '</div></div></div></li>';

    $('#stream').prepend(template);

    var item_height = $('#stream').find('li').eq(0).height();
    position += item_height + 20;
    window.scroll(0, position);
});

$('#tweeting').on('submit', function(data) {
    $.post('/tweet', {msg: $('#tweet').val(), in_reply_to_status_id: $('#reply_to').val()}, function(data){
        console.log(data);

        if (data === 'OK') {
            $('#myModal').modal('hide');
            $('#reply_to').empty();
            $('#tweet').empty();
        }
    });
    return false;
});

/* fix tweet */
var position;
$(document).ready(function(){
    position = 0;
    $(window).scroll(function () {
        position = $(window).scrollTop();
        // synch with last read db
    });
});

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
    })
    .on('click', '.fav', function(e) {
        e.preventDefault();
        var id = $(this).attr('data-id');

        $.post('/fav', {id: id}, function(data) {
            console.log(data);
        });
    });