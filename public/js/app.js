$(document).ready(function() {
    console.log('blahhhhgpulse');

    $('.btn-warning').on('click', function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            method: 'DELETE',
            url: url
        }).done( function(data){
            window.location = '/comments';
        })
    })
});
